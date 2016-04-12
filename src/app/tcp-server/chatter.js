/* tcp-server/chatter.js */
var net = require('net');
var Constants = require('../core/includes/constants.js');
var Logger = new (require('../core/logger.js'))(Constants.LOG_ENABLED);

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    Logger.onConnected('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        Logger.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        Logger.onDisconnected('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

    sock.on('error', function(err) {
        Logger.onError(err);
    });
    
}).listen(Constants.SERVER_PORT, Constants.SERVER_HOST);

console.log('Server listening on ' + Constants.SERVER_HOST +':'+ Constants.SERVER_PORT);