var Constants = require('./includes/constants.js');
var Parser = require('./parser.js');
var Broadcast = require('./broadcast.js');
var Logger = new (require('./logger.js'))(Constants.LOG_ENABLED);
module.exports = function MessageManager() {
	this.Parser = new Parser();
	this.Broadcast = new Broadcast();
	this.parse = function(message) {
		return this.Parser.decode(message);
	}

	this.handleMessage = function(message, client, rooms, users) {
		//parse & handle
		var cmd = this.parse(message);		
		switch(cmd) {
			case Constants.CMD:
				return this.handleCommandAction(message, client, rooms, users);
				break;
			case Constants.MSG:
				this.handleMessageAction(message, client, rooms);
				break;
			case Constants.INVALID:			
			default:
				this.handleInvalidAction(message, client);
				break;
		}
	}

	this.handleMessageAction = function(message, client, rooms) {
		this.broadcastMessage(message, client, rooms, false);
	}

	this.handleCommandAction = function(message, client, rooms, users) {
		var commandAction = this.Parser.decodeCommand(message, client, rooms, users);		
		if(commandAction.privateMessageState && commandAction.privateMessageState.enabled) {
			//Send Private Message
			var recipient = commandAction.privateMessageState.recipient;
			var msg = commandAction.privateMessageState.message;
			this.handlePrivateMessage(client, recipient, msg);
		}

		if(commandAction.shouldBroadcast) {
			this.Broadcast.broadcastCommand(commandAction.data, client);	
		}  		
		return commandAction;		
	}

	this.handleInvalidAction = function(message, client) {
		this.Broadcast.broadcastInvalidMessage(message, client);
	}

	this.broadcastMessage = function(message, client, rooms, isServerMessage) {
		this.Broadcast.broadcastMessage(message, client, rooms, isServerMessage);
	}

	this.handlePrivateMessage = function(client, recipient, message) {
		this.Broadcast.broadcastToOne(client, recipient, message);
	}
};