/**
 * Created by eylamfried on 6/10/17.
 */

var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: 'PageModel'},
    type: {type: String, enum: ["HEADING", "IMAGE", "YOUTUBE", "HTML", "INPUT"]},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: {type: Boolean, default: true},
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'widgetmodels'});

module.exports = widgetSchema;