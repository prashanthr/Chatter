var Constants = require('./includes/constants.js');
var MessageManager = require('./messageManager.js');
var RoomManager = require('./roomManager.js');
var Logger = new (require('./logger.js'))(Constants.LOG_ENABLED);
module.exports = function ChatManager() {
	this.MessageManager = new MessageManager();
	this.RoomManager = new RoomManager();	
	this.clients = [];

	//Create Lobby	
	this.RoomManager.createLobby();
	this.RoomManager.createTestRooms();

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

		connection.write(Constants.PROMPT_WELCOME + `\n`);
		connection.write(Constants.PROMPT_LOGIN + `\n`);		
		Logger.log('Number of clients conected: ' + this.getNumberOfClients());
	}

	this.unregisterConnection = function(connection) {
		if(connection) {
			var index = this.findClientIndex(connection);
			if(index !== -1) {
				this.clients.splice(index,1);
			}
			connection.destroy();
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

	this.stripUserName = function(userName) {
		userName = userName.replace('\r\n', '');
		userName = userName.replace('\\', '');
		userName = userName.replace('\/', '');
		return userName;
	}
	this.registerClient = function(userName, connection) {
		userName = userName.toString();
		userName = this.stripUserName(userName);
		if(this.userNameTaken(userName)) {
			connection.write(userName + ' is taken. Please try another. \n Login user name?\n');
		} else {
			connection.write(userName + ' is available. Registering...\n');
			var client = this.getClient(connection);
			client.userName = userName;
			client.isRegistered = true;
			
			connection.write('You are registered as ' + userName + `\n`);			
			this.RoomManager.addClient(client, Constants.ROOM_LOBBY);			
			connection.write(Constants.PROMPT_HELP + `\n`);
		}
	}

	this.handleMessages = function(data, connection) {
		var client = this.getClient(connection);
		var rooms = this.RoomManager.rooms;		
		var commandAction = this.MessageManager.handleMessage(data, client, rooms);
		this.handleServerCommand(commandAction);
	}

	this.handleServerCommand = function(commandAction) {
		if(commandAction) {
			if(!commandAction.handled) {
				switch(commandAction.command) {
					case Constants.COMMANDS.QUIT:
						this.RoomManager.removeClient(commandAction.client);
						this.unregisterConnection(commandAction.client.connection);
						commandAction.handled = true;
						break;
					case Constants.COMMANDS.JOIN:						
						var response = commandAction.data; //{roomId, isValid}
						this.RoomManager.joinRoom(commandAction.client, response.roomId);
						break;
					case Constants.COMMANDS.LEAVE:
						var response = commandAction.data; //{roomId, isValid}
						this.RoomManager.leaveRoom(commandAction.client);
						break;			
					case Constants.COMMANDS.CREATE:
						var response = commandAction.data;						
						this.RoomManager.makeRoom(commandAction.client, response.roomId);
						break;
					case Constants.COMMANDS.DELETE:
						var response = commandAction.data;
						this.RoomManager.removeRoom(response.roomId, commandAction.client);
						break;
					default:
						Logger.log('Not handling command ' + commandAction + '\n');						
						break;
				}
			}
		}		
	}	

	this.addClient = function(client) {
		this.clients.push(client);
	}

	this.getNumberOfClients = function() {
		return this.clients.length;
	}	
}