const express = require('express');
const init = require('../lib/_init');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.send(123);
  });

  router.get('/metrics', (req, res) => {
    return res.render('metrics', {
      values: init.getMetrics()
    });
  });

  return router;
};
