module.exports = (sequelize, DataTypes) => {
  const Matches = sequelize.define('Matches', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    cancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    startTime: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    endTime: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    maxMaps: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    title: {
      type: DataTypes.STRING(60),
      defaultValue: null
    },
    skipVeto: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    apiKey: {
      type: DataTypes.STRING(32),
      defaultValue: null
    },
    vetoMappool: {
      type: DataTypes.STRING(160),
      defaultValue: null
    },
    team1Score: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    team2Score: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    team1String: {
      type: DataTypes.STRING(32),
      defaultValue: null
    },
    team2String: {
      type: DataTypes.STRING(32),
      defaultValue: null
    },
    forfeit: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    pluginVersion: {
      type: DataTypes.STRING(32),
      defaultValue: null
    }
  }, {
    tableName: 'matches'
  });

  Matches.associate = (models) => {
    Matches.hasMany(models.MapStats, {
      foreignKey: 'matchId',
      sourceKey: 'id'
    });
    Matches.hasMany(models.PlayerStats, {
      foreignKey: 'matchId',
      sourceKey: 'id'
    });
  };

  return Matches;
};
