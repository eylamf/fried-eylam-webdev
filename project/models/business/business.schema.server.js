/**
 * Created by eylamfried on 6/17/17.
 */

// require mongoose lib for db
var mongoose = require('mongoose');
// create the user schema for objs (prooerties)
var businessSchema = mongoose.Schema({
    body: {type: mongoose.Schema.Types.Object},
    _user: String
}, {collection: 'businessmodels'});

module.exports = businessSchema;