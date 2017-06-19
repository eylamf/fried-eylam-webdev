/**
 * Created by eylamfried on 6/16/17.
 */

/**
 * Created by eylamfried on 6/9/17.
 */


var mongoose = require('mongoose');
var businessSchema = require('./business.schema.server');
var businessModel = mongoose.model('BusinessModel', userSchema);

module.exports = businessModel;




