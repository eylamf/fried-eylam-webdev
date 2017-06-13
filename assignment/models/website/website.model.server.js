/**
 * Created by eylamfried on 6/10/17.
 */

var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

const userModel = require('../user/user.model.server');

module.exports = websiteModel;

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;
websiteModel.findAllWebsites = findAllWebsites;

function findAllWebsites() {
    return websiteModel.find();
}

function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            const index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {
        // choose what the user can update
        $set : {
            name: newWebsite.name,
            description: newWebsite.description
        }
    });
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(userId, websiteId);
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        // must use exec if you have chained functions
        .exec();
}

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel.create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website);
        });
}