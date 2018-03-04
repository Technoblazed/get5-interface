const util = require('../lib/util');

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

  GameServers.prototype.getDisplay = function() {
    return this.displayName ? `${this.displayName} (${this.getHostport()})` : this.getHostport();
  };

  GameServers.prototype.getHostport = function() {
    return `${this.ip}:${this.port}`;
  };

  GameServers.prototype.sendRconCommand = async function(command, raiseErrors = false, numRetries = 3, timeout = 3000) {
    const query = await util.sendRconCommand(this.ip, this.port, this.rconPassword, command, raiseErrors, numRetries, timeout);

    return query;
  };

  return GameServers;
};
