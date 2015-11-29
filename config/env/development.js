module.exports = {
	db: 'mongodb://localhost/mean-book',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID: '1686901008197968',
		clientSecret: '5d05433b0d2a13458f672c931f28f3d2',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
		//https://apps.twitter.com/app/9159205/keys
		clientID: 'sNvI5GzEKpUAmPC8DzlQzatDF',
		clientSecret: 'VgHeSsm2QRSWdJJLq9iPkn7WUIrbudWLvotZMuaRXhhM0kbCsh',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	}
};