'use strict';

module.exports = function(app) {
	return {
		getAudits : function(req, res) {
			var PersistentAuditEvent = app.get('models').PersistentAuditEvent;
			PersistentAuditEvent.findAll().success(function(audits) {
				res.json(audits);
			});
		},

		getAuditsByDates : function(req, res) {
			var PersistentAuditEvent = app.get('models').PersistentAuditEvent;
			PersistentAuditEvent.findAll().success(function(audits) {
				res.json(audits);
			});
		}
	};
};
