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
app.controller(packagesController, function ($scope, $http, $interval) {
    //variables
    $scope.packages = [];
    $scope.locations = [];
    $scope.isLoading = true;
    $scope.pendingPackages = [];
    $scope.progress = 0;
    $scope.isShipping = false;
    $scope.deliveredPackages = 0;

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
            loadPackages();
            loadLocations();
            loadPendingPackages();
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
            loadPackages();
            loadLocations();
            loadPendingPackages();
        }, function error(response) {
            console.log("Error: app.controller", response);
            $scope.isLoading = false;
        });
    };

    const updatePackageAndLocationData = (packageId, locationId) => {
        $http({
            method: 'POST',
            url: `${baseUrl}/packages/updatePackageAndLocation`,
            data: {
                packageId,
                locationId
            }
        }).then(function success(_) {
            $scope.isLoading = false;
        }, function error(response) {
            console.log("Error: app.controller", response);
            $scope.isLoading = false;
        });
    };

    $scope.startShipping = function () {
        $scope.isShipping = true;
        stop = $interval(function () {

            if ($scope.progress < 100) {
                const selectedPackage = $scope.pendingPackages[$scope.deliveredPackages];
                updatePackageAndLocationData(selectedPackage.id, selectedPackage.location.id);
                $scope.progress += 100 / $scope.pendingPackages.length;
                $scope.deliveredPackages++;
            } else {
                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;
                    $scope.isShipping = false;
                    $scope.progress = 0;
                    $scope.deliveredPackages = 0;
                    loadLocations();
                    loadPendingPackages();
                }
            }
            loadPackages();
        }, 2500);
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

    const loadPendingPackages = () => ($http({
        method: 'GET',
        url: `${baseUrl}/packages/pending`
    }).then(function success(response) {
        $scope.pendingPackages = response.data.pendingPackages;
        $scope.isLoading = false;

    }, function error(response) {
        console.log("Error: app.controller", response);
        $scope.pendingPackages = [];
        $scope.isLoading = false;
    }));


    $scope.getPendingPackages = function () {
        loadPendingPackages();
    }

    loadPackages();
    loadLocations();
    loadPendingPackages();
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

