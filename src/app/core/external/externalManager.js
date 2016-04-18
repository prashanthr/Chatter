var TcpClient = require('../tcpClient.js');
var Constants = require('../includes/constants.js');
module.exports = function ExternalManager() {
	this.TcpClient = new TcpClient();
	this.connect = function (tcpClient, host, port) {
		tcpClient.connect(port, host);
	}
	this.issueRequest = new function() {

	}

	this.createResponse = new function() {

	}
	
	this.initateTransmission = function(client, host, port) {
		//this.TcpClient.onData = this.handleRequest(client);
		this.connect(this.TcpClient, host, port);
		this.TcpClient.socket.chatterClient = client;
		client.connection.write('Connected to ' + host + ':' + port + '\n');		
		client.connection.write('Type ' + Constants.COMMAND_END + ' to end your session with this service.\n');
	}

	this.endTransmission = function(client, host, port) {
		client.connection.write('Exiting service...\n');
		this.TcpClient.socket.destroy();
		this.TcpClient = null;
	}

	this.handleTransmission = function(client, host, port, data) {
		this.TcpClient.write(data);		
	}	
}