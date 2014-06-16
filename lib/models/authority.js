module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Authority', {
    name: { type: DataTypes.STRING, primaryKey: true}
  }, {tableName: 't_authority',
  	  schema: 'public',
  	  timestamps: false}
  );
};

