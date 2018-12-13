const moment = require('moment');

var generateMessage = (from, text) => {
    var createdDt = new Date().getTime();
    var createdAt = `${moment(createdDt).format('M/D/YYYY')} at ${moment(createdDt).format('h:m:sa')}`;
    return {
        from,
        text,
        createdDt,
        createdAt
    };
};

module.exports = {
    generateMessage
};
