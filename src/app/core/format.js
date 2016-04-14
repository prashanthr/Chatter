module.exports = function Formatter() {
	this.formatMessage = function(message,userName) {
		var formattedMessage = '';
		var newLine = `\n`;
		var userNameSeparator = `:`;
		formattedMessage = userName + ' ' + userNameSeparator + ' ' + message + newLine;			
		return formattedMessage;
	}	
}