var Constants = require('./includes/constants.js');
var Formatter = require('./format.js');
var Logger = new (require('./logger.js'))(Constants.LOG_ENABLED);
module.exports = function Broadcast() {
	this.formatter = new Formatter();
	this.format = function(message, userName) {
		return this.formatter.formatMessage(message, userName);
	}

	this.broadcastMessage = function(data, client, rooms) {
		data = this.format(data, client.userName);
		Logger.log('data', data);		
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

	}	
};