// set the module
var todoApp = angular.module('todoApp', []);
// set the controller
todoApp.controller('todoController', todoController);
// scope allows you to interact with the DOM and http with the http
function todoController($scope, $http) {
    // list of todos
    // locally
    // $scope.todos = [];

    $scope.createTodo = createTodo;
    $scope.deleteTodo = deleteTodo;
    $scope.editTodo = editTodo;
    $scope.updateTodo = updateTodo;
    $scope.selectedIndex = -1;
    $scope.todo = {};
    // locally
    // $scope.to-do = {};

    // server
    // connect http to use list
    $http.get('/api/todo')
        .then(function (response) {
            $scope.todos = response.data;
        });
    // create a new to-do item
    function createTodo(todo) {
        // create a copy of the to-do
        var copy = angular.copy(todo);

        // add the to-do to the list of todos
        $scope.todos.push(copy);
        $scope.todo.title = "";
        $scope.todo.details = "";

        // add a date field to the to-do
        copy.date = new Date().getTime();
    };

    function deleteTodo(todo) {
        // get the index of the to-do we want to delete
        var index = $scope.todos.indexOf(todo);
        // locally
        // $scope.todos.splice(index, 1);

        // delete from the server of the todos list
        $http.delete('/api/todo/' + index)
            .then(function (response) {
                $scope.todos = response.data;
            });
    };

    function editTodo(todo) {
        $scope.selectedIndex = $scope.todos.indexOf(todo);
        $scope.todo.title = todo.title;
        $scope.todo.details = todo.details;
    };

    function updateTodo(todo) {
        $scope.todos[$scope.selectedIndex].title = todo.title;
        $scope.todos[$scope.selectedIndex].details = todo.details;
        $scope.todo = {};
    };

};

