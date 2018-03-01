/**
 *  Global Requirements
 */

const bodyParser = require('body-parser');
const config = require('./config/prod_config');
const cookieParser = require('cookie-parser');
const db = require('./models');
const express = require('express');
const expressNunjucks = require('express-nunjucks');
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');
const RateLimit = require('express-rate-limit');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const steamStrategy = require('passport-steam').Strategy;

const app = express();
const server = require('http').createServer(app);

const isDev = app.get('env').trim() !== 'production';

if (isDev) {
  app.use(logger('dev'));
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

expressNunjucks(app, {
  watch: isDev,
  noCache: isDev,
  filters: {}
});

//app.use(favicon(path.join(__dirname, 'client', 'public', 'assets', 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

const sessionParser = session({
  secret: config.required.site.secretKey,
  saveUninitialized: true,
  resave: true,
  proxy: true,
  store: new sequelizeStore({
    db: db.sequelize,
    expiration: 4 * 7 * 24 * 60 * 60 * 1000
  })
});

app.use(sessionParser);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new steamStrategy({
  returnURL: '/auth/steam/callback',
  realm: '/auth/steam/callback',
  apiKey: config.required.steam.apiKey
}, (identifier, profile, done) => {
  const steamAvatar = profile._json.avatarfull.split('/').slice(-2).join('/');

  db.Users.findOrCreate({
    where: {
      steamId: +profile.id
    }
  }).spread((user) => user.updateAttributes({
    steamAvatar,
    steamUsername: profile.displayName
  }).then(() => {
    done(null, {
      steamId: +profile.id,
      steamAvatar,
      steamUsername: profile.displayName
    });
  }).catch((err) => {
    done(err);
  }));
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  db.Users.find({
    where: {
      steamId: user.steamId
    }
  }).then((user) => {
    done(null, user);
  }).catch((err) => {
    done(err);
  });
});

const limiter = new RateLimit({
  windowMs: 60 * 1000,
  max: 250,
  delayMs: 0
});

app.use(limiter);

app.use(require(path.join(__dirname, 'routes', 'index'))());
app.use(require(path.join(__dirname, 'routes', 'api'))());
app.use(require(path.join(__dirname, 'routes', 'auth'))(passport));
app.use(require(path.join(__dirname, 'routes', 'match'))());
app.use(require(path.join(__dirname, 'routes', 'server'))());
app.use(require(path.join(__dirname, 'routes', 'team'))());

app.use((req, res, next) => {
  res.locals.IS_DEV = isDev;
  res.locals.USER = req.user;
  res.locals.PATH = req.url;

  next();
});

app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;

  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: isDev ? err : {}
  });
});

module.exports = { app, server };
