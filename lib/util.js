const _ = require('lodash');

module.exports = {
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
  }
};
