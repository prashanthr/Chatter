var path = require('path');
var fs = require('fs');
module.exports = function FileHandler() {
	var fileName = __dirname + "/../../" + "logs/log.txt";
	this.log = function(data) {
		fs.appendFile(this.fileName, data, function(err){
			//if (err) throw err;
  			if(err) {
  				console.log('err');
  			}  			
		})
	}
}