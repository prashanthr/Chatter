/* parser.js */
var Constants = require('./includes/constants.js');
module.exports = function Parser() {
	this.decode = function (message) {
		if(!message) {
			return Constants.INVALID;
		}
		if(message.toString().startsWith(Constants.COMMAND_PREFIX)) {
			if(message.toString().match(/\//g).length > 1) {
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

	this.decodeCommand = function(command) {
		var data = '';
		command = this.stripChars(command);
		console.log('c', command);	
		
		console.log('command.len', command.length);

		//if(command.indexOf(Constants.COMMANDS.HELP) !== -1) 
		switch(command) {
			case Constants.COMMANDS.HELP:
				data = 'Here are the list of available commands: ' + '\n';
				for(var prop in Constants.COMMANDS) {
					data = data + Constants.COMMANDS[prop] + '\n';
				}
				
			break;
			default:
				console.log('default');
				break;
		}

		console.log('data to send: ', data);
		return data;		
	}
}