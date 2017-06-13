/**
 * Created by eylamfried on 6/3/17.
 */
// hw 5
var pageModel = require('../models/page/page.model.server');

module.exports = function (app) {

    app.post('/api/assignment/user/:userId/website/:websiteId/page', createPage);
    app.get('/api/assignment/user/:userId/website/:websiteId/page', findPageByWebsiteId);
    app.get('/api/assignment/user/:userId/website/:websiteId/page/:pageId', findPageById);
    app.put('/api/assignment/user/:userId/website/:websiteId/page/:pageId', updatePage);
    app.delete('/api/assignment/user/:userId/website/:websiteId/page/:pageId', deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function deletePage(req, res) {
        var pageId = req.params['pageId'];

        pageModel
            .deletePage(pageId)
            .then(function (status) {
                res.sendStatus(200);
            }, function(err) {
                res.send(err);
            });
        // var page = pages.find(function (page) {
        //     return page._id === pageId;
        // });
        // var index = pages.indexOf(page);
        // pages.splice(index, 1);
        // res.sendStatus(200);
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params['pageId'];

        pageModel
            .updatePage(pageId, page)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.send(err);
            });

        // for (var p in pages) {
        //     if (pageId === pages[p]._id) {
        //         pages[p] = page;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];

        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            });

        // var page = pages.find(function (page) {
        //     return page._id === pageId;
        // });
        // res.send(page);
    }

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params['websiteId'];

        pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                res.json(page);
            });

        // page._id = (new Date()).getTime() + "";
        // page.created = new Date();
        // page.updated = new Date();
        // page.websiteId = req.params['websiteId'];
        // pages.push(page);
        // res.send(page);
    }

    function findPageByWebsiteId(req, res) {
        var results = [];
        var websiteId = req.params['websiteId'];

        pageModel
            .findPageByWebsiteId(websiteId)
            .then(function (pages) {
                res.json(pages);
            });

        // for (var p in pages) {
        //     if (pages[p].websiteId === websiteId) {
        //         results.push(pages[p]);
        //     }
        // }
        //
        // res.json(results);
    }

}