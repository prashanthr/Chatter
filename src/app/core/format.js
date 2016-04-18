var Utils = new (require('./utils.js'))();
module.exports = function Formatter() {
	this.formatMessage = function(message,userName) {
		message = message.toString().replace(/\r\n/g, '');	
		var timestamp = this.getTimestamp();
		var formattedMessage = '';
		var newLine = `\n`;
		var userNameSeparator = `:`;
		formattedMessage = timestamp + userName + userNameSeparator + ' ' + message + newLine;			
		return formattedMessage;
	}

	this.getTimestamp = function() {
		var timestamp = Utils.getTimestamp();
		var formattedDate = "[" + timestamp + "] ";
		return formattedDate;
	}

	this.formatPrivateMessage = function(message, fromUserName, toUserName) {
		var formattedMessage = '(Private Message) ' + this.formatMessage(message, fromUserName);
		return formattedMessage;
	}	
}