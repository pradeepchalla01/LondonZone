(function() {
    'use strict';
    
   angular
        .module('londonZones.admin',[])
        .controller('adminController', adminController);

	function adminController($scope, QueryService, $timeout, trainDetails, zoneList, stationTypes, CONSTANTS){
        $scope.totalZoneDetails = trainDetails;
        $scope.zoneDetails = $scope.totalZoneDetails;
        $scope.zoneList = zoneList;
        $scope.stationTypes = stationTypes;
        $scope.displayviewDetails = true;
        $scope.showEdit = false;
        $scope.errors = {};
        $scope.showAdmin = false;
        $scope.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.selectedLetter = 'A';

        angular.element(function(){
            var password = prompt("Enter Password : ", "Please Enter Admin Password");
            if(password === CONSTANTS.AdminPassword){
                $scope.showAdmin = true;
            }
        })

        $scope.getZoneDetails = function(letter){
            $scope.curPage = 0;
            $scope.zoneDetails = [];
            $scope.displayviewDetails = true;
            $scope.stationDeactivated = false;
            $scope.selectedLetter = letter;
            angular.forEach($scope.totalZoneDetails, function(zone) {
                if(zone.name.startsWith(letter)){
                    $scope.zoneDetails.push(zone);
                }
            });
        };

        $scope.getZoneDetails($scope.selectedLetter);

        $scope.dispalyDetails = function(details){
            $scope.displayZone = details;
            $scope.displayviewDetails = false;
        };

        $scope.diactivateZone = function(details, index){
            QueryService.query('POST', 'deleteStation', null, details.id).then(function(result){
                $scope.zoneDetails.splice(index, 1);
                $scope.stationDeactivated = true;
            });
            $timeout(function(){
                $scope.stationDeactivated = false
            }, 1500);
        };

        $scope.showAllZones = function(){
            $scope.displayviewDetails = true;
        };

        $scope.editDetails = function(type, details){
            if(type === 'station'){
                if(details){
                    var stationDetails = angular.copy(details);
                    angular.forEach($scope.zoneList, function(zone){
                        if(zone.name == stationDetails.zone){
                            stationDetails.zone = zone;
                        }
                    });
                    angular.forEach($scope.stationTypes, function(stationType){
                        if(stationType.name == stationDetails.stationType){
                            stationDetails.stationType = stationType;
                        }
                    });
                    $scope.stationDetails = stationDetails;
                } else {
                    $scope.stationDetails = {
                        'zone': $scope.zoneList[0],
                        'stationType': $scope.stationTypes[0]
                    };
                }
            } else {
                $scope.stationDetails = details;
            }            
            $scope.displayviewDetails = true;    
            $scope.showEdit = true;
        };

        $scope.saveStationDetails = function(station, type){
            $scope.errors.stationDetails = {};
            if(!station){
                $scope.stationDetails = {};
            }
            if(type === 'station'){
                $scope.requiredFiels = ['name', 'zone', 'address', 'postCode', 'stationType', 'longitude', 'latitude'];
            }else if(type === 'zones' || type === 'stationTypes'){
                $scope.requiredFiels = ['name', 'description'];
            }
            angular.forEach($scope.requiredFiels, function(attr){
                if($scope.stationDetails && !$scope.stationDetails[attr]){
                    $scope.errors.stationDetails[attr] = 'This field is required';
                }
            });
            if(angular.equals({}, $scope.errors.stationDetails)){
                if(type === 'station'){
                    console.log(type);
                    console.log(station);
                    //$scope.zoneDetails[$scope.statonIndex] = station;
                }else if(type === 'zones'){
                    console.log(type);
                    console.log(station);
                }else if(type === 'stationTypes'){
                    console.log(type);
                    console.log(station);
                }
                $scope.zoneDetails.push(station);
                $scope.showEdit = false;
            }
        };

        $scope.cancelEdit = function(){
            $scope.showEdit = false;
            $scope.errors = {};
        };

        $scope.hideErrorMsg = function (id, key) {
            if($scope.errors[key] && $scope.errors[key][id]) {
                $scope.errors[key][id] = false;
            }
        };
    }
 })();
