const _ = require('lodash');
const config = require('../config/prod_config');
const defaults = require('defaults');

module.exports = {
  config: (key) => {
    const options = defaults(config, {
      required: {
        mysql: {
          hostname: '',
          username: '',
          password: '',
          database: ''
        },
        site: {
          baseURL: '',
          secretKey: ''
        },
        steam: {
          apiKey: ''
        }
      },
      optional: {
        admins: {
          adminIds: [],
          whitelistedIds: []
        },
        maps: {
          defaultMaplist: [
            'de_cache',
            'de_cbble',
            'de_inferno',
            'de_mirage',
            'de_nuke',
            'de_overpass',
            'de_train'
          ],
          mapList: [
            'de_cache',
            'de_cbble',
            'de_inferno',
            'de_mirage',
            'de_nuke',
            'de_overpass',
            'de_train',
            'de_dust2',
            'de_season'
          ]
        },
        site: {
          defaultPage: '/matches'
        },
        user: {
          adminsAccessAllMatches: false,
          createMatchTitleText: false,
          userMaxMatches: 1000,
          userMaxServers: 10,
          userMaxTeams: 100
        }
      },
      dev: {
        site: {
          debug: false,
          port: 3000,
          testing: false
        }
      }
    });

    const value = _.result(options, key);

    return value;
  }
};
