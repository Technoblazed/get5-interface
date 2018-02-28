const express = require('express');

const router = express.Router();

module.exports = () => {
  router.all('/team/create', (req, res) => {

  });

  router.get('/team/:teamId', (req, res) => {

  });

  router.all('team/:teamId/edit', (req, res) => {

  });

  router.all('team/:teamId/delete', (req, res) => {

  });

  router.get('/teams/:userId', (req, res) => {

  });

  router.get('/myteams', (req, res) => {

  });

  return router;
};
