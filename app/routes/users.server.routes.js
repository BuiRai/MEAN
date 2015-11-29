var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app) {
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);
	
	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));
		
	app.get('/signout', users.signout);
};

exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, function(err, user) {
		if (err) {
			return done(err);
		} else {
			if (!user) {
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
				
				User.findUniqueUsername(possibleUsername, null,
				function(availableUsername) {
					profile.username = availableUsername;

					user = new User(profile);

					user.save(function(err) {
						if (err) {
							var message = _this.getErrorMessage(err);

							req.flash('error', message);
							return res.redirect('/signup');
						}
						return done(err, user);
					});
				});
			} else {
				return done(err, user);
			}
		}
	});
};