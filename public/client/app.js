//Module config
const packagesController = "packagesController";
const baseUrl = "http://localhost:3000/api";


let app = angular.module("app", ["ngRoute"]);

//Router config
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "components/packages/packages.html",
            controller: packagesController
        })
        .when("/warehouse", {
            templateUrl: "components/warehouse/warehouse.html",
            controller: packagesController
        });

});

//Controllers config
app.controller(packagesController, function ($scope, $http) {
    //variables
    $scope.packages = [];
    $scope.isLoading = true;

    //functions
    $scope.registerPackage = function (package) {
        const { name } = package;
        if (name === '') return;

        $http({
            method: 'POST',
            url: `${baseUrl}/packages`,
            data: {
                name
            }
        }).then(function success(response) {
            package.name = "";
            $scope.isLoading = false;
            $scope.packages = [...$scope.packages, response.data.package];//To prevent call the backend to update the package list
        }, function error(response) {
            console.log("Error: app.controller", response);
            $scope.isLoading = false;
        });
    };

    $scope.deletePackage = function (packageId) {
        $http({
            method: 'DELETE',
            url: `${baseUrl}/packages/${packageId}`
        }).then(function success(_) {
            $scope.isLoading = false;
            $scope.packages = $scope.packages.filter(({ id }) => id !== packageId);//To prevent call the backend to update the package list
        }, function error(response) {
            console.log("Error: app.controller", response);
            $scope.isLoading = false;
        });
    };


    //executions
    $http({
        method: 'GET',
        url: `${baseUrl}/packages`
    }).then(function success(response) {
        $scope.packages = response.data.packages;
        $scope.isLoading = false;

    }, function error(response) {
        console.log("Error: app.controller", response);
        $scope.packages = [];
        $scope.isLoading = false;
    });
});

