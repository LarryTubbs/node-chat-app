var socket = io();
        
socket.on('connect', function() {
    console.log('Connected to server.');
    socket.emit('createMessage', {
        from: 'Larry',
        text: 'Where should we go for dinner?'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
    
    console.log(`${message.from}> ${message.text}`);
    console.log(`Received at: ${message.createdAt}`);
});