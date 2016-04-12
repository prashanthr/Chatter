/* web-server/chatter.js */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Constants = require('../core/includes/constants.js');
var Parser = new (require('../core/parser.js'))();
var EventHandler = new (require('../core/eventHandler.js'))();
var Logger = new (require('../core/logger.js'))(Constants.LOG_ENABLED);

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
  res.sendFile(Constants.CLIENT_PATH);
});

io.on(Constants.CONNECTION, function(socket){
  Logger.onConnected();
  //io.emit('AskUserName')  
  
  socket.on(Constants.DISCONNECT, function(){
    Logger.onDisconnected();
  });
  
  socket.on(Constants.CHATMESSAGE, function(msg){
     Logger.onMessageReceived(msg);
     io.emit(Constants.CHATMESSAGE, msg);     
     var cmd = Parser.decode(msg);
     EventHandler.handleEvent(cmd,msg);
  });

});

  function listen(port) {
    server.listen(port, function(){    
    Logger.onBeginListening(port);
    });
  }

  listen(Constants.SERVER_PORT);