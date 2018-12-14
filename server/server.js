const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');
var {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');
    var ts = new Date().getTime();
    
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('name and room name are required');
        } else {
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            var msg =  `${params.name} has joined`;
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', msg));
            socket.emit('newMessage', generateMessage('Admin', `Welcome to the ${params.room} chatroom.`));
            callback();
        };
    });

    
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
        };  
    });

    socket.on('createMessage', (newMessage, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(newMessage)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage));
        };
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lon));
        };
    });
});

// startup the server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});