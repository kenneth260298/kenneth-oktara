//Module config
const packagesController = "packagesController";
const warehouseController = "warehouseController";
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
            controller: warehouseController
        });

});

//Controllers config
app.controller(packagesController, function ($scope, $http) {
    //variables
    $scope.packages = [];
    $scope.locations = [];
    $scope.isLoading = true;

    //functions
    $scope.registerPackage = function (package) {
        const { name, location } = package;
        if (name == '' || !location) return;

        $http({
            method: 'POST',
            url: `${baseUrl}/packages`,
            data: {
                name,
                location
            }
        }).then(function success(response) {
            package.name = "";
            $scope.isLoading = false;
            $scope.packages = [...$scope.packages, response.data.package];//To prevent call the backend to update the package list
            loadLocations();
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
            loadLocations();
        }, function error(response) {
            console.log("Error: app.controller", response);
            $scope.isLoading = false;
        });
    };

    //executions
    const loadPackages = () => ($http({
        method: 'GET',
        url: `${baseUrl}/packages`
    }).then(function success(response) {
        $scope.packages = response.data.packages;
        $scope.isLoading = false;

    }, function error(response) {
        console.log("Error: app.controller", response);
        $scope.packages = [];
        $scope.isLoading = false;
    }));

    const loadLocations = () => ($http({
        method: 'GET',
        url: `${baseUrl}/locations`
    }).then(function success(response) {
        $scope.locations = response.data.locations;
        $scope.isLoading = false;

    }, function error(response) {
        console.log("Error: app.controller", response);
        $scope.locations = [];
        $scope.isLoading = false;
    }));

    loadPackages();
    loadLocations();
});

app.controller(warehouseController, function ($scope, $http) {
    //variables
    $scope.allLocations = [];
    $scope.isLoading = true;


    //executions
    $http({
        method: 'GET',
        url: `${baseUrl}/locations/all`
    }).then(function success(response) {
        $scope.allLocations = response.data.locations;
        $scope.isLoading = false;

    }, function error(response) {
        console.log("Error: app.controller", response);
        $scope.allLocations = [];
        $scope.isLoading = false;
    });
});

