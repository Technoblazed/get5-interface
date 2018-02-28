const _ = require('lodash');
const expect = require('chai').expect;

const steamid = require('../lib/steamid');

describe('steamid', () => {
  describe('authToSteam64', () => {
    const testValues = {
      'STEAM_0:0:90996256': '76561198142258240',
      'STEAM_1:0:90996256': '76561198142258240',
      '76561198142258240': '76561198142258240',
      '1:0:90996256': '76561198142258240',
      '[U:1:181992512]': '76561198142258240',
      'steamcommunity.com/profiles/76561198142258240': '76561198142258240',
      'http://steamcommunity.com/profiles/76561198142258240': '76561198142258240',
      'http://steamcommunity.com/profiles/76561198142258240/': '76561198142258240',
      'http://steamcommunity.com/id/Technoblazed': '76561198142258240',
      'technoblazed': '76561198142258240'
    };

    _.forOwn(testValues, (value, key) => {
      it(`"${key}" should return "${value}"`, async() => {
        const [success, actual] = await steamid.authToSteam64(key);

        expect(success).to.be.true;
        expect(actual).to.be.equal(value);
      });
    });
  });
});
