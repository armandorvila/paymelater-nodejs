module.exports = function(sequelize, DataTypes) {
	return sequelize.define('UserAuthority', {
		login : {
			type : DataTypes.STRING,
			references : "User",
			referencesKey : "login"
		},
		name : {
			type : DataTypes.STRING,
			references : "Authority",
			referencesKey : "name"
		}
	}, {
		tableName : 't_user_authority',
		schema : 'public',
		timestamps : false
	});
};
