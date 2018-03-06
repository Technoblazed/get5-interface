const config = require('../lib/_init');
const db = require('../models/');
const express = require('express');

const router = express.Router();

module.exports = () => {
  router.all('/match/create', (req, res) => {

  });

  router.get('/match/:matchId', (req, res) => {

  });

  router.get('/match/:matchId/adduser', admintoolsCheck, (req, res) => {

  });

  router.get('/match/:matchId/backup', admintoolsCheck, (req, res) => {

  });

  router.get('/match/:matchId/cancel', admintoolsCheck, (req, res) => {

  });

  router.get('/match/:matchId/config', async(req, res) => {
    return res.json(await req.match.buildMatchDict());
  });

  router.get('/match/:matchId/pause', admintoolsCheck, (req, res) => {

  });

  router.get('/match/:matchId/rcon', admintoolsCheck, (req, res) => {

  });

  router.get('/match/:matchId/unpause', admintoolsCheck, (req, res) => {

  });

  router.get('/matches', (req, res) => {

  });

  router.get('/matches/:userId', (req, res) => {

  });

  router.get('/mymatches', (req, res) => {
    return res.redirect(req.user ? `/matches/${req.user.id}` : '/login');
  });

  router.param('matchId', async(req, res, next, id) => {
    const matchId = req.params.matchId;

    const match = await db.Matches.findById(matchId);

    if (!match) {
      return res.status(404).end('Not found');
    }

    req.match = match;

    next();
  });

  router.param('userId', async(req, res, next, id) => {
    const userId = req.params.userId;

    const userData = await db.Users.findById(userId);

    if (!userData) {
      return res.status(404).end('Not found');
    }

    req.userData = userData;

    next();
  });

  return router;
};

async function admintoolsCheck(req, res, next) {
  if (!req.user || req.user.id !== req.match.userId && !(req.user.admin && config('optional.user.adminsAccessAllMatches'))) {
    return res.status(400).send('You do not have access this page');
  } else if (req.match.finished()) {
    return res.status(400).send('Match already finished');
  } else if (req.match.cancelled()) {
    return res.status(400).send('Match is cancelled');
  }

  next();
}
