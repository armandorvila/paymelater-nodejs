module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    login: { type: DataTypes.STRING, primaryKey: true},
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {tableName: 't_user',
  	  schema: 'public',timestamps: false}
  );
};

