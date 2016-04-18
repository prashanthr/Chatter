var Constants = require('./includes/constants.js');
var net = require('net');
module.exports = function TcpClient() {
	var self = this;
	this.socket = new net.Socket();
	this.onConnected = function() {
		console.log('Connected');
	}
	this.socket.chatterClient = null;

	this.onData = function(data) {
		console.log('Received: ' + data);
		//client.destroy(); // kill client after server's response
		//chatClient.write('\r\n');		
	}
	
	this.onClose = function(data) {
		console.log('conn closed\n', data);
	}

	this.write = function(data) {
		this.socket.write('\r\n');
	}

	this.connect = function(port, host) {
		this.socket.connect(port, host, function() {
			//this.onConnected();
			console.log('Connected');

			//client.write('Hello, server! Love, Client.');
		});
	};

	this.socket.on(Constants.DATA, function(data) {
		//this.onData(data);
		//console.log('this', this);
		data = data.toString();
		console.log('data', data);
		//this.sendToChatterClient(data);
		if(this.chatterClient) {
			this.chatterClient.connection.write(data);
		}
	});

	this.socket.on(Constants.CLOSE, function(data){
		//this.onClose(data);
		console.log('Connection closed\n', data);
	});

	this.sendToChatterClient = function(data) {
		if(this.chatterClient) {
			this.chatterClient.connection.write(data);
		}
	}
}