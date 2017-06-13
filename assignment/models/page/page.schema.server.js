/**
 * Created by eylamfried on 6/10/17.
 */

var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    name: {type: String},
    title: {type: String, require: true},
    description: String,
    widgets: [{type: mongoose.Schema.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'pagemodels'});

module.exports = pageSchema;
