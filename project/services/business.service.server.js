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
                business._id = business.id;
                var businessExists = businessModel.findBusinessById(business._id);
                var userHasBus = userModel.findBusinessById(userId, business._id).data;
                var busHasUser = businessModel.findUserById(userId, business).data;
                console.log('bus exists: ' + businessExists);
                console.log('user has bus: ' + userHasBus);
                console.log('bus has user: ' + busHasUser);

                if (businessExists && !userHasBus && !busHasUser) {
                    userModel
                        .addBusiness(userId, business);
                    businessModel
                        .addUser(userId, business);
                    res.send(err);
                }

                if (businessExists && userHasBus && busHasUser) {
                    // remove
                    res.send(err);
                }
                res.send(err);
            });
    }

};