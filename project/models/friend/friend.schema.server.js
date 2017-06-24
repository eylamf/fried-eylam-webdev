/**
 * Created by eylamfried on 6/24/17.
 */

var mongoose = require('mongoose');

var friendSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    favCity: String,
    businesses: [{type: String, ref: 'BusinessModel'}]
});

module.exports = friendSchema;