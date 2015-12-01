var config = require('./config'),
	cookieParser = require('cookie-parser'),
	passport = require('passport');

module.exports = function(server, io, mongoStore) {
	io.use(function(socket, next) { //method to intercept the handshake process
		
		//parse the handshake request cookie and retrieve the Express sessionId.
		cookieParser(config.sessionSecret)(socket.request, {},
		function(err) {

			//retrieve the session information from the MongoDB storage
			var sessionId = socket.request.signedCookies['connect.sid'];
			
			//retrieved the session object
			mongoStore.get(sessionId, function(err, session) {
				socket.request.session = session;

				//populate the session's user object according to the session information.
				passport.initialize()(socket.request, {}, function() {
					passport.session()(socket.request, {}, function() {
						
						//If a user is authenticated
						if (socket.request.user) {
							
							//call the next() callback and continue with the socket initialization
							next(null, true);

						} else {
							next(new Error('User is not authenticated'), false);
						}
					})
				});
			});
		});
	});

	io.on('connection', function(socket) {

		//the socket server connection event is used to load the chat controller.
		require('../app/controllers/chat.server.controller')(io, socket);
		
	});
};