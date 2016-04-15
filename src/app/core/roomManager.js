var Constants = require('./includes/constants.js');
var Guid = require('./guid.js');
module.exports = function RoomManager() {
	this.rooms = [];
	this.createRoom = function(roomId) {
		var room = {
			id: roomId,
			clients: [],
			maxNumberOfUsers: null,
			isActive: true
		}
		return room;
	}

	this.getRooms = function() {
		return this.rooms;
	}

	this.addRoom = function(room) {
		this.rooms.push(room);
	}

	this.setMaxNumberOfUsers = function(maxNumberOfUsers, roomId) {
		var room = this.findRoom(roomId);
		room.maxNumberOfUsers = maxNumberOfUsers;
	}

	this.findRoom = function(roomId) {
		var room = this.rooms.find((r) => {
			return r.id === roomId;
		});
		return room;
	}

	this.getClientRoom = function(client) {
		var room = this.findRoom(client.roomId);
		return room;
	}

	this.addClient = function(client, roomId) {
		var room = this.findRoom(roomId);
		var maxReached = this.maxNumOfUsersReached(room.id);			 
		if(room !== undefined && !maxReached) {
			var clientExists = this.clientExists(client, room);
			if(!clientExists){
				console.log('adding client to room ', roomId, client.userName);
				room.clients.push(client);
			}			
		}
	}

	this.removeClient = function(client) {
		var room = this.findRoom(client.roomId);
		var index = room.clients.findIndex((c) => {
			return c.userName === client.userName;
		})
		if(index !== -1) {
			room.clients.splice(index, 1);
		}
	}

	this.clientExists = function(client, room) {
		if(room && client) {			
			if(room.clients.length > 0) {
				var found = room.clients.find((c) => {
					return c.userName === client.userName;
				});
				console.log('client found? ', found);
				return found !== undefined;
			}
		}

		return false;
	}	

	this.maxNumOfUsersReached = function(roomId) {
		var room = this.findRoom(roomId);
		if(room !== undefined && room.maxNumberOfUsers !== null) {
			return room.clients.length < room.maxNumberOfUsers;
		}
		return false;		
	}
}