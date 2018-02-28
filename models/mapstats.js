module.exports = (sequelize, DataTypes) => {
  const MapStats = sequelize.define('MapStats', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    mapNumber: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    mapName: {
      type: DataTypes.STRING(64),
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
    team1Score: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    team2Score: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    }
  }, {
    tableName: 'mapstats'
  });

  MapStats.associate = (models) => {
    MapStats.hasMany(models.MapStats, {
      foreignKey: 'map_id',
      sourceKey: 'id'
    });
  };

  return MapStats;
};
