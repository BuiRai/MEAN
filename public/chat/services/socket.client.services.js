angular.module('chat').service('Socket', ['Authentication', '$location', '$timeout',
	function(Authentication, $location, $timeout) {

		/*
		* @the "if-else" mean:
		* ou checked whether the user is authenticated using the Authentication service.
		*/
		if (Authentication.user) {
			this.socket = io();
		} else {
			$location.path('/');
		}

		//Wrap the method socket.on(eventName, function(data){})
		this.on = function(eventName, callback) {
			if (this.socket) {
				this.socket.on(eventName, function(data) {
					$timeout(function() {
						callback(data);
					});
				});
			}
		};

		//Wrap the method socket.emit(eventName, data)
		this.emit = function(eventName, data) {
			if (this.socket) {
				this.socket.emit(eventName, data);
			}
		};

		//Wrap the method socket.removeListener(eventName)
		this.removeListener = function(eventName) {
			if (this.socket) {
				this.socket.removeListener(eventName);
			}
		};
	}
]);