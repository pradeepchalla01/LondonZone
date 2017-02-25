(function() {
    'use strict';
    
   angular
        .module('londonZones.admin',[])
        .controller('adminController', adminController);

	function adminController($scope, QueryService, $timeout, trainDetails, zoneList, stationTypes){
        $scope.totalZoneDetails = trainDetails;
        $scope.zoneDetails = $scope.totalZoneDetails;
        $scope.zoneList = zoneList;
        $scope.stationTypes = stationTypes;
        $scope.displayviewDetails = true;
        $scope.showEdit = false;
        $scope.errors = {};
        $scope.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        //$scope.zoneDetails = [];
        $scope.requiredFiels = ['name', 'zone', 'address', 'postCode', 'stationType', 'longitude', 'latitude'];
        /*QueryService.query('GET', 'components/services/data/data.json').then(function(trainDetails){
        QueryService.query('GET', 'trainDetails').then(function(trainDetails){
            $scope.totalZoneDetails = trainDetails.data;
            $scope.zoneDetails = $scope.totalZoneDetails;
         });*/
         
        $scope.getZoneDetails = function(letter){
            $scope.curPage = 0;
            $scope.zoneDetails = [];
            $scope.displayviewDetails = true;
            $scope.stationDeactivated = false;
            angular.forEach($scope.totalZoneDetails, function(zone) {
                if(zone.name.startsWith(letter)){
                    $scope.zoneDetails.push(zone);
                }
            });
        };

        $scope.dispalyDetails = function(details){
            $scope.displayZone = details;
            $scope.displayviewDetails = false;
        };

        $scope.diactivateZone = function(details, index){
            QueryService.query('POST', 'deleteStation', {id: details.zone}).then(function(result){
                console.log("delete station");
            });
            $scope.zoneDetails.splice(index, 1);
            $scope.stationDeactivated = true;
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
        }

        $scope.saveStationDetails = function(station){
            $scope.errors.stationDetails = {};
            if(!station){
                $scope.stationDetails = {};
            }
            angular.forEach($scope.requiredFiels, function(attr){
                if(!$scope.stationDetails[attr]){
                    $scope.errors.stationDetails[attr] = 'This field is required';
                }
            });
            if(angular.equals({}, $scope.errors.stationDetails)){
                $scope.showEdit = false;
                if(station){
                    //$scope.zoneDetails[$scope.statonIndex] = station;
                }else{
                    $scope.zoneDetails.push(station);
                }
            }
        }

        $scope.cancelEdit = function(){
            $scope.showEdit = false;
            $scope.errors = {};
        }

        $scope.hideErrorMsg = function (id, key) {
            if($scope.errors[key] && $scope.errors[key][id]) {
                $scope.errors[key][id] = false;
            }
        }
    }
 })();
