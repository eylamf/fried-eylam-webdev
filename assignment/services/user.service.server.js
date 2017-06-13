/**
 * Created by eylamfried on 6/2/17.
 */

// hw 5
var userModel = require('../models/user/user.model.server');

// start listening for types of queries (creating users, etc...)

module.exports = function(app) {
    app.get('/api/assignment/user', findUserByCredentials);
    app.get('/api/assignment/user/:userId', findUserById);
    app.get('/api/assignment/user', findUserByUsername);
    app.post('/api/assignment/user', createUser);
    app.put('/api/assignment/user/:userId', updateUser);
    app.delete('/api/assignment/user/:userId', deleteUser);


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function findUserByUsername(req, res) {

        var username = req.query['username'];

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if  (user !== null) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });

        // for (var u in users) {
        //     var user = users[u];
        //     if (user.username === username) {
        //         res.json(user);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];

        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.json(status);
            });

        // hw4 implementation

        /*
        var user = users.find(function (user) {
           return user._id === userId;
        });
        var index = users.indexOf(user);
        users.splice(index, 1);
        res.sendStatus(200);
        */

    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['userId'];

        userModel
            .updateUser(userId, user)
            .then(function (status) {
                res.json(status);
            })
        /*
        for (var u in users) {
            if (userId === users[u]._id) {
                users[u] = user;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        */
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            });
        // user._id = new Date().getTime() + "";
        // users.push(user);
        // res.send(user);
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user !== null) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });

        // for (var u in users) {
        //     var user = users[u];
        //     if (user.username === username && user.password === password) {
        //         res.json(user);
        //         return;
        //     }
        // }
        // // couldn't find the user
        // res.sendStatus(404);
    }

    // find a user by id
    function findUserById(req, res) {
        var userId = req.params['userId'];

        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });

        /*var user = users.find(function (user) {
            return user._id === userId;
        });
        res.send(user);*/
    }

};
