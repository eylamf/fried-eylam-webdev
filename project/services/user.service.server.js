/**
 * Created by eylamfried on 6/16/17.
 */

module.exports = function(app) {

    var userModel = require('../models/user/user.model.server');
    var businessModel = require('../models/business/business.model.server');
    // var friendModel = require('../models/friend/friend.model.server');
    var passport = require('passport');

    // Local strategy
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var FacebookStrategy = require('passport-facebook').Strategy;


    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID, //'
        clientSecret: process.env.FACEBOOK_SECRET,//
        callbackURL: process.env.FACEBOOK_CALLBACK,//
        profileFields: ['emails','id','name','displayName']
    };

    // var facebookConfig = {
    //     clientID: '460484557651369',//process.env.FACEBOOK_CLIENT_ID, //'
    //     clientSecret:'2852203dd0f38204c379ab0295bf06f7', // process.env.FACEBOOK_SECRET,//
    //     callbackURL: 'http://localhost:3000/auth/facebook/callback', // process.env.FACEBOOK_CALLBACK,//
    //     profileFields: ['emails','id','name','displayName']
    // };




    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    app.get('/api/project/user', findUserByUsername);
    app.get('/api/project/user', findUserByCredentials);
    app.get('/api/project/user', isAdmin, findAllUsers);
    app.get('/api/project/user/:userId', findUserById);
    app.post('/api/project/user/:userId', addBusiness);
    app.delete('/api/project/user/:userId/business', removeBusiness);
    app.post('/api/project/user/:userId/friend', addFriend);
    app.delete('/api/project/user/:userId/friend', removeFriend);
    app.get('/api/project/user/:userId/all-friends', findAllFriendsForUser);
    app.post('/api/project/user', createUser);
    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', isAdmin, deleteUser);
    app.delete('/api/project/unregister', unregister);

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.get('/api/project/checkAdmin', checkAdmin);
    app.get('/api/project/checkLoggedIn', checkLoggedIn);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);

    // facebook login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#!/profile',
            failureRedirect: '/project/index.html#!/login'
        }));



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

    function isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    function checkAdmin(req, res) {
        if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
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

    function unregister(req, res) {
        userModel
            .deleteUser(req.user._id)
            .then(function (user) {
                req.logout();
                res.sendStatus(200);
            }, function (err) {
                res.send(err);
            });
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


    function removeFriend(req, res) {
        var userId = req.params.userId;
        var friend = req.body;

        userModel
            .removeFriend(userId, friend)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.send(err);
            });
    }


    function addFriend(req, res) {

        var userId = req.params.userId;

        var friend = req.body;

        userModel
            .addFriend(userId, friend)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.send(err);
            });
    }

    function removeBusiness(req, res) {
        var userId = req.params.userId;
        var businessId = req.body;

        userModel
            .removeBusiness(userId, businessId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.send(err);
            });
    }

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

    function findAllFriendsForUser(req, res) {
        var userId = req.params.userId;
        userModel
            .findAllFriendsForUser(userId)
            .then(function (friends) {
                res.json(friends);
            }, function (err) {
                res.send(err);
            });
    }

    function findUserByUsername(req, res) {

        var username = req.query['username'];

        if (!username) {
            return findAllUsers(req, res);
        }

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user !== null) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.send(err);
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

    function findAllUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            return findUserByCredentials(req, res);
        } else if (username) {
            return findUserByUsername(req, res);
        }

        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (!username && !password) {
            return findAllUsers(req, res);
        }

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
