var Constants = require('./includes/constants.js');
var Formatter = require('./format.js');
var Logger = new (require('./logger.js'))(Constants.LOG_ENABLED);
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
		Logger.log(client.userName + ' says: ' + data + '\n');		
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
		if(client && data) {
			client.connection.write(data);
		}
	}

	this.broadcastInvalidMessage = function(data, client) {

	}	
};