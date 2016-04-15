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
		Logger.log('data', data);		
		var roomId = client.roomId;		
		//console.log('printing', client, rooms, rooms.length);
		var roomToBroadcastTo = rooms.find((room) => {
			return room.id === roomId;
		});

		console.log('roomToBroadcastTo', roomToBroadcastTo);
		
		if(roomToBroadcastTo && roomToBroadcastTo.clients && roomToBroadcastTo.clients.length > 0) {
			console.log('here');
			roomToBroadcastTo.clients.forEach((c) => {
				console.log('user', c.userName);
				if(c.userName === client.userName)  {
					//skip
					console.log('skipping');
				} else {
					console.log('writing');
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