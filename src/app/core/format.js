module.exports = function Formatter() {
	this.formatMessage = function(message,userName) {
		message = message.toString().replace(/\r\n/g, '');	
		var formattedMessage = '';
		var newLine = `\n`;
		var userNameSeparator = `:`;
		formattedMessage = userName + userNameSeparator + ' ' + message + newLine;			
		return formattedMessage;
	}	
}