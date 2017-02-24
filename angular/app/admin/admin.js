(function() {
    'use strict';
    
   angular
        .module('londonZones.admin',[])
        .controller('adminController', adminController);

	function adminController($scope, QueryService, $timeout){
        $scope.displayviewDetails = true;
        $scope.showEdit = false;
        $scope.errors = {};
        $scope.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.zoneDetails = [];
        $scope.requiredFiels = ['name', 'zone', 'address', 'postCode', 'stationType', 'longitude', 'latitude'];
        //$scope.action = "Action";
        QueryService.query('GET', 'components/services/data/data.json').then(function(trainDetails){
        //QueryService.query('GET', 'trainDetails').then(function(trainDetails){
            $scope.totalZoneDetails = trainDetails.data;
            $scope.zoneDetails = $scope.totalZoneDetails;
             
         });
         
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
            $scope.displayviewDetails = false;
            $scope.displayZone = details;
        };

        $scope.diactivateZone = function(details, index){
            console.log(details);
            //$scope.action =  "Deactivate";
            
            // QueryService.query('POST', 'deleteStation', {id: details.zone}).then(function(result){
            //     console.log("delete station");
            //  });
            $scope.zoneDetails.splice(index, 1);
            $scope.stationDeactivated = true;
            $timeout(function(){
                $scope.stationDeactivated = false
            }, 1500);
        };

        $scope.showAllZones = function(){
            $scope.displayviewDetails = true;
        };
   

        $scope.editDetails = function(details, index){
            $scope.displayviewDetails = true;    
            $scope.showEdit = true;
            $scope.statonIndex = index;
            $scope.stationDetails = angular.copy(details);
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
                    $scope.zoneDetails[$scope.statonIndex] = station;
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
