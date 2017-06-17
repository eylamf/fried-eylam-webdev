/**
 * Created by eylamfried on 6/16/17.
 */

/**
 * Created by eylamfried on 6/2/17.
 */

// hw 5
var userModel = require('../models/user/user.model.server');

// start listening for types of queries (creating users, etc...)

module.exports = function(app) {
    app.get('/api/project/user', findUserByCredentials);
    app.get('/api/project/user/:userId', findUserById);
    app.get('/api/project/user', findUserByUsername);
    app.post('/api/project/user/:userId', addBusiness);
    app.post('/api/project/user', createUser);
    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', deleteUser);


    function addBusiness(req, res) {
        var userId = req.params.userId;
        var business = req.body;

        userModel
            .addBusiness(userId, business)
            .then(function (status) {
                res.sendStatus(200);
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
                res.json(status);
            });

    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['userId'];

        userModel
            .updateUser(userId, user)
            .then(function (status) {
                res.json(status);
            })

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

};
