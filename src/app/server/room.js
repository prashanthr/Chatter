var Constants = require('../includes/constants.js');
var Guid = require('./guid.js');
module.exports = function Room() {
	this.id  = '';
	this.name = '';
	this.userIds = [];
	this.maxNumOfUsers = 10;
	this.create = function(roomName) {
		if(roomName) {
			this.id = new Guid();
			this.name = roomName;	
			return true;
		}		
		return false;
	}
	this.addUser = function(userId) {
		if(!this.maxNumOfUsersReached()) {
			var user = this.findUser(userId);
			if(user !== null) {
				this.userIds.push(userId);		
			}
		}		
	}

	this.findUser = function(userId) {
		if(this.userIds && this.userIds.length > 0) {
			userIds.find((uId) => {
				return uId === userId;
			});
		}

		return null;
	}

	this.maxNumOfUsersReached = function() {
		return this.userIds.length < this.maxNumOfUsers;
	}
}