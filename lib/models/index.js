var Sequelize = require('sequelize');

var sequelize = new Sequelize('paymelater', 'paymelater', 'paymelater', {
      dialect: "postgres", 
      host: "156.35.95.66",
      port:    5432,
});


// load models
var models = [
  'User',
  'Authority',
  'UserAuthority',
  'Payment',
  'PersistentAuditEvent',
  'PersistentToken'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.Payment.belongsTo(m.User, {as : 'lender'});
  m.Payment.belongsTo(m.User, {as : 'borrower'});
  
  m.User.hasMany(m.Authority, {through: 't_user_authority', as : 'roles', foreginKey: 'name'});
  m.Authority.hasMany(m.User, {through: 't_user_authority', as : 'users', foreginKey: 'login'});
  

})(module.exports);

// export connection
module.exports.sequelize = sequelize;