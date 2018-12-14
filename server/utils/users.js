const _ = require('lodash');

class Users {
    constructor () {
        this.users = [];
    };
    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        };
        this.users.push(user);
        return user;
    };
    removeUser(id) {
        return _.remove(this.users, (user) => {
            return user.id === id;
        })[0];
    };
    getUser(id) {
        return _.filter(this.users, (user) => {
            return user.id === id;
        })[0];
    };
    getUserList(room) {
        var userNames = [];
        _.filter(this.users, (user) => {
            return user.room === room;
        })
        .forEach((user) => {
            userNames.push(user.name);
        });
        return userNames;
    };
};

module.exports = {
    Users
};

