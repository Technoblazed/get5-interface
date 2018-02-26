const logos = require('./lib/logos');

logos.initializeLogos();

setTimeout(() => {
  logos.getLogoChoices();
}, 500);
