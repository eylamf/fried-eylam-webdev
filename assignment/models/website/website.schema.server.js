/**
 * Created by eylamfried on 6/10/17.
 */
// require mongoose lib for db
var mongoose = require('mongoose');
// create the website schema for objs (properties)
var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    name: {type: String, require: true},
    description: String,
    pages: [{type: mongoose.Schema.ObjectId, ref:"PageModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'websitemodels'});

module.exports = websiteSchema;