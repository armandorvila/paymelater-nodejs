var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
//var SHA256 =  new Hashes.SHA256;

var filterUser = function(user, roles) {
	return {
		login : user.login,
		firstName : user.first_name,
		lastName : user.last_name,
		email : user.email,
		roles : roles
	};
};

exports.use = function(app, config) {
	console.log('Configure passport js');

	/**
	 * Tell passport what information store in session.
	 */
	passport.serializeUser(function(user, done) {
		console.log(' Storing ' + user.login + ' in the passsport session.');
		done(null, user.login);
	});

	/**
	 * Tell passport how get the user from the information stored in
	 * session.
	 */
	passport.deserializeUser(function(login, done) {
		console.log(' Restoring user ' + login + ' from the passsport session.');
		var User = app.get('models').User;
		User.find(login).success(function(user) {
			user.getRoles().success(function(roles) {
				done(null, filterUser(user, roles));
			});
		});
	});

	/**
	 * Tell passport who is a valid user and who is not one.
	 */
	passport.use(new LocalStrategy({
		usernameField : 'j_username',
		passwordField : 'j_password'
	}, function(username, password, done) {
		console.log('Starting pssport Local strategy for ' + username);

		var User = app.get('models').User;

		User.find(username).success(function(user) {

			user.getRoles().success(function(roles) {

				console.log('Found user :' + JSON.stringify(user));

				if (!user) {
					console.log('No user found with email ' + username);
					return done(null, false, {
						message : 'Invalid credentials!'
					});
				}

				if (password == user.password) {
					console.log('User logued ' + user.login);
					return done(null, filterUser(user, roles), {
						message : 'User logged'
					});

				} else {
					console.log('Incorrect password');
					done(null, false, {
						message : 'Invalid credentials!'
					});
				}
			});
		});

	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.post("/app/authentication", function(req, res, next) {
		return passport.authenticate('local', function(err, user, info) {
		console.log(' User logued : ' + user + ' info: ' + info.message);

		if (user) {
		req.login(user, function(err) {
		if (err) {
		return next(err);
		}
		console.log('User well stored in session');
		res.json({
		result : user,
		message : info.message
		});
		});
		}
		else {
		res.json({
		result : user,
		message : info.message
		});
		}

		})(req, res, next);
	});
};
