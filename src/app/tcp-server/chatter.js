/* tcp-server/chatter.js */
var net = require('net');
var Constants = require('../core/includes/constants.js');
var Logger = new (require('../core/logger.js'))(Constants.LOG_ENABLED);
var ChatManager = new (require('../core/chatManager.js'))();

var server = net.createServer(); 
server.on(Constants.CONNECTION, manageConnection);
server.listen(Constants.SERVER_PORT, Constants.SERVER_HOST);
Logger.onBeginListening(Constants.SERVER_PORT);

function manageConnection(conn) {
    Logger.onConnected('Client Connected [' + conn.remoteAddress +':'+ conn.remotePort + ']');
    ChatManager.registerConnection(conn);

    conn.on(Constants.DATA, manageData);
    conn.on(Constants.ERROR, manageError);
    conn.on(Constants.CLOSE, manageDisconnection);

    function manageData(data) {
        Logger.onMessageReceived('Data [' + conn.remoteAddress + ':' + conn.remotePort + '] :' + data);       
        var client = ChatManager.getClient(conn);        
        if(client !== null) {
            if(client.isRegistered) {
                ChatManager.handleMessages(data, conn);
            } else {
                ChatManager.registerClient(data, conn);
            }
        }        
    }

    function manageDisconnection(data) {
        Logger.onDisconnected('Client Disconnected [' + conn.remoteAddress +':'+ conn.remotePort + ']');
        ChatManager.unregisterConnection(conn);
    }

    function manageError(err) {
        Logger.onError(err);
    }    
}