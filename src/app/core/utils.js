module.exports = function Utils() {
	this.getTimestamp = function(){
		var now = new Date();
		var formattedDate = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + 
		":" + now.getMilliseconds();
		return formattedDate;
	}
}