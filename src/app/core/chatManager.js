var Constants = require('./includes/constants.js');
module.exports = function ChatManager() {
	this.rooms = [];
	this.clients = [];

	this.registerConnection = function(connection) {
		var client = {
			connection: connection,
			address: connection.remoteAddress,
			port: connection.remotePort,
			userName: null,
			isRegistered: false
		};	
		this.addClient(client);		
		connection.write('Welcome to ' + Constants.CHATTER + ' server\n' + 'Login name?\n');
		console.log('Number of clients conected: ', this.getNumberOfClients());
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
		console.log("clients", this.clients);
		var found = this.clients.find((client) => {
			console.log('client-username', client.userName);
			return client.userName === userName;
		});
		console.log("found", found);
		return found !== undefined;
		/*var client = this.getClientByUserName(userName);
		console.log("client found: ", client);*/
		return client !== null;
	}

	this.getClient = function(connection) {
		var index = this.findClientIndex(connection);
		console.log(index);
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
			connection.write(userName + ' is taken. Please try another. User Name?');
		} else {
			connection.write(userName + ' is available. Registering...\n');
			var client = this.getClient(connection);
			client.userName = userName;
			client.isRegistered = true;
			/*var index = this.findClientIndex(connection);
			this.clients[index] = client;*/
			connection.write('You are now registered as ' + userName);
		}
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

	this.numUsersInRoom = function(room) {
		if(room && room.userIds.length > 0) {
			return room.userIds.length;
		}
	}

	this.broadcastToAll = function(data) {
		this.clients.forEach((client) => {
			client.connection.write(data);
		});
	}

	this.broadcast = function(data, userNames) {
		if(userNames && userNames.length > 0) {
			userNames.forEach((userName) => {
				var client = this.getClientByUserName(userName);
				client.connection.write(data);
			});
		}
	}

}