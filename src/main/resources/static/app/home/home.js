(function() {
    'use strict';
    
   angular
        .module('londonZones.home',[])
        .controller('homeController', homeController);

	function homeController($scope){
        $scope.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.zoneDetails = [
            {
                'stationName':'Abbey Road',
                'londonZone':'Zone 2/3'
            },{
                'stationName':'Action Central',
                'londonZone':'Zone 3'
            },{
                'stationName':'Action Town',
                'londonZone':'Zone 3'
            },{
                'stationName':'Aldgate',
                'londonZone':'Zone 1'
            }
        ]
    }  
 })();
