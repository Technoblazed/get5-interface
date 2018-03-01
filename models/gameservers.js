module.exports = (sequelize, DataTypes) => {
  const GameServers = sequelize.define('GameServers', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    inUse: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    ip: {
      type: DataTypes.STRING(32),
      defaultValue: null
    },
    port: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    rconPassword: {
      type: DataTypes.STRING(32),
      defaultValue: null
    },
    displayName: {
      type: DataTypes.STRING(32),
      defaultValue: null
    },
    publicServer: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    }
  }, {
    tableName: 'gameservers'
  });

  GameServers.associate = (models) => {
    GameServers.hasMany(models.Matches, {
      foreignKey: 'serverId',
      sourceKey: 'id'
    });
  };

  return GameServers;
};
