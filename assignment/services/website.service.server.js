/**
 * Created by eylamfried on 6/3/17.
 */

// hw 5
var websiteModel = require('../models/website/website.model.server');

module.exports = function (app) {

    app.post('/api/assignment/user/:userId/website', createWebsite);
    app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/assignment/user/:userId/website/:websiteId', findWebsiteById);
    app.put('/api/assignment/user/:userId/website/:websiteId', updateWebsite);
    app.delete('/api/assignment/user/:userId/website/:websiteId', deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var userId = req.params.userId;
        websiteModel
            .deleteWebsite(userId, websiteId)
            .then(function (status) {
                res.json(status);
            });
        // var website = websites.find(function (website) {
        //     return website._id === websiteId;
        // });
        // var index = websites.indexOf(website);
        // websites.splice(index, 1);
        // res.sendStatus(200);
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params['websiteId'];

        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (status) {
                res.json(status);
            });

        // for (var w in websites) {
        //     if (websiteId === websites[w]._id) {
        //         websites[w] = website;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];

        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            });

        // var website = websites.find(function (website) {
        //     return website._id === websiteId;
        // });
        // res.send(website);

    }

    function findAllWebsitesForUser(req, res) {
        // var results = [];
        var userId = req.params['userId'];

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            });

        // for (var w in websites) {
        //     if (websites[w].developerId === userId) {
        //         results.push(websites[w]);
        //     }
        // }
        // res.json(results);
    }

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;

        websiteModel
            .createWebsite(userId, website)
            .then(function (website) {
                res.json(website);
            });

        // website._id = (new Date()).getTime() + "";
        // website.created = new Date();
        // website.updated = new Date();
        // website.developerId = req.params['userId'];
        // websites.push(website);
        // res.send(website);
    }

};