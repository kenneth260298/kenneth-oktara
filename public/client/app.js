//Module config
const mainController = "mainController";

let app = angular.module("app", ["ngRoute"]);

//Router config
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/packages/packages.html",
            controller: mainController
        })
        .when("/warehouse", {
            templateUrl: "components/warehouse/warehouse.html",
            controller: mainController
        });

});

//Controllers config
app.controller(mainController, function ($scope, $http) {

    const url = "http://localhost:3000/api/packages";
    $scope.packages = [];

    $http({
        method: 'GET',
        url
    }).then(function success(response) {
        $scope.packages = response.data.packages;

    }, function error(response) {
        console.log("Error: app.controller", response);
        $scope.packages = [];
    });
});

