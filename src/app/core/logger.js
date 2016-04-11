var Constants = require('./includes/constants.js');
module.exports = function Logger(enabled) {
	this.enabled = enabled;
	this.log = function(message) {
		if(this.enabled) {
			console.log(message);	
		}		
	}

	this.onBeginListening = function(port) {
		this.log(Constants.CHATTER + ' is active');
		this.log('listening on *:' + port);
	}

	this.onConnected = function(params) {
		this.log('A user has connected to ' + Constants.CHATTER);
	}

	this.onDisconnected = function(params) {
		this.log('A user has disconnected from ' + Constants.CHATTER);
	}

	this.onMessageReceived = function(message) {
		this.log(message);
	}
}