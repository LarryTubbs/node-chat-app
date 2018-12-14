const expect = require('expect');

var {Users} = require('./users');

describe('Users class', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: 2,
            name: 'Jen',
            room: 'React Course'
        }, {
            id: 3,
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('Users.addUser: should add new user', () => {
        var id = 4;
        var name = 'Larry';
        var room = 'Room A';
        var user = users.addUser(id, name, room);
        expect(users.users.length).toBe(4);
        expect(typeof users).toBe('object');
        expect(user.id).toBe(id);
        expect(user.name).toBe(name);
        expect(user.room).toBe(room);
        expect(users.users[3].id).toBe(id);
        expect(users.users[3].name).toBe(name);
        expect(users.users[3].room).toBe(room);
    });

    it('Users.getUserList: should return an array of user names for Node Course', () => {
        var userNames = users.getUserList('Node Course');
        expect(userNames.length).toBe(2);
        expect(userNames[0]).toBe(users.users[0].name);
        expect(userNames[1]).toBe(users.users[2].name);
    });

    it('Users.getUserList: should return an array of user names', () => {
        var userNames = users.getUserList('Node Course');
        expect(userNames.length).toBe(2);
        expect(userNames[0]).toBe(users.users[0].name);
        expect(userNames[1]).toBe(users.users[2].name);
    });

    it('User.removeUser: should remove a user', () => {
        var user = users.removeUser(2);
        expect(user.id).toBe(2); // id of removed user
        expect(users.users.length).toBe(2); // should be 2 left
    });

    it('Users.removeUsers: should not remove a non existant user', () => {
        var user = users.removeUser(4);
        expect(user).toBeFalsy(); // shouldn't return a user
        expect(users.users.length).toBe(3); // should still contain all 3 users
    });

    it('User.getUser: should find a user', () => {
        var user = users.getUser(2);
        expect(user.id).toBe(2);
        expect(user.name).toBe(users.users[1].name);
        expect(user.room).toBe(users.users[1].room);
    });

    it('User.getUser: should not find a non-existant user', () => {
        var user = users.getUser(4);
        expect(user).toBeFalsy();
    });
});