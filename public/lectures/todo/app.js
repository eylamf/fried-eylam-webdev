// set the module
var todoApp = angular.module('todoApp', []);
// set the controller
todoApp.controller('todoController', todoController);

function todoController($scope) {
    // list of todos
    $scope.todos = [];
    $scope.createTodo = createTodo;
    $scope.deleteTodo = deleteTodo;
    $scope.editTodo = editTodo;
    $scope.updateTodo = updateTodo;
    $scope.selectedIndex = -1;
    $scope.todo = {};

    function createTodo(todo) {
        // create a copy of the to-do
        var copy = angular.copy(todo);

        // add the to-do to the list of todos
        $scope.todos.push(copy);
        $scope.todo.title = "";
        $scope.todo.details = "";

        // add a date field to the to-do
        copy.date = (new Date()).getTime();

    };

    function deleteTodo(todo) {
        // get the index of the to-do we want to delete
        var index = $scope.todos.indexOf(todo);
        $scope.todos.splice(index, 1);
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

