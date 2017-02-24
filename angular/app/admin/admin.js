(function() {
    'use strict';
    
   angular
        .module('londonZones.admin',[])
        .controller('adminController', adminController);

	function adminController($scope, QueryService){
        $scope.displayviewDetails = true;
        $scope.showEdit = false;
        $scope.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.zoneDetails = [];

        $scope.action = "Action";
        QueryService.query('GET', 'components/services/data/data.json').then(function(trainDetails){
        //QueryService.query('GET', 'trainDetails').then(function(trainDetails){
            $scope.totalZoneDetails = trainDetails.data;
            $scope.zoneDetails = $scope.totalZoneDetails;
             
         });
         
        $scope.getZoneDetails = function(letter){
            $scope.curPage = 0;
            $scope.zoneDetails = [];
            $scope.displayviewDetails = true;
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

        $scope.diactivateZone = function(details){
            console.log(details);
            $scope.action =  "Deactivate";
            
            QueryService.query('GET', 'components/services/data/data.json').then(function(trainDetails){
                $scope.totalZoneDetails = trainDetails.data;
                $scope.zoneDetails = $scope.totalZoneDetails;
                 
             });
        };

        $scope.showAllZones = function(){
            $scope.displayviewDetails = true;
        };
   

            $scope.editDetails = function(details, index){
            $scope.showEdit = true;
            $scope.statonIndex = index;
            $scope.stationDetails = angular.copy(details);
        }

        $scope.saveStationDetails = function(station){
            console.log(station);
            $scope.showEdit = false;
            $scope.zoneDetails[$scope.statonIndex] = station;
        }

        $scope.cancelEdit = function(){
            $scope.showEdit = false;
        }
    }
 })();
