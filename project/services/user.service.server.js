/**
 * Created by eylamfried on 6/16/17.
 */

module.exports = function(app) {

    var userModel = require('../models/user/user.model.server');
    var passport = require('passport');

    // Local strategy
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // facebook login

    app.get('/api/project/user', findUserByCredentials);
    app.get('/api/project/user/:userId', findUserById);
    app.get('/api/project/user', findUserByUsername);

    app.post('/api/project/user/:userId', addBusiness);
    app.post('/api/project/user', createUser);
    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', deleteUser);

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.get('/api/project/checkLoggedIn', checkLoggedIn);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    // local strategy
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
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

    function checkLoggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                req.login(user, function (status) {
                    res.json(user);
                }, function (err) {
                    res.send(err);
                });
            });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    //////////////////////

    function addBusiness(req, res) {
        var userId = req.params.userId;
        var businessId = req.body;
        console.log('body ' + businessId);

        userModel
            .addBusiness(userId, businessId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.send(err);
            });
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

    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];

        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.send(err);
            });

    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['userId'];

        userModel
            .updateUser(userId, user)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.send(err);
            });

    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            });

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
    }

    // find a user by id
    function findUserById(req, res) {
        var userId = req.params['userId'];

        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });

    }

    //////////////////

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

};
