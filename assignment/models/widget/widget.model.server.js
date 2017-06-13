/**
 * Created by eylamfried on 6/11/17.
 */

var mongoose = require('mongoose');
var widgetScheme = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetScheme);

const pageSchema = require('../page/page.schema.server');
const pageModel = mongoose.model('PageModel', pageSchema);

module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.sortWidgets = sortWidgets;

function sortWidgets(pageId, initial, final) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgets = page._widgets;
            widgets.splice(final, 0, widgets.splice(initial, 1)[0]);
            page._widgets = widgets;
            return pageModel
                .updatePage(pageId, page);
        });


}

function updateWidget(widgetId, widget) {
    return widgetModel
        .update({_id: widgetId}, {
            $set : widget
        });
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function findWidgetsByPageId(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page')
        .exec();
}

function findWidgetById(widgetId) {
    return widgetModel
        .findById(widgetId);
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (response) {
            console.log('here with response: ' + response);
            return pageModel.addWidget(pageId, response._id);
        });

}