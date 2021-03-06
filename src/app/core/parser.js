/* parser.js */
var Constants = require('./includes/constants.js');
var QueryHandler = new (require('./queryHandler.js'))();
module.exports = function Parser() {
	this.decode = function (message) {
		if(!message) {
			return Constants.INVALID;
		}
		message = this.stripChars(message);
		if(message.startsWith(Constants.COMMAND_PREFIX)) {
			if(message.match(/\//g).length > 1) {
				return Constants.MSG;
			} else {
				return Constants.CMD;
			}
		}
		//Skip messages with only return char from client
		if(message === '') {
			return Constants.INVALID;
		}
		return Constants.MSG;
	}

	this.stripChars = function (message) {
		return message.toString().replace(/\r\n/g, '');		
	}

	this.decodeCommand = function(command, client, rooms, users) {
		var data = '';
		command = this.stripChars(command);
		var key = command.split(' ')[0];
		var commandAction = {
			command: key,
			shouldBroadcast: true,
			data: data,
			client: client,
			handled: false,
			broadcastAllState: {
				broadcastOnComplete: false,
				broadcastMessage: '',
				client: client,
				rooms: rooms
			},
			privateMessageState: {
				enabled: false, 
				recipient: null,
				message: null
			}
		}

		switch(key) {
			case Constants.COMMANDS.HELP:
				commandAction.data = QueryHandler.help();
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.ROOMS:
				commandAction.data = QueryHandler.rooms(client, rooms);
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.USERS:
				commandAction.data = QueryHandler.users(client, rooms);
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.QUIT:				
				commandAction.shouldBroadcast = false;
				commandAction.handled = false;				
				break;
			case Constants.COMMANDS.JOIN:
				var checkRoom = QueryHandler.checkRoom(command, rooms);
				if(checkRoom.isValid){
					commandAction.data = checkRoom;
					commandAction.shouldBroadcast = false;
					commandAction.handled = false;					
					commandAction.broadcastAllState.broadcastMessage = 'User ' + client.userName + ' has joined room ' + checkRoom.roomId + '\n';
					commandAction.broadcastAllState.broadcastOnComplete = true;					
				} else {
					commandAction.data = 'Room does not exist or is invalid. Room names are case sensitive.\n';
					commandAction.shouldBroadcast = true;
					commandAction.handled = true;
				}				
				break;
			case Constants.COMMANDS.LEAVE:
				commandAction.shouldBroadcast = false;
				commandAction.handled = false;
				commandAction.broadcastAllState.client = Object.assign({}, client);
				commandAction.broadcastAllState.broadcastMessage = 'User ' + client.userName + ' has left room ' + client.roomId + '\n';
				commandAction.broadcastAllState.broadcastOnComplete = true;				
				break;
			case Constants.COMMANDS.CREATE:				
				var checkRoom = QueryHandler.checkRoom(command, rooms);
				if(checkRoom.isValid) {
					//Room already exists
					commandAction.data = 'Room already exists! Cannot create a room with the same name\n';
					commandAction.shouldBroadcast = true;
					commandAction.handled = true;
				} else {
					if(checkRoom.roomId !== null) {
						commandAction.data = checkRoom;
						commandAction.shouldBroadcast = false;
						commandAction.handled = false;	
					} else {
						commandAction.data = 'Invalid/bad room name! Cannot create a room with that name\n';
						commandAction.shouldBroadcast = true;
						commandAction.handled = true;
					}
					
				}
				break;
			case Constants.COMMANDS.DELETE:
				var checkRoom = QueryHandler.checkRoom(command, rooms);
				if(checkRoom.isValid){
					commandAction.data = checkRoom;
					commandAction.shouldBroadcast = false;
					commandAction.handled = false;	
				} else {
					commandAction.data = 'No such room exists. Nothing to delete\n';
					commandAction.shouldBroadcast = true;
					commandAction.handled = true;	
				}
				break;
			case Constants.COMMANDS.INFO:
				commandAction.data = QueryHandler.info(client, rooms);
				commandAction.handled = true;
				break;
			case Constants.COMMANDS.MSG:
				var checkUser = QueryHandler.checkUser(command, client, rooms, users);
				if(checkUser.isValid) {
					//Send Msg
					commandAction.privateMessageState.enabled = true;
					commandAction.privateMessageState.recipient = checkUser.recipient;
					commandAction.privateMessageState.message = checkUser.message;
					commandAction.data = 'Private message has been sent to ' + checkUser.recipient.userName + '.\n';	
					commandAction.shouldBroadcast = true;
					commandAction.handled = true;
				} else {
					commandAction.data = checkUser.invalidMessage;	
					commandAction.shouldBroadcast = true;
					commandAction.handled = true;	
				}				
				break;
			default:
				commandAction.data = 'The command [' + command + '] is invalid or not yet supported. ' + Constants.PROMPT_HELP;
				commandAction.handled = true;
				break;
		}

		return commandAction;				
	}
}