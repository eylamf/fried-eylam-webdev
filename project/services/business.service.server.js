/**
 * Created by eylamfried on 6/24/17.
 */

module.exports = function (app) {

    var businessModel = require('../models/business/business.model.server');
    var userModel = require('../models/user/user.model.server');

    app.post('/api/project/user/:userId/business', createBusiness);
    app.get('/api/project/user/:userId/business', findAllBusinessesForUser);


    function findAllBusinessesForUser(req, res) {
        var userId = req.params.userId;
        businessModel
            .findAllBusinessesForUser(userId)
            .then(function (businesses) {
                res.json(businesses);
            }, function (err) {
                res.send(err);
            });
    }

    function createBusiness(req, res) {
        var userId = req.user._id;
        var business = req.body;

        businessModel
            .createBusiness(userId, business)
            .then(function (business) {
                res.json(business);
            }, function (err) {
                userModel
                    .addBusiness(userId, business._id)
                    .then(function (status) {
                        res.sendStatus(200);
                    }, function (err) {
                        res.send(err);
                    });

            });
    }

};