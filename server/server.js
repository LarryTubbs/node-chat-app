const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

var {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');
    var ts = new Date().getTime();
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user connected.'));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat.'));

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('createMessage', (newMessage, callback) => {
        var message = _.pick(newMessage, ['from', 'text']);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lon));
    });
});

// startup the server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});