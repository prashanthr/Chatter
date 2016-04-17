var path = require('path');
var fs = require('fs');
var Utils = new (require('./utils.js'))();
module.exports = function FileHandler() {
	var dirName = __dirname + "/../../" + "logs/" + Utils.getFileTimestamp();
	var fileName =  this.dirName + "/log.txt";
	
	this.dirCheck = function (dirName) {
		if (!fs.existsSync(dirName)){
    		fs.mkdirSync(dirName);
		}
	}

	//this.dirCheck(dirName);

	this.log = function(data) {		
		fs.appendFile(this.fileName, data, function(err){
			//if (err) throw err;
  			if(err) {
  				console.log('err');
  			}  			
		})
	}
}