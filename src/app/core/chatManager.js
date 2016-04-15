var Constants = require('./includes/constants.js');
var MessageManager = require('./messageManager.js');
var RoomManager = require('./roomManager.js');
var Logger = new (require('./logger.js'))(Constants.LOG_ENABLED);
module.exports = function ChatManager() {
	this.MessageManager = new MessageManager();
	this.RoomManager = new RoomManager();
	this.rooms = [];
	this.clients = [];

	//Create Lobby
	/*var lobby = {
		id: Constants.ROOM_LOBBY,
		clients: [],
		maxNumberOfUsers: null
	}
	this.rooms.push(lobby);*/
	var lobby = this.RoomManager.createRoom(Constants.ROOM_LOBBY);
	this.RoomManager.addRoom(lobby);

	this.registerConnection = function(connection) {
		var client = {
			connection: connection,
			address: connection.remoteAddress,
			port: connection.remotePort,
			userName: null,
			isRegistered: false,
			roomId: Constants.ROOM_LOBBY
		};	
		this.addClient(client);
		/*var lobby = this.findRoomById(Constants.ROOM_LOBBY);
		if(lobby !== undefined) {
			lobby.clients.push(client);	
		}*/
		//this.RoomManager.addClient(client, Constants.ROOM_LOBBY);

		connection.write(Constants.PROMPT_WELCOME + `\n`);
		connection.write(Constants.PROMPT_LOGIN + `\n`);
		connection.write(Constants.PROMPT_LOBBY + `\n`);
		Logger.log('Number of clients conected: ' + this.getNumberOfClients());
	}

	this.unregisterConnection = function(connection) {
		var index = this.findClientIndex(connection);
		if(index !== -1) {
			this.clients.splice(index,1);
		}
	}

	this.findClientIndex = function(connection) {
		var index = this.clients.findIndex((c) => {
			return (c.address === connection.remoteAddress 
					&& c.port === connection.remotePort);
		});
		return index;
	}

	this.findClientIndexByUserName = function(userName) {
		var index = this.clients.findIndex((c) => {
			return (c.userName === userName);
		});
		return index;
	}

	this.userNameTaken = function(userName) {
		var found = this.clients.find((client) => {
			return client.userName === userName;
		});
		
		return found !== undefined;
		/*var client = this.getClientByUserName(userName);
		console.log("client found: ", client);
		return client !== null;*/
	}

	this.getClient = function(connection) {
		var index = this.findClientIndex(connection);
		if(index !== -1) {
			return this.clients[index];
		} else {
			return null;
		}
	}

	this.getClientByUserName = function(userName) {
		var index = this.findClientIndexByUserName(userName);
		if(index !== -1) {
			return this.clients[index];
		}else{
			return null;
		}

	}

	this.registerClient = function(userName, connection) {
		userName = userName.toString().replace('\r\n', '');
		if(this.userNameTaken(userName)) {
			connection.write(userName + ' is taken. Please try another. \n Login user name?\n');
		} else {
			connection.write(userName + ' is available. Registering...\n');
			var client = this.getClient(connection);
			client.userName = userName;
			client.isRegistered = true;
			/*var index = this.findClientIndex(connection);
			this.clients[index] = client;*/
			connection.write('You are now registered as ' + userName + `\n`);			
			this.RoomManager.addClient(client, Constants.ROOM_LOBBY);
		}
	}

	this.handleMessages = function(data, connection) {
		var client = this.getClient(connection);
		var rooms = this.RoomManager.rooms;
		console.log('room', rooms);
		this.MessageManager.handleMessage(data, client, rooms);
	}

	this.addRoom = function(room) {
		this.rooms.push(room);
	}
	this.addClient = function(client) {
		this.clients.push(client);
	}	
	this.getNumberOfRooms = function() {
		return this.rooms.length;
	}

	this.getNumberOfClients = function() {
		return this.clients.length;
	}

	this.findRoomById = function(roomId) {
		var room = this.rooms.find((room) => {
			return room.id === roomId;
		});
		return room;
	}
}