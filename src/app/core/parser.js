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

		var commandAction = {
			command: command,
			shouldBroadcast: true,
			data: data,
			client: client,
			handled: false
		}

		
		console.log('c', command);	
		
		console.log('command.len', command.length);

		//if(command.indexOf(Constants.COMMANDS.HELP) !== -1) 
		switch(command) {
			case Constants.COMMANDS.HELP:
				commandAction.data = CommandHandler.help();
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.ROOMS:
				commandAction.data = CommandHandler.rooms(client, rooms);
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.USERS:
				commandAction.data = CommandHandler.users(client, rooms);
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.QUIT:
				console.log('quit hhandler');
				commandAction.shouldBroadcast = false;
				commandAction.handled = false;
				break;
			default:
				commandAction.data = 'The command [' + command + '] is invalid. Type ' + Constants.COMMANDS.HELP + ' for a list of available commands.' + '\n';
				commandAction.handled = true;
				break;
		}

		return commandAction;				
	}
}