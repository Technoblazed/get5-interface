module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define('Teams', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(40),
      defaultValue: null
    },
    flag: {
      type: DataTypes.STRING(4),
      defaultValue: null
    },
    logo: {
      type: DataTypes.STRING(10),
      defaultValue: null
    },
    tag: {
      type: DataTypes.STRING(40),
      defaultValue: null
    },
    auths: {
      type: DataTypes.BLOB
    },
    specTeam: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    publicTeam: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    }
  }, {
    tableName: 'teams'
  });

  Teams.associate = (models) => {
    Teams.hasMany(models.MapStats, {
      foreignKey: 'winner',
      sourceKey: 'id'
    });
    Teams.hasMany(models.Matches, {
      foreignKey: 'team1Id',
      sourceKey: 'id'
    });
    Teams.hasMany(models.Matches, {
      foreignKey: 'team2Id',
      sourceKey: 'id'
    });
    Teams.hasMany(models.Matches, {
      foreignKey: 'winner',
      sourceKey: 'id'
    });
    Teams.hasMany(models.PlayerStats, {
      foreignKey: 'teamId',
      sourceKey: 'id'
    });
  };

  Teams.prototype.canDelete = function(user) {
    if (!this.canEdit(user)) {
      return false;
    }

    return this.getRecentMatches().length === 0;
  };

  Teams.prototype.canEdit = function(user) {
    if (!user) {
      return false;
    } else if (this.userId === user.id) {
      return true;
    }

    return false;
  };

  return Teams;
};
