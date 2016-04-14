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

	this.decodeCommand = function(command) {
		var data = '';
		console.log('c', command.toString());
		switch(command.toString()) {
			case Constants.COMMANDS.HELP:
				data = 'Here are the list of available commands: ' + '\n';
				data = data + Constants.COMMANDS + '\n';
			break;
		}

		return data;		
	}
}