const _ = require('lodash');
const config = require('../lib/_init').config;
const db = require('../models/');
const metrics = [];
const rcon = require('srcds-rcon');
const urls = {
  home: '/',
  user: '/user/:userId'
};

let metricsCached = false;

const self = module.exports = {
  checkServerAvailability: async(server) => {
    if (!server) {
      return 'Server not found';
    }

    const response = await self.sendRconCommand(server.ip, server.port, server.rconPassword, 'get5_web_available');

    if (!response) {
      return 'Failed to connect to server';
    }

    let alreadyLive = false;
    let jsonError = false;
    let jsonResponse;

    try {
      jsonResponse = JSON.parse(response);

      alreadyLive = jsonResponse.gamestate !== 0;
    } catch (e) {
      jsonError = true;
    }

    if (response.includes('Unknown command')) {
      return 'Either get5 or get5_apistats plugin missing';
    } else if (alreadyLive) {
      return 'Server already has a get5 match setup';
    } else if (jsonError) {
      return 'Error reading get5_web_available response';
    } else {
      return jsonResponse;
    }
  },
  checkServerConnection: async(server) => {
    const response = await self.sendRconCommand(server.ip, server.port, server.rconPassword, 'status');

    return response !== null;
  },
  formatMapname: (mapname) => {
    const formattedNames = {
      'de_cbble': 'Cobblestone',
      'de_dust2': 'Dust II'
    };

    if (formattedNames[mapname]) {
      return formattedNames[mapname];
    } else {
      return mapname.startsWith('de_') ? _.startCase(mapname.substr(3)) : mapname;
    }
  },
  getMetrics: async(timeout = 300000) => {
    if (!metricsCached) {
      metricsCached = true;

      setTimeout(() => {
        metricsCached = false;
      }, timeout);

      const addValue = (name, value) => {
        metrics[name] = value;
      };

      addValue('Registered Users', await db.Users.count());
      addValue('Saved Teams', await db.Teams.count());
      addValue('Matches Created', await db.Matches.count());
      addValue('Completed Matches', await db.Matches.count({
        where: {
          endTime: {
            $ne: null
          }
        }
      }));
      addValue('Servers Added', await db.GameServers.count());
      addValue('Maps With Stats Saved', await db.MapStats.count());
      addValue('Unique Players', await db.PlayerStats.count({
        col: 'steamId',
        distinct: true
      }));
    }

    return metrics;
  },
  getVersion: () => {
    try {
      const version = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();

      return version;
    } catch (e) {
      return;
    }
  },
  sendRconCommand: async(host, port, password, command, raiseErrors = false, maxRetries = 3, timeout = 3000) => {
    const connect = function() {
      return new Promise(async(resolve, reject) => {
        try {
          const connection = rcon({
            address: `${host}:${port}`,
            password
          });

          await connection.connect();

          resolve(connection);
        } catch (e) {
          reject(e);
        }
      });
    };

    let connectAttempts = 0;

    while (connectAttempts < maxRetries) {
      connectAttempts++;

      try {
        const connection = await connect();
        const response = await connection.command(command, timeout);
        const parsed = await self.stripRconLog(response);

        return parsed;
      } catch (e) {
        return raiseErrors ? e.toString() : null;
      }
    }
  },
  stripRconLog: (response) => {
    return new Promise((resolve, reject) => {
      const lines = response.split('\n');

      lines.pop();

      if (lines.length >= 1) {
        const lastLine = lines[lines.length - 1];

        if (lastLine.includes('rcon from')) {
          if (lastLine.includes('Bad Password')) {
            throw Error('Incorrect rcon password');
          }

          lines.pop();

          resolve(lines.join('\n'));
        }
      }

      resolve(response);
    });
  },
  urlFor: (endpoint, params) => {
    params = params || {};

    const queryLink = urls[endpoint].replace(/(\/:\w+\??)/g, (m, c) => {
      c = c.replace(/[/:?]/g, '');
      return params[c] ? '/' + params[c] : '';
    });

    return (params.external ? config('required.site.baseURL').replace(/\/$/, '') : '') + queryLink;
  }
};
