const _ = require('lodash');
const countries = require('../lib/countries');
const expect = require('chai').expect;

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
      'us': '/static/img/valve_flags/us.png',
      'US': '/static/img/valve_flags/us.png',
      'fr': '/static/img/valve_flags/fr.png',
      'FR': '/static/img/valve_flags/fr.png',
      'f': '/static/img/_unknown.png',
      '': '/static/img/_unknown.png'
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
