module.exports = (sequelize, DataTypes) => {
  const PlayerStats = sequelize.define('PlayerStats', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    steamId: {
      type: DataTypes.STRING(40),
      defaultValue: null
    },
    name: {
      type: DataTypes.STRING(40),
      defaultValue: null
    },
    kills: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    deaths: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    roundsPlayed: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    assists: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    flashAssists: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    teamKills: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    suicides: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    headshotKills: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    damage: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    bombPlants: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    bombDefuses: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    v1: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    v2: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    v3: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    v4: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    v5: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    k1: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    k2: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    k3: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    k4: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    k5: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    firstDeathCT: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    firstDeathT: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    firstKillCT: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    firstKillT: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    }
  }, {
    tableName: 'playerstats'
  });

  PlayerStats.prototype.getADR = function() {
    return this.roundsPlayed === 0 ? 0.0 : parseFloat(this.damage) / this.roundsPlayed;
  };

  PlayerStats.prototype.getFPR = function() {
    return this.roundsPlayed === 0 ? 0.0 : parseFloat(this.kills) / this.roundsPlayed;
  };

  PlayerStats.prototype.getKDR = function() {
    return this.deaths === 0 ? this.kills : parseFloat(this.kills) / this.deaths;
  };

  PlayerStats.prototype.getHSP = function() {
    return this.kills === 0 ? 0.0 : parseFloat(this.headshotKills) / this.kills;
  };

  PlayerStats.prototype.getRating = function() {
    const killRating = parseFloat(this.kills) / parseFloat(this.roundsPlayed) / 0.679;
    const survivalRating = parseFloat(this.roundsPlayed = this.deaths) / this.roundsPlayed / 0.317;
    const killCount = parseFloat(this.k1 + 4 * this.k2 + 9 * this.k3 + 16 * this.k4 + 25 * this.k5);
    const roundsWithMultipleKills = killCount / this.roundsPlayed / 1.277;

    return (killRating + 0.7 * survivalRating + roundsWithMultipleKills) / 2.7;
  };

  PlayerStats.prototype.getSteamURL = function() {
    return `http://steamcommunity.com/profiles/${this.steamId}`;
  };

  return PlayerStats;
};
