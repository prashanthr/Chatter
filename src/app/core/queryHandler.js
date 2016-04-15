var Constants = require('./includes/constants.js');
var Utils = new (require('./utils.js'))();
module.exports = function QueryHandler() {
	this.help = function() {
		data = 'List of available commands: ' + '\n';
		for(var prop in Constants.COMMANDS) {
			var cmd = Constants.COMMANDS[prop];
			var details = Constants.COMMAND_DETAILS[prop];
			data = data + cmd + '- ' + details + '\n';
		}
		data = data + 'End of commands.' + '\n';
		return data;
	}

	this.rooms = function(client, rooms) {
		var data = '';
		if(client && rooms && rooms.length > 0) {
			data = data + 'Active Rooms: \n';
			rooms.forEach((room) => {
				var isActive = (room.isActive ? '* ' : '');
				var indicator = (client.roomId === room.id) ? ' (you are here) ' : '';
				var numUsers = room.clients.length;
				data = data + isActive + room.id + ' [' + numUsers +'] ' + indicator + '\n';
			});
			data = data + 'End of list. \n';			
		} else {
			data = data + 'No rooms available \n';
		}		
		return data;
	}

	this.users = function(client, rooms) {
		var data = '';
		if(client && rooms && rooms.length > 0) {
			data = data + 'Active Users in ' + client.roomId +':\n';
			var room = rooms.find((room) => {
				return room.id === client.roomId;
			});
			if(room !== undefined){
				if(room.clients && room.clients.length > 0) {
					room.clients.forEach((c) => {
						var indicator = (c.userName === client.userName) ? ' (you) ' : '';
						data = data + c.userName + indicator + '\n';
					});
					data = data + 'End of list. \n';
				}
			}
		} else {
			data = data + 'No users online \n';
		}
		return data;
	}

	this.checkRoom = function(command, rooms){
		var check = {
			roomId: null,
			isValid: false
		}
		var split = command.split(' ');

		if(split.length == 2) {
			var roomToJoin = split[1];
			if(roomToJoin) {
				var find = rooms.find((room) => {
					return room.id === roomToJoin;
				});
				if(find !== undefined){
					check.isValid = true;
					check.roomId = find.id;
				} else {
					check.isValid = false;
					check.roomId = roomToJoin;
				}
			}
		}		
		return check;
	}

	this.checkUser = function(command, client, rooms) {
		var check = {
			from: client.id,
			to: null,
			message: '',
		}
		var split = command.split(' ');
		var toUser = split[1];
		//TODO:

		return check;
	}

	this.info = function(client, rooms){
		var data = '';
		var roomInfo = client.roomId;
		
		if(rooms) {
			var room = rooms.find((room) => {
				return room.id === client.roomId;
			});
			if(room !== undefined) {
				var privacy = room.isPrivate ? 'private' : 'public';
				roomInfo = roomInfo + ' (owner: ' + room.owner + ', privacy: ' + privacy + ')';
			}	
		}
		
		data = data + '//////////////////////////////////////////\n';
		data = data + 'Your Username: ' + client.userName + '\n';
		data = data + 'Your Address: ' + client.address + '\n';
		data = data + 'Your Port: ' + client.port + '\n';
		data = data + 'Current Chat Room: ' + roomInfo + '\n';
		data = data + 'Server Time: ' + Utils.getTimestamp() + '\n';
		data = data + '//////////////////////////////////////////\n';
		return data;
	}

}