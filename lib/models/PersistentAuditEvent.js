module.exports = function(sequelize, DataTypes) {
	return sequelize.define('PersistentAuditEvent', {
		id : {
			type : DataTypes.INTEGER,
			primaryKey : true
		},
		principal : DataTypes.STRING,
		auditEventDate : DataTypes.DATE,
		auditEventType : DataTypes.STRING,
	}, {
		tableName : 't_persistent_audit_event',
		schema : 'public',
		timestamps : false
	});
};
