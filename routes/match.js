const db = require('../models/');
const express = require('express');

const router = express.Router();

module.exports = () => {
  router.all('/match/create', (req, res) => {

  });

  router.get('/match/:matchId', (req, res) => {

  });

  router.get('/match/:matchId/adduser', (req, res) => {

  });

  router.get('/match/:matchId/backup', (req, res) => {

  });

  router.get('/match/:matchId/cancel', (req, res) => {

  });

  router.get('/match/:matchId/config', async(req, res) => {
    return res.json(await req.match.buildMatchDict());
  });

  router.get('/match/:matchId/pause', (req, res) => {

  });

  router.get('/match/:matchId/rcon', (req, res) => {

  });

  router.get('/match/:matchId/unpause', (req, res) => {

  });

  router.get('/matches', (req, res) => {

  });

  router.get('/matches/:userId', (req, res) => {

  });

  router.get('/mymatches', (req, res) => {

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

  return router;
};
