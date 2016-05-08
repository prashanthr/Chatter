[![Build Status](https://travis-ci.org/prashanthr/Chatter.svg?branch=master)](https://travis-ci.org/prashanthr/Chatter)

# Chatter
A chat server built using Node.js that communicates over TCP

# Installation
1. Install Node.js from [https://nodejs.org/en/](https://nodejs.org/en/)
2. Run the following Command
```JavaScript
cd src/app/tcp-server
node chatter
```
# Supported Features
**/rooms** - Lists all the rooms on the server

**/users** - Lists all the users in the current room

**/join** - Joins a specified chat room

**/leave** - Removes user from the current chat room and returns them to the lobby

**/create** - Creates a new chat room

**/delete** - Deletes a chat room. A user can only delete a chat room created by him/her

**/quit** - Disconnects the user from the chat server

**/msg** - Sends a private message to another user

**/help** - Lists all available commands for interaction with the server

**/info** - Lists useful information for the user (connection, room and server information)

