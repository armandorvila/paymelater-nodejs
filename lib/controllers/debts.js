'use strict';

var ceca = require('../ceca/ceca');
var paypal_sdk = require('paypal-rest-sdk');

module.exports = function(app) {

	var create_payment_json = {
		"intent" : "sale",
		"payer" : {
			"payment_method" : "paypal"
		},
		"redirect_urls" : {
			"return_url" : "http://localhost:9000/#/debts",
			"cancel_url" : "http://localhost:8080/#/debts/payPalCancelled"
		},
		"transactions" : [{
			"item_list" : {
				"items" : [{
					"name" : "item",
					"sku" : "item",
					"price" : "1.00",
					"currency" : "USD",
					"quantity" : "1"
				}]
			},
			"amount" : {
				"currency" : "USD",
				"total" : "1.00"
			},
			"description" : "This is the payment description."
		}]
	};

	return {
		getDebts : function(req, res) {
			var Payment = app.get('models').Payment;

			Payment.findAll({
				where : {
					borrower : req.user.login
				}
			}).success(function(payment) {
				res.json(payment);
			});
		},

		createDebt : function(req, res) {
			res.json([]);
		},

		getDebt : function(req, res) {
			var Payment = app.get('models').Payment;

			Payment.find(req.params.id).success(function(payment) {
				res.json(payment);
			});
		},

		payDebtWithPayPal : function(req, res) {

			var Payment = app.get('models').Payment;

			Payment.find(req.params.id).success(function(payment) {
				if (payment == null) {
					res.send(404);
				} else if (req.user.login != payment.borrower) {
					console.log(req.user.login);
					console.log(payment.borrower);
					//res.send(401);
				}

				paypal_sdk.configure({
					'mode' : 'sandbox', //sandbox or live
					'client_id' : 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
					'client_secret' : 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
				});

				create_payment_json.transactions[0].amount.total = payment.amount;

				paypal_sdk.payment.create(create_payment_json, function(error, payment) {
					if (error) {
						throw error;
					} else {
						console.log("Create Payment Response");
						console.log(payment);
						res.send(payment.links[1].href);
					}
				});
			});
		},

		payDebtWithCard : function(req, res) {
			var Payment = app.get('models').Payment;

			Payment.find(req.params.id).success(function(payment) {
				payment.getBorrower().success(function(borrower) {

					console.log(req.user.login);
					console.log(borrower);
					if (payment == null) {
						res.send(404);
					} else if (req.user.login != payment.borrower) {
						//res.send(401);
					}
					console.log('Returning ceca config ' + JSON.stringify(ceca));
					res.json(ceca);
				});
			});
		},

		cardPaymentSuccesfull : function(req, res) {
			res.json([]);
		},
	};
};
