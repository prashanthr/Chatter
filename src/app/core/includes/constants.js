/* constants.js */
var path = require('path');

const CHATTER = "CHATTER";

const CONNECTION = "connection";
const DISCONNECT = "disconnect";
const DATA = "data";
const ERROR = "error";

const IncludesDir = "includes";
const ClientDir = "web-client";
const ServerDir = "web-server";
const ServerPort = 3000;
const ServerHost = "0.0.0.0";
const ClientRoot = __dirname + "/../../" + ClientDir + '/index.html';
const ClientPath = path.resolve(ClientRoot);

const RoomLobby = "lobby";

const PromptWelcomeMessage = "Welcome to the " + CHATTER + " server";
const PromptLoginName = "What is your login user name?";
const PromptLobby = "You are now in the " + RoomLobby;



const COMMAND_PREFIX = "/";
const MSG_TYPE_CMD = "CMD";
const MSG_TYPE_MSG = "MSG";
const MSG_TYPE_INVALID = "INVALID";

const COMMAND_ROOMS = "/rooms";
const COMMAND_USERS = "/users";
const COMMAND_JOIN = "/join";
const COMMAND_LEAVE = "/leave";
const COMMAND_QUIT = "/quit";
const COMMAND_HELP = "/help";

const LOG_ENABLED = true;

module.exports = {
	CHATTER: CHATTER,
	CONNECTION: CONNECTION,
	DISCONNECT: DISCONNECT,
    DATA: DATA,
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
    LOG_ENABLED: LOG_ENABLED,
    PROMPT_WELCOME: PromptWelcomeMessage,
    PROMPT_LOGIN: PromptLoginName,
    PROMPT_LOBBY: PromptLobby,
    ROOM_LOBBY: RoomLobby,
    COMMANDS: {
        ROOMS: COMMAND_ROOMS,
        USERS: COMMAND_USERS,
        JOIN: COMMAND_JOIN,
        LEAVE: COMMAND_LEAVE,
        QUIT: COMMAND_QUIT,
        HELP: COMMAND_HELP
    }
}