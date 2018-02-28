const _ = require('lodash');
const expect = require('chai').expect;

const util = require('../lib/util');

describe('util', () => {
  describe('formatMapname', () => {
    const testValues = {
      'cs_assault': 'cs_assault',
      'de_cbble': 'Cobblestone',
      'de_dust2': 'Dust II',
      'de_inferno': 'Inferno',
      'de_test': 'Test'
    };

    _.forOwn(testValues, (value, key) => {
      it(`"${key}" should return "${value}"`, () => {
        expect(util.formatMapname(key)).to.be.equal(value);
      });
    });
  });
});
