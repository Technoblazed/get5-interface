const express = require('express');

const router = express.Router();

module.exports = () => {
  router.post('/match/:matchId/finish', (req, res) => {

  });

  router.post('/match/:matchId/map/:mapNumber/start', (req, res) => {

  });

  router.post('/match/:matchId/map/:mapNumber/update', (req, res) => {

  });

  router.post('/match/:matchId/map/:mapNumber/finish', (req, res) => {

  });

  router.post('/match/:matchId/map/:mapNumber/player/:steamId/update', (req, res) => {

  });

  return router;
};
