var socket = io();
var params = jQuery.deparam(window.location.search);


function scrollToBottom () {
    // selectors
    var messages = jQuery('#messages')
    var newMessage = messages.children('li:last-child');
    // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    };
};
        
socket.on('connect', function() {
    
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log('no error');
        };
    });
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
    scrollToBottom();
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
    scrollToBottom();
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach( function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
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