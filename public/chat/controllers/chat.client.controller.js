angular.module('chat').controller('ChatController', ['$scope', 'Socket',
	function($scope, Socket) {
		
		//Array of messages (will be show on the view)
		$scope.messages = [];

		Socket.on('chatMessage', function(message) {
			$scope.messages.push(message);
		});

		/*
		* @sendMessage()
		* method that will send new messages by emitting the
		* chatMessage event to the socket server.
		*/
		$scope.sendMessage = function() {
			var message = {

				//this.messageText is defined on the view that use ng-model="messageText"
				text: this.messageText,

			};

			Socket.emit('chatMessage', message);
			
			this.messageText = '';
		}

		/*
		* @$scope.$on(msg, callback(){})
		* will be emitted when the controller instance is deconstructed.
		*/
		$scope.$on('$destroy', function() {
			Socket.removeListener('chatMessage');
		})
	}
]);