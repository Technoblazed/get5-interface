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

  return PlayerStats;
};
