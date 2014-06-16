'use strict';

module.exports = function(app) {
	return {
		getCharges : function(req, res) {
			var Payment = app.get('models').Payment;
			
			Payment.findAll({where: {lender : req.user.login}}).success(function(payment) {
				res.json(payment);
			});
		},
		createCharge : function(req, res) {
			res.json({});
		},
		getCharge : function(req, res) {
			var Payment = app.get('models').Payment;
			
			Payment.find(req.params.id).success(function(payment) {
				res.json(payment);
			});
		},
		deleteCharge : function(req, res) {
			res.json({});
		}
	};
};
