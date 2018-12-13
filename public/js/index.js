var socket = io();
        
socket.on('connect', function() {
    console.log('Connected to server.');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdDt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        time: formattedTime
    });
    jQuery('#messages').append(html);
    
    // var li = jQuery('<li></li>');
    // var formattedTime = moment(message.createdDt).format('h:mm a');
    // li.text(`${message.from}@${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdDt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        time: formattedTime,
        url: message.url
    });
    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from}@${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function (ack) {
        messageTextBox.val('');
    });
    
});

var locButton = jQuery('#send-location');
locButton.on('click', function () {
    if (! navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        });
    }, function () {
        locButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
});