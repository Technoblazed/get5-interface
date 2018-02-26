const fs = require('fs');
const path = require('path');

const logosAvailable = new Set();

const self = module.exports = {
  addNewLogo: (tag) => {
    logosAvailable.add(tag);
  },
  getLogoChoices: () => {
    const choices = {
      '': 'None'
    };

    logosAvailable.forEach((tag) => {
      choices[tag] = tag;
    });

    const choicesSorted = {};

    Object.keys(choices).sort().forEach((key) => {
      choicesSorted[key] = choices[key];
    });

    return choicesSorted;
  },
  getLogoDir: () => {
    return path.join(__dirname, '..', 'static', 'img', 'logos');
  },
  getLogoImg: (tag) => {
    return self.hasLogo(tag) ? `/static/img/logos/${tag}.png` : null;
  },
  hasLogo: (tag) => {
    return logosAvailable.has(tag);
  },
  initializeLogos: () => {
    const logoPath = self.getLogoDir();

    fs.readdir(logoPath, (err, files) => {
      files.filter(extensionMatch).forEach((filename) => {
        logosAvailable.add(path.basename(filename, '.png'));
      });
    });
  }
};

function extensionMatch(filename) {
  return path.extname(filename) === '.png';
}
