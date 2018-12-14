const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString function', () => {

    it('should reject non-string values', () => {
        var b = isRealString(123);
        expect(b).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        var b = isRealString('    ');
        expect(b).toBeFalsy();
    });

    it('should accept string with non-space characters', () => {
        var b = isRealString('  123  ');
        expect(b).toBeTruthy();
    });

});
