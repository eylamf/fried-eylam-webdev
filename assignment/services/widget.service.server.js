/**
 * Created by eylamfried on 6/3/17.
 */

// hw 5
var widgetModel = require('../models/widget/widget.model.server');

module.exports = function (app) {

    app.post('/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget', createWidget);
    app.get('/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', findWidgetById);
    app.put('/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget', sortWidgets);
    app.put('/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', updateWidget);
    app.delete('/api/assignment/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', deleteWidget);

    var widgets = [

        { "_id": "000", "widgetType": "HEADING", "pageId": "000", "size": 2, "text": ""},
        { "_id": "001", "widgetType": "IMAGE", "pageId": "000", "width": "100%",
            "url": ""},
        { "_id": "002", "widgetType": "YOUTUBE", "pageId": "000", "width": "100%",
            "url": "" },

        { "_id": "003", "widgetType": "HTML", "pageId": "321", "text": ""},
        { "_id": "004", "widgetType": "TEXT", "pageId": "321", "text": ""},

        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Ever since astronomers <a href="http://gizmodo.com/new-earth-like-exoplanet-could-be-discovery-of-the-cent-1785614793#_ga=2.67003244.390029006.1495112369-1520736541.1475842057" rel="nofollow">announced the discovery</a> of an Earth-sized exoplanet <a href="http://gizmodo.com/there-may-be-an-earth-like-exoplanet-less-than-five-lig-1785457935" rel="nofollow">less than five light years</a> down the cosmic street, the question on every good space cadet’s mind has been whether or not we can colonize it. We’re not going to know if <em>Proxima b</em> is habitable <a href="http://gizmodo.com/how-well-get-our-first-big-clue-about-life-on-proxima-b-1785942106" rel="nofollow">until we can point some very powerful telescopes at it</a>, which won’t happen until next year. But until then, scientists are playing around with models—and one such modeling effort recently came to some promising conclusions.</p>'},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];


    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    app.post ("/api/assignment/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer

        var ogNameArray = originalname.split('.');

        var extension = '.' + ogNameArray[ogNameArray.length - 1];

        myFile.originalname += extension;

        var filename      = myFile.filename; // new file name in upload folder
        var path          = myFile.path; // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;



        // function getWidgetById(widgetId) {
        //     var widget =  widgets.find(function (widget) {
        //         return widget._id === widgetId;
        //     });
        //     return widget;
        // }
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        }); //getWidgetById(widgetId);

        widget.url = '/assignment/uploads/' + filename;



        var callbackUrl = '/assignment/index.html#!/user/' + userId +
                                '/website/' + websiteId + '/page/' +
                                    pageId + '/widget/' + widgetId;

        res.redirect(callbackUrl);
    }

    function sortWidgets(req, res) {
        var initial = req.query['initial'];
        var final = req.query['final'];
        var pageId = req.query['pageId'];
        widgetModel
            .sortWidgets(pageId, initial, final)
            .then(function (widgets) {
               res.json(widgets);
            }, function (err) {
                res.send(err);
            });

        // var savedWidgets = [];
        // var len = widgets.length;
        // // iterate down
        // for (var i = len - 1; i >= 0; i--) {
        //     if (widgets[i].pageId === req.params.pageId) {
        //         savedWidgets.unshift(widgets[i]);
        //         widgets.splice(i, 1);
        //     }
        // }
        //
        // var widget = savedWidgets[initial];
        // savedWidgets.splice(initial, 1);
        // savedWidgets.splice(final, 0, widget);
        // widgets = widgets.concat(savedWidgets);
        // res.sendStatus(200);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var pageId = req.params['pageId'];

        widgetModel
            .deleteWidget(pageId, widgetId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.send(err);
            });

        // var widget = widgets.find(function (widget) {
        //     return widget._id === widgetId;
        // });
        // var index = widgets.indexOf(widget);
        // widgets.splice(index, 1);
        // res.sendStatus(200);
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params['widgetId'];

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (status) {
                res.json(status);
            });

        // for (var w in widgets) {
        //     if (widgetId === widgets[w]._id) {
        //         widgets[w] = widget;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function findWidgetsByPageId(req, res) {
        var results = [];
        var pageId = req.params['pageId'];

        widgetModel
            .findWidgetsByPageId(pageId)
            .then(function (widgets) {
                console.log('this is widgets : ' + widgets);
                res.json(widgets);
            }, function (err) {
                res.send(err);
            });

        // for (var w in widgets) {
        //     if (widgets[w].pageId === pageId) {
        //         results.push(widgets[w]);
        //     }
        // }
        // res.json(results);
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params['pageId'];

        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.json(widget);
            });
        // widget._id = new Date().getTime() + "";
        // widget.pageId = pageId;
        // widgets.push(widget);
        // res.send(widget);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            });
        // var widget =  widgets.find(function (widget) {
        //     return widget._id === widgetId;
        // });
        // res.send(widget);
    }



};