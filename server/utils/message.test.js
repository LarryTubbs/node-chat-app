const expect = require('expect');

var {generateMessage} = require('./message');

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
