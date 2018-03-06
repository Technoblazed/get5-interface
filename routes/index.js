const config = require('../lib/_init').config;
const express = require('express');
const init = require('../lib/_init');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    return res.redirect(config('optional.site.defaultPage'));
  });

  router.get('/metrics', (req, res) => {
    return res.render('metrics', {
      values: init.getMetrics()
    });
  });

  return router;
};
