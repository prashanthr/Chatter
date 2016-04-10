/* parser.js */
var Constants = require('../includes/constants.js');
module.exports = function Parser() {
	this.decode = function (message) {
		if(!message) {
			return Constants.INVALID;
		}
		if(message.startsWith(Constants.COMMAND_PREFIX)) {
			if(message.match(/\//g).length > 1) {
				return Constants.MSG;
			} else {
				return Constants.CMD;
			}
		}
		return Constants.MSG;
	}
}