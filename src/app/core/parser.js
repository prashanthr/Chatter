/* parser.js */
var Constants = require('./includes/constants.js');
var QueryHandler = new (require('./queryHandler.js'))();
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
		var key = command.split(' ')[0];
		var commandAction = {
			command: key,
			shouldBroadcast: true,
			data: data,
			client: client,
			handled: false
		}

		
		console.log('c', command);	
		
		console.log('command.len', command.length);

		//if(command.indexOf(Constants.COMMANDS.HELP) !== -1) 
		switch(key) {
			case Constants.COMMANDS.HELP:
				commandAction.data = QueryHandler.help();
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.ROOMS:
				commandAction.data = QueryHandler.rooms(client, rooms);
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.USERS:
				commandAction.data = QueryHandler.users(client, rooms);
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.QUIT:				
				commandAction.shouldBroadcast = false;
				commandAction.handled = false;
				break;
			case Constants.COMMANDS.JOIN:
				var checkRoom = QueryHandler.checkRoom(command, rooms);
				if(checkRoom.isValid){
					commandAction.data = checkRoom;
					commandAction.shouldBroadcast = false;
					commandAction.handled = false;	
				} else {
					commandAction.data = 'Room does not exist or is invalid\n';
					commandAction.shouldBroadcast = true;
					commandAction.handled = true;
				}				
				break;
			case Constants.COMMANDS.LEAVE:
				commandAction.shouldBroadcast = false;
				commandAction.handled = false;
				break;			
			default:
				commandAction.data = 'The command [' + command + '] is invalid or not yet supported. Type ' + Constants.COMMANDS.HELP + ' for a list of available commands.' + '\n';
				commandAction.handled = true;
				break;
		}

		return commandAction;				
	}
}