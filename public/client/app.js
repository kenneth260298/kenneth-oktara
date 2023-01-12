//Module config
const packagesController = "packagesController";
const warehouseController = "warehouseController";
const baseUrl = "http://localhost:3000/api";


let app = angular.module("app", ["ngRoute", "ngMap"]);

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
    $scope.selectedLat = undefined;
    $scope.selectedLon = undefined;
    $scope.selectedName = undefined;


    $scope.logData = function (event, angularObj) {
        alert(calcCrow(9.899301561654815, -83.66851167133908, 9.893117686320961, -83.65785795269421).toFixed(1));
    }
    $scope.setSelectedLocation = function (location) {
        $scope.selectedLat = location.lat;
        $scope.selectedLon = location.lon;
        $scope.selectedName = location.name;
    }
    $scope.clearSelectedLocation = function () {
        $scope.selectedLat = undefined;
        $scope.selectedLon = undefined;
        $scope.selectedName = undefined;
    }
    //see https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }


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

