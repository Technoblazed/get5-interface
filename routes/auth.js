const authEnsure = require('connect-ensure-login');
const express = require('express');

const ensureLoggedIn = authEnsure.ensureLoggedIn('/');
const ensureLoggedOut = authEnsure.ensureLoggedOut('/');

const router = express.Router();

module.exports = (passport) => {
  router.get('/auth/steam', ensureLoggedOut, passport.authenticate('steam'));

  router.get('/auth/steam/callback', ensureLoggedOut, passport.authenticate('steam', {
    failureRedirect: '/',
    successReturnToOrRedirect: '/'
  }), (req, res) => {
    return req.session.save(() => {
      res.redirect('/');
    });
  });

  router.get('/auth/logout', ensureLoggedIn, (req, res) => {
    req.logout();

    return req.session.save(() => {
      res.redirect('/');
    });
  });

  return router;
};
