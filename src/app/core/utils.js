module.exports = function Utils() {
	this.getTimestamp = function(){
		var now = new Date();
		var formattedDate = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + 
		":" + now.getMilliseconds();
		return formattedDate;
	}

	this.getFileTimestamp = function(){
		var now = new Date();
		var formattedDate = now.getUTCFullYear() + "_" + (now.getUTCMonth() + 1) + "_" + now.getUTCDate() + "_" + 
		now.getUTCHours() + now.getUTCMinutes() + now.getUTCSeconds();
		return formattedDate.toString();
	}
}