var Constants = require('./includes/constants.js');
var Guid = require('./guid.js');
module.exports = function RoomManager() {
	this.rooms = [];

	this.createLobby = function() {
		var lobby = this.createRoom(Constants.ROOM_LOBBY);
		this.addRoom(lobby);
	}

	this.createTestRooms = function() {
		var fakeRooms = ['Alpha', 'Beta'];
		fakeRooms.forEach((roomId) => {
			var room = this.createRoom(roomId);
			this.addRoom(room);
		});
	}

	this.createRoom = function(roomId) {
		var room = {
			id: roomId,
			clients: [],
			maxNumberOfUsers: null,
			isActive: true,
			owner: 'server',
			isPrivate: false,
		}
		return room;
	}

	this.makeRoom = function(client, roomId) {
		client.connection.write("Creating room " + roomId + "\n");
		var room = this.createRoom(roomId);
		room.owner = client.userName;
		this.addRoom(room);
		client.connection.write(roomId + " has been created.\n");
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

	this.removeRoom = function(roomId, client) {
		if(roomId === Constants.ROOM_LOBBY) {
			client.connection.write('Cannot delete lobby. You do not have permissions to do so.\n');
			return;
		}

		var roomIndex = this.rooms.findIndex((room) => {
			return room.id === roomId;
		});

		var room = this.rooms[roomIndex];

		if(roomIndex !== -1) {
			if(room.owner === client.userName) {
				var room = this.rooms[roomIndex];
				if(room) {
					room.clients.forEach((client) => {
						//client.roomId = Constants.ROOM_LOBBY;
						this.leaveRoom(client);
					});
				}
				this.rooms.splice(roomIndex, 1);
				client.connection.write('Room ' + roomId + ' has been deleted. Type ' + Constants.COMMANDS.ROOMS + ' to view active rooms. \n');
			} else {
				client.connection.write('You do not have permissions to delete room ' + roomId + '\n');
			}
			
		} else {
			client.connection.write('No room with name ' + roomId + ' found.\n');
		}
		
	}

	this.addClient = function(client, roomId) {
		var room = this.findRoom(roomId);
		var maxReached = this.maxNumOfUsersReached(roomId);			 
		if(room !== undefined && !maxReached) {
			var clientExists = this.clientExists(client, room);
			if(!clientExists){
				console.log('adding client to room ', roomId, client.userName);
				client.connection.write('Joining room ' + roomId + '...\n');
				client.roomId = roomId;
				room.clients.push(client);
				var welcomeMessage = '';
				if(roomId === Constants.ROOM_LOBBY) {
					welcomeMessage = "You are now in the " + Constants.ROOM_LOBBY +"\n";
				} else {
					welcomeMessage = 'You are now in room ' + roomId + '\n';
				}
				client.connection.write(welcomeMessage);
				
			}			
		}
	}

	this.joinRoom = function(client, targetRoomId) {
		if(client.roomId === targetRoomId) {
			console.log('Client is already in desired room ' + targetRoomId + '\n');
			return;
		}

		this.removeClient(client);
		this.addClient(client, targetRoomId);
	}

	this.leaveRoom = function(client) {
		this.joinRoom(client, Constants.ROOM_LOBBY);
	}

	this.removeClient = function(client) {
		var room = this.findRoom(client.roomId);
		var index = room.clients.findIndex((c) => {
			return c.userName === client.userName;
		})
		if(index !== -1) {
			client.connection.write('You are leaving room ' + client.roomId + '\n');
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