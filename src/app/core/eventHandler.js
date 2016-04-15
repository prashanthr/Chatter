var Constants = require('./includes/constants.js');
module.exports = function Event() {
	this.broadcastToAll
	this.handleEvent = function (event, message) {
		switch(event) {
			 case Constants.CMD:
				this.handleCommand(event);
				break;
			case Constants.MSG:
				this.handleMsg(message);
				break;
			case Constants.INVALID:
				this.handleInvalidCommand();
				break;
		}
	}

	this.handleCommand = function (command) {
		console.log('cmd', command);		
	}

	this.handleMsg = function (message) {
		console.log('msg', message)	;		
	}
}