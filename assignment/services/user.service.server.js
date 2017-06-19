/**
 * Created by eylamfried on 6/2/17.
 */



module.exports = function(app) {
    // hw 5
    var userModel = require('../models/user/user.model.server');

    // hw 6
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // use isAdmin to intercept the req to check if user is admin role
    app.get('/api/assignment/user', isAdmin, findAllUsers);
    app.get('/api/assignment/user/:userId', findUserById);
    app.get('/api/assignment/user', findUserByUsername);
    app.post('/api/assignment/user', createUser);
    app.put('/api/assignment/user/:userId', updateUser);
    app.delete('/api/assignment/user/:userId', deleteUser);

    // hw 6 new way of logging in
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/checkAdmin', checkAdmin);
    app.get('/api/assignment/checkLoggedIn', checkLoggedIn);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                req.login(user, function (status) {
                    res.json(user);
                });
            });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function checkAdmin(req, res) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function checkLoggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            // doesn't exist - 0
            res.send('0');
        }
    }

    // new login func - hw 6
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

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

    function findAllUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            return findUserByCredentials(req, res);
        }

        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
            next();
        } else {
            res.sendStatus(401);
        }
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

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }
};
