/**
 * server side app.js
 */

module.exports = function(app) {
    // temp todods list
    /*var todos = [
        {title: 'todo 1', details: 'details 1'},
        {title: 'todo 2', details: 'details 2'},
        {title: 'todo 3', details: 'details 3'}
    ];*/
    var todos = [];
    // send the todos list
    app.get('/api/todo', function(req, res) {
        res.json(todos);
    });
    // add a to-do item
    app.get('/api/todo/:index', function(req, res) {
        var index = req.params['index'];
        res.json(todos[index]);
    });
    // delete a to-do item from the list of todos
    app.delete('/api/todo/:index', function (req, res) {
        todos.splice(req.params['index'], 1);
        // send back the remaining todos
        res.json(todos);
    });
    // edit the to-do item in the list
    app.get('/api/todo/:index', function (req, res) {
        var index = req.params['index'];
        res.json(todos[index]);
    });


};


