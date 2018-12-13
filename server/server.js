const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');
const _ = require('lodash');


const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');
    var ts = new Date().getTime();
    var createdAt = `${moment(ts).format('M/D/YYYY')} at ${moment(ts).format('h:m:sa')}`;

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: `New user connected at ${createdAt}`,
        createdAt: createdAt,
        createdDt: ts
    });

    socket.emit('newMessage', {
        from: 'Admin',
        text: `Welcome to the chat.  You joined at ${createdAt}`,
        createdAt: createdAt,
        createdDt: ts
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('createMessage', (newMessage) => {
        var message = _.pick(newMessage, ['from', 'text']);
        var ts = new Date().getTime();
        message.createdAt = `${moment(ts).format('M/D/YYYY')} at ${moment(ts).format('h:m:sa')}`;
        io.emit('newMessage', message);
    });
});

// startup the server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});