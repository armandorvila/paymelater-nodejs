'use strict';

module.exports = function(app) {
	return {
		getUser : function(req, res) {

			var User = app.get('models').User;

			console.log('Getting user ' + req.params.username);

			User.find(req.user.login).success(function(user) {
				user.getRoles().success(function(roles) {

					var userDTO = {
						login : user.login,
						first_name : user.first_name,
						last_name : user.last_name,
						password : user.password,
						email : user.email,
						roles : []
					};

					for (var i = 0; i < roles.length; i++) {
						userDTO.roles.push(roles[i].name);
					};

					res.json(userDTO);
				});
			});
		},

		getUsers : function(req, res) {
			var User = app.get('models').User;

			User.findAll().success(function(user) {
				res.json(user);
			});

		},

		createUser : function(req, res) {
			var User = app.get('models').User;

			var user = User.create({
				login : req.body.login,
				first_name : req.body.firstName,
				last_name : req.body.lastName,
				password : req.body.password,
				email : req.body.email,
			}).success(function(user) {
				user.setRoles([{name: 'ROLE_USER'}]);
				res.send(200);
			});

		}
	};
};
