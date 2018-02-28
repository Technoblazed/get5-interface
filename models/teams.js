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
      foreignKey: 'team1_id',
      sourceKey: 'id'
    });
    Teams.hasMany(models.Matches, {
      foreignKey: 'team2_id',
      sourceKey: 'id'
    });
    Teams.hasMany(models.Matches, {
      foreignKey: 'winner',
      sourceKey: 'id'
    });
    Teams.hasMany(models.PlayerStats, {
      foreignKey: 'team_id',
      sourceKey: 'id'
    });
  };

  return Teams;
};
