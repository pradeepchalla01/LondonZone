(function() {
    'use strict';
    
   angular
        .module('londonZones.home',[])
        .controller('homeController', homeController)
        .filter('pagination', pagination);

	function homeController($scope, QueryService){
        $scope.displayviewDetails = true;
        $scope.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // pagination
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.zoneDetails = [];
        QueryService.query('GET', 'components/services/data/data.json').then(function(trainDetails){
        //QueryService.query('GET', 'trainDetails').then(function(trainDetails){
            $scope.totalZoneDetails = trainDetails.data;
            $scope.zoneDetails = $scope.totalZoneDetails;
        });
        $scope.numberOfPages = function(){
            return Math.ceil($scope.zoneDetails.length / $scope.pageSize);
        };
        
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

        $scope.showAllZones = function(){
            $scope.displayviewDetails = true;
        };
    }

    function pagination(){
        return function(input, start){
            start = +start;
            return input.slice(start);
        };
    };
 })();
