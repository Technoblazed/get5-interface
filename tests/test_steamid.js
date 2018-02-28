const _ = require('lodash');
const expect = require('chai').expect;

const steamid = require('../lib/steamid');

describe('steamid', () => {
  describe('authToSteam64', () => {
    const target = '76561198142258240';
    const testValues = [
      'STEAM_0:0:90996256',
      'STEAM_1:0:90996256',
      '76561198142258240',
      '1:0:90996256',
      '[U:1:181992512]',
      'steamcommunity.com/profiles/76561198142258240',
      'http://steamcommunity.com/profiles/76561198142258240',
      'http://steamcommunity.com/profiles/76561198142258240/',
      'http://steamcommunity.com/id/Technoblazed',
      'technoblazed'
    ];

    _.forEach(testValues, (key) => {
      it(`"${key}" should return "${target}"`, async() => {
        const [success, actual] = await steamid.authToSteam64(key);

        expect(success).to.be.true;
        expect(actual).to.be.equal(target);
      });
    });
  });
});
