const db = require('db');
const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/user/:userId', (req, res) => {
    return res.render('user', {
      displayingUser: req.userData
    });
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
