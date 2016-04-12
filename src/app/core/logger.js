var Constants = require('./includes/constants.js');
module.exports = function Logger(enabled) {
	this.enabled = enabled;
	this.log = function(message) {
		if(this.enabled) {
			if(message) {
				console.log(message);		
			}			
		}		
	}

	this.onBeginListening = function(port) {
		this.log(Constants.CHATTER + ' is active');
		this.log('listening on *:' + port);
	}

	this.onConnected = function(message) {
		this.log('A user has connected to ' + Constants.CHATTER);		
	}

	this.onDisconnected = function(message) {
		this.log('A user has disconnected from ' + Constants.CHATTER);
		this.log(msg);
	}

	this.onMessageReceived = function(message) {
		this.log(message);
	}

	this.onError = function(message) {
		this.log(message);
	}
}