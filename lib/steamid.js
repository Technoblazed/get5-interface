const parse = require('xml2js');
const parser = new parse.Parser();
const request = require('requestretry');
const SteamID = require('steamid');

const self = module.exports = {
  authToSteam64: (auth) => {
    const trimmed = auth.trim();

    if (trimmed.includes('steamcommunity.com/id/')) {
      return self.customUrlToSteam64(trimmed);
    } else if (trimmed.includes('steamcommunity.com/profiles/')) {
      const segments = trimmed.split('/');
      const filtered = segments.filter((v) => {
        return v !== '';
      });

      if (self.isValidSteamId(filtered[filtered.length - 1])) {

        return self.authToSteam64(filtered[filtered.length - 1]);
      } else {
        return [false, ''];
      }
    } else if (trimmed.startsWith('1:0:') || trimmed.startsWith('1:1:')) {
      return self.steam2ToSteam64(`STEAM_${trimmed}`);
    } else if (trimmed.startsWith('STEAM_')) {
      return self.steam2ToSteam64(`${trimmed}`);
    } else if (trimmed.startsWith('7656119') && !trimmed.includes('STEAM')) {
      return [true, trimmed];
    } else if (trimmed.startsWith('[U:1:')) {
      const [success, steam2] = self.steam3ToSteam2(trimmed);

      if (success) {
        return self.steam2ToSteam64(steam2);
      } else {
        return [false, ''];
      }
    } else {
      return self.customNameToSteam3(trimmed);
    }
  },
  customNameToSteam3: (name) => {
    return self.customUrlToSteam64(`http://steamcommunity.com/id/${name}/?xml=1`);
  },
  customUrlToSteam64: async(url) => {
    if (!url.includes('?xml=1')) {
      url += '?xml=1';
    }

    const response = await request(url);

    try {
      const parsed = await self.parseXml(response.body);

      return [true, parsed.profile.steamID64[0]];
    } catch (e) {
      return [false, ''];
    }
  },
  getSteamUserInfo: async(steamid, apiKey) => {
    const response = await request('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0001/', {
      qs: {
        key: apiKey,
        steamids: steamid
      }
    });

    let jsonResponse;

    try {
      jsonResponse = JSON.parse(response.body);

      return jsonResponse.response.players.player[0];
    } catch (e) {
      return {};
    }
  },
  isValidSteamId: (auth) => {
    return new SteamID(auth).isValid();
  },
  parseXml: (xml) => {
    return new Promise((resolve, reject) => {
      parser.parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  },
  steam2ToSteam64: (steam2) => {
    try {
      return [true, new SteamID(steam2).getSteamID64()];
    } catch (e) {
      return [false, ''];
    }
  },
  steam3ToSteam2: (steam3) => {
    if (!steam3.includes('[U:1:')) {
      return [false, ''];
    }

    try {
      return [true, new SteamID(steam3).getSteam2RenderedID()];
    } catch (e) {
      return [false, ''];
    }
  }
};
