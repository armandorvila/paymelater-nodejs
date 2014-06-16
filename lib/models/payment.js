module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    subject: DataTypes.STRING,
    description: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    beginning: DataTypes.DATE,
    deadLine: DataTypes.DATE,
    location: DataTypes.STRING
  }, {tableName: 't_payment',
  	  schema: 'public',timestamps: false}
  );
};

