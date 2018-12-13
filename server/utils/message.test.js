const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage tests', () => {

    it('should generate a valid message', () => {
        var message = generateMessage('user', 'message');
        expect(message).toHaveProperty('from', 'user'); 
        expect(message).toHaveProperty('text', 'message');
        expect(message).toHaveProperty('createdAt');
        expect(message).toHaveProperty('createdDt');
        expect(typeof message.createdDt).toBe('number');
        expect(typeof message.createdAt).toBe('string');
    });

});

describe('generateLocationMessage', () => {
    it('should generate a valid location message', () => {
        var from = 'User';
        var lat = 32.8979114
        var lon = -97.1901243
        var message = generateLocationMessage(from, lat, lon);
        expect(message).toHaveProperty('from', from); 
        expect(message).toHaveProperty('url', `https://www.google.com/maps?q=${lat},${lon}`);
        expect(message).toHaveProperty('createdAt');
        expect(message).toHaveProperty('createdDt');
        expect(typeof message.createdDt).toBe('number');
        expect(typeof message.createdAt).toBe('string');    
    });
});
