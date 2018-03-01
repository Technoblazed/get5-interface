module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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

  User.associate = (models) => {
    User.hasMany(models.GameServers, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    User.hasMany(models.Matches, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
    User.hasMany(models.Teams, {
      foreignKey: 'userId',
      sourceKey: 'id'
    });
  };

  return User;
};
