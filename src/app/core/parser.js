/* parser.js */
var Constants = require('./includes/constants.js');
var CommandHandler = new (require('./commandHandler.js'))();
module.exports = function Parser() {
	this.decode = function (message) {
		if(!message) {
			return Constants.INVALID;
		}
		message = this.stripChars(message);
		if(message.startsWith(Constants.COMMAND_PREFIX)) {
			if(message.match(/\//g).length > 1) {
				return Constants.MSG;
			} else {
				return Constants.CMD;
			}
		}
		return Constants.MSG;
	}

	this.stripChars = function (message) {
		return message.toString().replace(/\r\n/g, '');
	}

	this.decodeCommand = function(command, client, rooms) {
		var data = '';
		command = this.stripChars(command);
		console.log('c', command);	
		
		console.log('command.len', command.length);

		//if(command.indexOf(Constants.COMMANDS.HELP) !== -1) 
		switch(command) {
			case Constants.COMMANDS.HELP:
				return CommandHandler.help();				
				break;
			case Constants.COMMANDS.ROOMS:
				console.log('room handling');
				return CommandHandler.rooms(client, rooms);
				break;
			default:
				data = 'The command [' + command + '] is invalid. Type ' + Constants.COMMANDS.HELP + ' for a list of available commands.' + '\n';
				break;
		}

		//console.log('data to send: ', data);
		return data;		
	}
}