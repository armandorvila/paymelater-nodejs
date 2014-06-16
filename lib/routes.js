'use strict';

/**
 * Application routes
 */

module.exports = function(app) {

	var index = require('./controllers/index');
	var account = require('./controllers/account')(app);
	var audits = require('./controllers/audits')(app);
	var debts = require('./controllers/debts')(app);
	var charges = require('./controllers/charges')(app);

	var users = require('./controllers/users')(app);

	// Server API Routes

	/* *********************** Users endpoint *********************** */
	app.route('/app/rest/users/:username/').get(users.getUser);

	app.route('/app/rest/allUsers/').get(users.getUsers);

	app.route('/app/rest/public/users').post(users.createUser);

	/* *********************** Charges endpoint *********************** */
	app.route('/app/rest/charges').get(charges.getCharges);

	app.route('/app/rest/charges')//post
	.post(charges.createCharge);

	app.route('/app/rest/charges/:id').get(charges.getCharge);

	app.route('/app/rest/charges/:id').
	delete (charges.deleteCharge);

	/* *********************** Debts endpoint *********************** */
	app.route('/app/rest/debts').get(debts.getDebts);

	app.route('/app/rest/debts')//post
	.post(debts.createDebt);

	app.route('/app/rest/debts/:id').get(debts.getDebt);

	app.route('/app/rest/debts/payPal/:id').get(debts.payDebtWithPayPal);

	app.route('/app/rest/debts/card/:id').get(debts.payDebtWithCard);

	app.route('/app/rest/debts/card/payed/:id').get(debts.cardPaymentSuccesfull);


	/* *********************** Audits endpoint *********************** */
	app.route('/app/rest/audits/all').get(audits.getAudits);

	app.route('/app/rest/audits/byDates').get(audits.getAuditsByDates);

	/* *********************** Account endpoint *********************** */
	app.route('/app/rest/authenticate').get(account.isAuthenticated);

	app.route('/app/rest/account').get(account.getAccount);

	app.route('/app/rest/account').post(account.saveAccount);

	app.route('/app/rest/account/change_password').post(account.changePassword);

	app.route('/app/rest/account/sessions').get(account.getCurrentSessions);

	/* *********************** undefined endpoint *********************** */
	
	app.route('/ceca').get(function(req, res) {
		res.send('ceca.html');
	});
	
	app.route('/api/*').get(function(req, res) {
		res.send(404);
	});

	// All other routes to use Angular routing in app/scripts/app.js
	app.route('/partials/*').get(index.partials);
	app.route('/*').get(index.index);
};
