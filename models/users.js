const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    steamId: {
      type: DataTypes.STRING(40),
      defaultValue: null,
      unique: true
    },
    name: {
      type: DataTypes.STRING(40),
      defaultValue: null
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    }
  }, {
    tableName: 'user'
  });

  Users.associate = (models) => {
    Users.hasMany(models.GameServers, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    Users.hasMany(models.Matches, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    Users.hasMany(models.Teams, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
  };

  Users.prototype.getRecentMatches = async function(limit = 10) {
    const matches = await sequelize.models.Matches.findAll({
      where: {
        cancelled: false
      },
      limit
    });

    return matches;
  };

  Users.prototype.getSteamURL = function() {
    return `http://steamcommunity.com/profiles/${this.steamId}`;
  };

  Users.prototype.getURL = function() {
    return util.urlFor('user', {
      userId: this.id
    });
  };

  return Users;
};
