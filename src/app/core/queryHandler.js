var Constants = require('./includes/constants.js');
module.exports = function QueryHandler() {
	this.help = function() {
		data = 'Here are the list of available commands: ' + '\n';
		for(var prop in Constants.COMMANDS) {
			data = data + Constants.COMMANDS[prop] + '\n';
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
				data = data + isActive + room.id + indicator + '\n';
			});
			data = data + 'End of list. \n';			
		} else {
			data = data + 'No rooms available \n';
		}
		console.log('data', data);
		return data;
	}

	this.users = function(client, rooms) {
		var data = '';
		if(client && rooms && rooms.length > 0) {
			data = data + 'Active Users: \n';
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
			var find = rooms.find((room) => {
				return room.id === roomToJoin;
			});
			if(find !== undefined){
				check.isValid = true;
				check.roomId = find.id;
			}
		}
		return check;
	}

}