/* constants.js */
var path = require('path');

const CHATTER = "CHATTER";

const CONNECTION = "connection";
const DISCONNECT = "disconnect";
const CHATMESSAGE = "chat message";

const IncludesDir = "includes";
const ClientDir = "web-client";
const ServerDir = "web-server";
const ServerPort = 3000;
const ServerHost = "127.0.0.1";
const ClientRoot = __dirname + "/../../" + ClientDir + '/index.html';
const ClientPath = path.resolve(ClientRoot);

const COMMAND_PREFIX = "/";
const MSG_TYPE_CMD = "CMD";
const MSG_TYPE_MSG = "MSG";
const MSG_TYPE_INVALID = "INVALID";

const LOG_ENABLED = true;

module.exports = {
	CHATTER: CHATTER,
	CONNECTION: CONNECTION,
	DISCONNECT: DISCONNECT,
	CHATMESSAGE: CHATMESSAGE,
	INCLUDES_DIR: IncludesDir,
    CLIENT_DIR: ClientDir,
    SERVER_DIR: ServerDir,
    SERVER_PORT: ServerPort,
    SERVER_HOST: ServerHost,
    CLIENT_PATH: ClientPath,
    COMMAND_PREFIX: COMMAND_PREFIX,
    CMD: MSG_TYPE_CMD,
    MSG: MSG_TYPE_MSG,
    INVALID: MSG_TYPE_INVALID,
    LOG_ENABLED: LOG_ENABLED
}