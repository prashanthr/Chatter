var Constants = require('./includes/constants.js');
module.exports = function CommandHandler() {
	this.help = function() {
		data = 'Here are the list of available commands: ' + '\n';
		for(var prop in Constants.COMMANDS) {
			data = data + Constants.COMMANDS[prop] + '\n';
		}
		data = data + 'End of commands.' + '\n';
		return data;
	}

	this.rooms = function(client, rooms) {
		console.log('roomhere');
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
			data = data + 'No rooms available';
		}
		console.log('data', data);
		return data;
	}
}