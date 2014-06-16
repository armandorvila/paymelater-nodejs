module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PersistentToken', {
    series: { type: DataTypes.STRING, primaryKey: true},
    tokenValue: DataTypes.STRING,
    tokenDate: DataTypes.DATE,
    ipAddress: DataTypes.STRING,
    userAgent: DataTypes.STRING
  }, {tableName: 't_persistent_token',
  	  schema: 'public',timestamps: false}
  );
};
