const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.send(123);

    res.end();
  });

  return router;
};
