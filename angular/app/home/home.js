(function() {
    'use strict';
    
   angular
        .module('londonZones.home',[])
        .controller('homeController', homeController);

	function homeController($scope, QueryService){
        $scope.displayviewDetails = true;
        $scope.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        
        QueryService.query('GET', 'components/services/data/data.json').then(function(trainDetails){
        //QueryService.query('GET', 'trainDetails').then(function(trainDetails){
            $scope.totalZoneDetails = trainDetails.data;
            $scope.zoneDetails = $scope.totalZoneDetails;
        });
        
        $scope.getZoneDetails = function(letter){
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

        $scope.showAllZones = function(){
            $scope.displayviewDetails = true;
        };
    }  
 })();
