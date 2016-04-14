var Constants = require('./includes/constants.js');
var Formatter = require('./format.js');
module.exports = function Broadcast() {
	this.formatter = new Formatter();
	this.format = function(message, userName) {
		return this.formatter.formatMessage(message, userName);
	}

	this.broadcastMessage = function(data, client, rooms) {
		/*this.clients.forEach((client) => {
			client.connection.write(data);
		});*/
		//client.connection.write('')
		data = this.format(data, client.userName);
		console.log(client.userName + ' says: ' + data + '\n');		
		var roomId = client.roomId;		
		var roomToBroadcastTo = rooms.find((room) => {
			room.id === roomId;
		});
		
		if(roomToBroadcastTo && roomToBroadcastTo.clients && roomToBroadcastTo.clients.length > 0) {
			roomToBroadcastTo.clients.forEach((c) => {
				if(c.id === client.id)  {
					//skip
				} else {
					c.connection.write(data);
				}
			});
		}
	}

	this.broadcastCommand = function(data, client) {
		
	}

	this.broadcastInvalidMessage = function(data, client) {

	}	
};