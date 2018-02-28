const _ = require('lodash');
const expect = require('chai').expect;

const countries = require('../lib/countries');

describe('countries', () => {
  describe('getCountryName', () => {
    const testValues = {
      'us': 'United States',
      'US': 'United States',
      'fr': 'France',
      'FR': 'France',
      'f': null,
      '': null
    };

    _.forOwn(testValues, (value, key) => {
      it(`"${key}" should return "${value}"`, () => {
        expect(countries.getCountryName(key)).to.be.equal(value);
      });
    });
  });

  describe('getFlagImgPath', () => {
    const testValues = {
      'us': '/assets/img/valve_flags/us.png',
      'US': '/assets/img/valve_flags/us.png',
      'fr': '/assets/img/valve_flags/fr.png',
      'FR': '/assets/img/valve_flags/fr.png',
      'f': '/assets/img/_unknown.png',
      '': '/assets/img/_unknown.png'
    };

    _.forOwn(testValues, (value, key) => {
      it(`"${key}" should return "${value}"`, () => {
        expect(countries.getFlagImgPath(key)).to.be.equal(value);
      });
    });
  });

  describe('isValidCountry', () => {
    const testValues = {
      'us': true,
      'US': true,
      'fr': true,
      'FR': true,
      'f': false,
      '': false
    };

    _.forOwn(testValues, (value, key) => {
      it(`"${key}" should return "${value}"`, () => {
        expect(countries.isValidCountry(key)).to.be[value];
      });
    });
  });
});
