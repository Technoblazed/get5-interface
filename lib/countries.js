const self = module.exports = {
  getCountryName: (countryCode) => {
    if (!self.isValidCountry(countryCode)) {
      return null;
    }

    return countryList[countryCode.toLowerCase()];
  },
  getFlagImgPath: (countryCode) => {
    if (self.isValidCountry(countryCode)) {
      return `/static/img/valve_flags/${countryCode.toLowerCase()}.png`;
    } else {
      return '/static/img/_unknown.png';
    }
  },
  isValidCountry: (countryCode) => {
    if (!countryCode || !countryList[countryCode.toLowerCase()]) {
      return false;
    }

    return true;
  }
};

const countryList = {
  'ae': 'United Arab Emirates',
  'ar': 'Argentina',
  'at': 'Austria',
  'au': 'Australia',
  'be': 'Belgium',
  'bg': 'Bulgaria',
  'br': 'Brazil',
  'by': 'Belarus',
  'ca': 'Canada',
  'cc': 'Cocos Islands',
  'ch': 'Switzerland',
  'cl': 'Chile',
  'cn': 'China',
  'cz': 'Czech Republic',
  'de': 'Germany',
  'dk': 'Denmark',
  'dz': 'Algeria',
  'ee': 'Estonia',
  'es': 'Spain',
  'eu': 'European Union',
  'fi': 'Finland',
  'fr': 'France',
  'gb': 'United Kingdom',
  'gp': 'Guadeloupe',
  'gr': 'Greece',
  'hk': 'Hong Kong',
  'hr': 'Croatia',
  'hu': 'Hungary',
  'id': 'Indonesia',
  'ie': 'Ireland',
  'il': 'Israel',
  'in': 'India',
  'ir': 'Iran',
  'is': 'Iceland',
  'it': 'Italy',
  'jp': 'Japan',
  'kr': 'South Korea',
  'kz': 'Kazahkstan',
  'lt': 'Liechtenstein',
  'lu': 'Luxembourg',
  'lv': 'Latvia',
  'ly': 'Libya',
  'mk': 'Macedonia',
  'mo': 'Macao',
  'mx': 'Mexico',
  'my': 'Malaysia',
  'nl': 'Netherlands',
  'no': 'Norway',
  'nz': 'New Zealand',
  'pe': 'Peru',
  'ph': 'Phillippines',
  'pk': 'Pakistan',
  'pl': 'Poland',
  'pt': 'Portugal',
  're': 'Reunion',
  'ro': 'Romania',
  'rs': 'Serbia',
  'ru': 'Russia',
  'sa': 'Saudi Arabia',
  'se': 'Sweden',
  'sg': 'Singapore',
  'si': 'Slovenia',
  'sk': 'Slovokia',
  'th': 'Thailand',
  'tr': 'Turkey',
  'tw': 'Taiwan',
  'ua': 'Ukraine',
  'us': 'United States',
  've': 'Venezuela',
  'vn': 'Vietnam',
  'za': 'South Africa'
};
