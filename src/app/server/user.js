var Constants = require('../includes/constants.js');
module.exports = function User() {
	this.id = '';
	this.name = '';
	this.isAuthenticated = false;
	this.login = function (id, pwd) {
		// handle authentication
	}
	this.add = function(id) {
		this.id = id;		
		return this;
	}
	this.remove = function(id) {
		this.id = null;		
	}
}