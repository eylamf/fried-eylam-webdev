/**
 * Created by eylamfried on 6/24/17.
 */

module.exports = function (app) {

    var businessModel = require('../models/business/business.model.server');
    var userModel = require('../models/user/user.model.server');

    app.post('/api/project/user/:userId/business', createBusiness);
    app.post('/api/project/business/:businessId', createComment);
    app.get('/api/project/user/:userId/business', findAllBusinessesForUser);

    function createComment(req, res) {
        var businessId = req.params.businessId;
        var comment = req.body;
        businessModel
            .createComment(businessId, comment)
            .then(function (comment) {
                res.json(comment);
            }, function (err) {
                res.send(err);
            });
    }

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

                if (!businessExists) {
                    console.log('here business');
                }

                if (businessExists && userHasBus && busHasUser) {
                    // remove
                    res.send(err);
                }
                res.send(err);
            });


    }

};