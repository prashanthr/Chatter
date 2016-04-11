var Constants = require('./includes/constants.js');
module.exports = function Manager() {
	this.rooms = [];
	this.users = [];
	this.addRoom = function(room) {

	}
	this.addUser = function(user) {

	}

	this.getNumberOfRooms = function() {
		return rooms.length;
	}

	this.getNumberOfUsers = function() {
		return users.length;
	}

	this.numUsersInRoom = function(room) {
		if(room && room.userIds.length > 0) {
			return room.userIds.length;
		}
	}

}