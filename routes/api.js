const db = require('../models/');
const debug = require('debug')('get5-web:server');
const express = require('express');

const router = express.Router();

module.exports = () => {
  router.param('matchId', async(req, res, next, id) => {
    const matchId = req.params.matchId;

    const match = await db.Matches.findById(matchId);

    if (!match) {
      return res.status(404).end('Not found');
    }

    if (req.body.key !== match.apiKey) {
      return res.status(400).end('Wrong API Key');
    }

    if (match.finalized()) {
      return res.status(400).end('Match already finalized');
    }

    req.match = match;

    next();
  });

  // Ratelimit @ 60 per hour
  router.post('/match/:matchId/finish', async(req, res) => {
    const forfeit = req.body.forfeit;
    const winningTeam = req.body.winner;

    if (winningTeam === 'team1') {
      req.match.winner = req.match.team1Id;
    } else if (winningTeam === 'team2') {
      req.match.winner = req.match.team2Id;
    }

    if (forfeit) {
      req.match.forfeit = true;

      if (winningTeam === 'team1') {
        req.match.team1Score = 1;
        req.match.team2Score = 0;
      } else if (winningTeam === 'team2') {
        req.match.team1Score = 0;
        req.match.team2Score = 1;
      }
    }

    req.match.endTime = new Date();

    let transaction;

    try {
      transaction = await db.sequelize.transaction();

      await req.match.save({ transaction });

      const server = await db.GameServers.findById(req.match.serverId, { transaction });
      server.updateAttributes({ inUse: false });

      await transaction.commit();

      debug(`Finished match #${req.match.id}, winner: ${winningTeam}, on server ${server.id}`);

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
        req.match.startTime = new Date();
        req.match.save({ transaction });
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

      debug(`Started match #${req.match.id}, mapnumber: ${req.params.mapNumber}, on map ${req.body.mapname}`);

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
