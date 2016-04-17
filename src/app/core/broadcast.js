var Constants = require('./includes/constants.js');
var Formatter = require('./format.js');
var Logger = new (require('./logger.js'))(Constants.LOG_ENABLED);
module.exports = function Broadcast() {
	this.formatter = new Formatter();
	this.format = function(message, userName) {
		return this.formatter.formatMessage(message, userName);
	}

	this.broadcastMessage = function(data, client, rooms, isServerMessage) {
		if(!isServerMessage) {
			data = this.format(data, client.userName);	
		} else {
			data = data + '\n';
		}
		
		var roomId = client.roomId;		
		
		var roomToBroadcastTo = rooms.find((room) => {
			return room.id === roomId;
		});	
		
		if(roomToBroadcastTo && roomToBroadcastTo.clients && roomToBroadcastTo.clients.length > 0) {
			roomToBroadcastTo.clients.forEach((c) => {
				if(c.userName === client.userName)  {
					//skip same client					
				} else {
					//broadcast to intended recipient(s)
					c.connection.write(data);
				}
			});
		}
	}

	this.broadcastCommand = function(data, client) {
		if(client && data) {
			client.connection.write(data);
		}
	}

	this.broadcastInvalidMessage = function(data, client) {
		//DO NOTHING
	}	
};