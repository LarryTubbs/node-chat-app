const moment = require('moment');

var generateMessage = (from, text) => {
    var createdDt = new moment().valueOf();
    var createdAt = `${moment(createdDt).format('M/D/YYYY')} at ${moment(createdDt).format('h:m:sa')}`;
    return {
        from,
        text,
        createdDt,
        createdAt
    };
};

var generateLocationMessage = (from, lat, lon) => {
    var createdDt = new moment().valueOf();
    var createdAt = `${moment(createdDt).format('M/D/YYYY')} at ${moment(createdDt).format('h:m:sa')}`;
    var url = `https://www.google.com/maps?q=${lat},${lon}`;
    return {
        from,
        url,
        createdDt,
        createdAt
    };
};

module.exports = {
    generateMessage,
    generateLocationMessage
};
