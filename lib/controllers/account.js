'use strict';

module.exports = function(app) {
	return {
		isAuthenticated : function(req, res) {
			if (req.user) {
				res.json(req.user.login);
			} else {
				return null;
			}
		},

		getAccount : function(req, res) {
			var User = app.get('models').User;
			User.find(req.user.login).success(function(user) {
				user.getRoles().success(function(roles) {
					
					var userDTO = {
						login: user.login,
						first_name: user.first_name,
						last_name: user.last_name,
						password: user.password,
						email: user.email,
						roles : []
					};
					
					for (var i=0; i < roles.length; i++) {
					  userDTO.roles.push(roles[i].name);
					};

					res.json(userDTO);
				});
			});
		},
		saveAccount : function(req, res) {
			res.json({});
		},
		changePassword : function(req, res) {
			res.json({});
		},
		getCurrentSessions : function(req, res) {
			res.json({});
		}
	};
};
