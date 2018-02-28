const authEnsure = require('connect-ensure-login');
const db = require('../models/');
const express = require('express');

const ensureLoggedIn = authEnsure.ensureLoggedIn('/login');

const router = express.Router();

module.exports = () => {
  router.all('/server/create', (req, res) => {

  });

  router.all('/server/:serverId/edit', (req, res) => {

  });

  router.get('/server/:serverId/delete', (req, res) => [

  ]);

  router.get('/myservers', ensureLoggedIn, async(req, res) => {
    const servers = await db.GameServers.findAll({
      where: {
        user_id: req.session.user_id
      },
      order: [
        ['id', 'DESC']
      ],
      limit: 50
    });

    return res.render('servers', {
      servers
    });
  });

  return router;
};
