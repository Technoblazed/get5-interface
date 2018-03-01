const db = require('../models/');
const debug = require('debug')('get5-web:server');
const express = require('express');
const matches = require('../lib/matches');

const router = express.Router();

module.exports = () => {
  // Ratelimit @ 60 per hour
  router.post('/match/:matchId/finish', matchCheck, async(req, res) => {
    const winningTeam = req.body.winner;

    let matchForfeit = false;
    let matchWinner = null;
    let team1Score = 0;
    let team2Score = 0;

    if (winningTeam === 'team1') {
      matchWinner = req.match.team1Id;
    } else if (winningTeam === 'team2') {
      matchWinner = req.match.team2Id;
    }

    const forfeit = req.body.forfeit;

    if (forfeit) {
      matchForfeit = true;

      if (winningTeam === 'team1') {
        team1Score = 1;
        team2Score = 0;
      } else if (winningTeam === 'team2') {
        team1Score = 0;
        team2Score = 1;
      }
    }

    let transaction;

    try {
      transaction = await db.sequelize.transaction();

      await db.Matches.update({
        endTime: new Date(),
        forfeit: matchForfeit,
        team1Score,
        team2Score,
        winner: matchWinner
      }, {
        where: {
          id: req.match.id
        },
        transaction
      });

      const server = await db.GameServers.findById(req.match.serverId, {
        transaction
      }).then((server) => server.updateAttributes({
        inUse: false
      }));

      debug(`Finished match #${req.match.id}, winner: ${winningTeam}, on server ${server.id}`);

      await transaction.commit();

      return res.end('Success');
    } catch (e) {
      await transaction.rollback();

      return res.end('Failed');
    }
  });

  // Ratelimit @ 60 per hour
  router.post('/match/:matchId/map/:mapNumber/start', async(req, res) => {
    let transaction;

    try {
      if (!req.match.startTime) {
        await db.Matches.findById(req.match.id, {
          transaction
        }).then((match) => match.updateAttributes({
          startTime: new Date()
        }));
      }

      await db.MapStats.findOrCreate({
        where: {
          matchId: req.match.id,
          mapNumber: req.params.mapNumber,
          mapName: req.body.mapname
        },
        transaction
      });

      await transaction.commit();

      return res.end('Success');
    } catch (e) {
      await transaction.rollback();

      return res.end('Failed');
    }
  });

  router.post('/match/:matchId/map/:mapNumber/update', (req, res) => {

  });

  router.post('/match/:matchId/map/:mapNumber/finish', (req, res) => {

  });

  router.post('/match/:matchId/map/:mapNumber/player/:steamId/update', (req, res) => {

  });

  return router;
};

const matchCheck = async(req, res, next) => {
  const matchId = req.params.matchId;

  const match = await db.Matches.findById(matchId);

  if (!match) {
    return res.status(404).end('Not found');
  }

  if (req.body.key !== match.apiKey) {
    return res.status(400).end('Wrong API Key');
  }

  if (matches.finalized(match)) {
    return res.status(400).end('Match already finalized');
  }

  req.match = match;

  next();
};
