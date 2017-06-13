/**
 * Created by eylamfried on 6/10/17.
 */

var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

const websiteModel = require('../website/website.model.server');

const widgetSchema = require('../widget/widget.schema.server');
const widgetModel = mongoose.model('WidgetModel', widgetSchema);

module.exports = pageModel;

pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.findPageByWebsiteId = findPageByWebsiteId;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

pageModel.deleteWidget = deleteWidget;
pageModel.addWidget = addWidget;

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (response) {
            response.widgets.push(widgetId);
            response.save();
            return widgetModel.findById(widgetId);
        })
}

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function deletePage(pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (response) {
            return websiteModel
                .deletePage(websiteId, pageId);
        });
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {
        $set : {
            name: newPage.name,
            title: newPage.title,
            description: newPage.description
        }
    });
}

function findPageByWebsiteId(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (response) {
            return websiteModel
                .addPage(websiteId, response._id);
        });
}
