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

  router.get('/match/:matchId/config', (req, res) => {

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

  return router;
};
