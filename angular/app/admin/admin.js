(function () {
    'use strict';

    angular
        .module('londonZones.admin', [])
        .controller('adminController', adminController);

    function adminController($scope, QueryService, $timeout, trainDetails, zoneList, stationTypes, CONSTANTS, $http) {
        $scope.totalZoneDetails = trainDetails;
        $scope.zoneDetails = $scope.totalZoneDetails;
        $scope.zoneList = zoneList;
        $scope.stationTypes = stationTypes;
        $scope.showEdit = false;
        $scope.displayViewDetails = true;
        $scope.errors = {};
        $scope.searchPostCode = {postCode: null};
        $scope.showAdmin = false;
        $scope.showMap = false;
        $scope.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.selectedLetter = 'A';
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.pagination = true;
        angular.element(function () {
            var password = prompt("Enter Password : ", "Please Enter Admin Password");
            if (password === CONSTANTS.AdminPassword) {
                $scope.showAdmin = true;
            }
        });

        $scope.getZoneDetails = function (letter) {
            $scope.curPage = 0;
            $scope.zoneDetails = [];
            $scope.displayViewDetails = true;
            $scope.stationDeactivated = false;
            $scope.displaySearchStation = false;
            $scope.viewMap = false;
            $scope.selectedLetter = letter;
            angular.forEach($scope.totalZoneDetails, function (zone) {
                if (zone.name.startsWith(letter)) {
                    $scope.zoneDetails.push(zone);
                }
            });
        };

        $scope.findZone = function (postCode) {
        	if(postCode){
        		$scope.selectedLetter = '';
        		$scope.matchedStations = [];
        		angular.forEach($scope.totalZoneDetails, function(value){
        			var required = ['name', 'postCode'];
        			angular.forEach(required, function(key){
        				if(value && value[key] && value[key].toLowerCase().match(postCode.toLowerCase())){
        					$scope.matchedStations.push(value);
        				}
        			});
        		});
        		if($scope.matchedStations.length && $scope.matchedStations.length === 1){
            		$scope.displayViewDetails = false;
            		$scope.displaySearchStation = false;
            		$scope.displayZone = $scope.matchedStations[0];
        			$timeout(function(){
        				var uluru = {lat: $scope.displayZone.latitude, lng: $scope.displayZone.longitude};
        				var map = new google.maps.Map(document.getElementById('map'), {
        					zoom: 15,
        					center: uluru
        				});
        				var marker = new google.maps.Marker({
        					position: uluru,
        					map: map
        				});
        			}, 100);
        			$scope.searchPostCode.postCode = '';
        		}else if($scope.matchedStations.length > 1){
        			$scope.searchPostCode.postCode = '';
        			$scope.displaySearchStation = true;
        		}else{
        			/***
        			 * API to check whether the entered values is valid postcode or not
        			 * If it is a valid postcode will return status with 200 and data in result
        			 * Otherwise we will get an exception 
        			 * */
        			$scope.searchPostCode.postCode = ($scope.searchPostCode.postCode).replace(/\s/g,'');
        			$http.get('http://api.postcodes.io/postcodes/' + $scope.searchPostCode.postCode).then(function (result) {
        				$scope.searchPostCode.postCode = '';
        				if(result.data.status ===  200){
        					$scope.displayMap = result.data.result;
        					$scope.viewMap = true;
        					$scope.displaySearchStation = true;
        					$scope.displayViewDetails = true;
        					$scope.displayZone = null;
        					$timeout(function(){            	
        						var uluru = {lat: $scope.displayMap.latitude, lng: $scope.displayMap.longitude};
        						var map = new google.maps.Map(document.getElementById('googleMap'), {
        							zoom: 15,
        							center: uluru
        						});
        						var marker = new google.maps.Marker({
        							position: uluru,
        							map: map
        						});
        					}, 1000);
        				}
        			}, function (error) {
        				$scope.displaySearchStation = true;
        				$scope.searchPostCode.postCode = '';
        			});
        		}
        	}
        };

        $scope.getZoneDetails($scope.selectedLetter);

        $scope.dispalyDetails = function (details) {
            $scope.displayZone = details;
            $scope.displayViewDetails = false;
            $scope.displaySearchStation = false;
            $timeout(function(){            	
            	initMap($scope.displayZone);
            }, 100);
        };
        function initMap(displayZone) {
            var uluru = {lat: displayZone.latitude, lng: displayZone.longitude};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }

        $scope.stationTab = function(){
            $scope.showEdit = false;
            $scope.displayViewDetails = true;
        }

        $scope.zoneTab = function(){
            $scope.displayViewDetails = true;
            $scope.showEdit = false;
        }

        $scope.stationTypesTab = function(){
            $scope.displayViewDetails = true;
            $scope.showEdit = false;
        }

        $scope.viewStationList = function(){
        	$scope.getZoneDetails('A');
            $scope.displayViewDetails = true;
            $scope.displaySearchStation = false;
            $scope.viewMap = false;
            $scope.showEdit = false;
        }

        $scope.diactivateZone = function (details, index) {
            QueryService.query('POST', 'deleteStation', null, details.id).then(function (result) {
                $scope.zoneDetails.splice(index, 1);
                $scope.stationDeactivated = true;
            });
            $timeout(function () {
                $scope.stationDeactivated = false
            }, 1500);
        };

        $scope.showAllZones = function () {
            $scope.displayViewDetails = true;
            $scope.showEdit = false;
            $scope.showMap = false;
            $scope.displayZone = {};
        };

        $scope.editDetails = function (type, details) {
            if (type === 'station') {
                $scope.showEdit = true;
                if (details) {
                    $scope.addStation = false;
                    var stationDetails = angular.copy(details);
                    angular.forEach($scope.zoneList, function (zone) {
                        if (zone.name == stationDetails.zone) {
                            stationDetails.zone = zone;
                        }
                    });
                    angular.forEach($scope.stationTypes, function (stationType) {
                        if (stationType.name == stationDetails.stationType) {
                            stationDetails.stationType = stationType;
                        }
                    });
                    $scope.stationDetails = stationDetails;
                } else {
                    $scope.addStation = true;
                    $scope.stationDetails = {
                        'zone': $scope.zoneList[0],
                        'stationType': $scope.stationTypes[0]
                    };
                }
            }else if(type === 'zone'){
                $scope.showEdit = true;
                $scope.stationDetails = details;
            }else if(type === 'stationType'){
                $scope.showEdit = true;
                $scope.stationDetails = details;
            }
        };

        $scope.saveStationDetails = function (station, type) {
            $scope.errors.stationDetails = {};
            $scope.stationDetails = angular.copy(station);
            if (type === 'station') {
                $scope.requiredFiels = ['name', 'zone', 'address', 'postCode', 'stationType', 'longitude', 'latitude'];
            } else if (type === 'zone' || type === 'stationType') {
                $scope.requiredFiels = ['name', 'description'];
            }
            angular.forEach($scope.requiredFiels, function (attr) {
                if ($scope.stationDetails && !$scope.stationDetails[attr]) {
                    $scope.errors.stationDetails[attr] = 'This field is required';
                } else if (!$scope.stationDetails) {
                    $scope.errors.stationDetails[attr] = 'This field is required';
                }
            });
            if (angular.equals({}, $scope.errors.stationDetails)) {
                if (type === 'station') {
                    $scope.showEdit = false;
                    $scope.stationDetails.stationTypeId = $scope.stationDetails.stationType.id;
                    $scope.stationDetails.zoneId = $scope.stationDetails.zone.id;
                    $scope.stationDetails.latitude = parseFloat($scope.stationDetails.latitude);
                    $scope.stationDetails.longitude = parseFloat($scope.stationDetails.longitude);
                    delete $scope.stationDetails.stationType;
                    delete $scope.stationDetails.zone;
                    QueryService.query('POST', 'saveOrEditStation', null, $scope.stationDetails).then(function (result) {
                        console.log(result);
                        $scope.showEdit = false;
                        if ($scope.addStation) {
                            $scope.addStation = false;
                            $scope.zoneDetails.push(station);
                        }
                    });
                } else if (type === 'zone') {
                    $scope.showEdit = false;
                    QueryService.query('POST', 'saveOrEditZone', null, $scope.stationDetails).then(function (result) {
                        console.log(result);
                    });
                } else if (type === 'stationType') {
                    $scope.showEdit = false;
                    QueryService.query('POST', 'saveOrEditStationType', null, $scope.stationDetails).then(function (result) {
                        console.log(result);
                    });
                }
            }
        };

        $scope.cancelEdit = function (type) {
            $scope.showEdit = false;
            $scope.errors = {};
        };

        $scope.hideErrorMsg = function (id, key) {
            if ($scope.errors[key] && $scope.errors[key][id]) {
                $scope.errors[key][id] = false;
            }
        };

        $scope.numberOfPages = function(){
            return Math.ceil($scope.zoneDetails.length / $scope.pageSize);
        };        

        function pagination(){
            return function(input, start){
                start = +start;
                return input.slice(start);
            };
        };
    }
})();
