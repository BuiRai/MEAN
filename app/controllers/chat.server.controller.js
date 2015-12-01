module.exports = function(io, socket) {

	/*
	* @io.emit('chatMessage')
	* inform all the connected socket clients about the newly connected user.
	*/
	io.emit('chatMessage', {
		type: 'status',
		text: 'connected',
		created: Date.now(),
		username: socket.request.user.username
	});

	/*
	* @socket.on('chatMessage', function(message){}
	* take care of messages sent from the socket client.
	*/
	socket.on('chatMessage', function(message) {
		message.type = 'message';
		message.created = Date.now();
		message.username = socket.request.user.username;

		io.emit('chatMessage', message);
	});

	/*
	* @socket.on('disconnect', function() {}
	* take care of handling the disconnect system event.
	*/
	socket.on('disconnect', function() {
		io.emit('chatMessage', {
		type: 'status',
		text: 'disconnected',
		created: Date.now(),
		username: socket.request.user.username
		});
	});
};