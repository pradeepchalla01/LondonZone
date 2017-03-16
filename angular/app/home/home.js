(function() {
    'use strict';
    
   angular
        .module('londonZones.home',[])
        .controller('homeController', homeController)
        .filter('pagination', pagination);

	function homeController($scope, QueryService, $timeout){
        $scope.displayviewDetails = true;
        $scope.showEdit = false;
        $scope.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // pagination
        $scope.curPage = 0;
        $scope.pageSize = 10;
        $scope.zoneDetails = [];
        $scope.selectedLetter = 'A';
        $scope.pagination = true;
        $scope.showMap = false;
        //QueryService.query('GET', 'components/services/data/data.json').then(function(trainDetails){
        $scope.getZoneDetails = function(letter){
            $scope.curPage = 0;
            $scope.zoneDetails = [];
            $scope.displayviewDetails = true;
            $scope.selectedLetter = letter;
            angular.forEach($scope.totalZoneDetails, function(zone) {
                if(zone.name.startsWith(letter)){
                    $scope.zoneDetails.push(zone);
                }
            });
        };
        QueryService.query('GET', 'trainDetails').then(function(trainDetails){
            $scope.totalZoneDetails = trainDetails.data;
            $scope.zoneDetails = $scope.totalZoneDetails;
            $scope.getZoneDetails('A');
        });
        $scope.numberOfPages = function(){
            return Math.ceil($scope.zoneDetails.length / $scope.pageSize);
        };
        
        $scope.dispalyDetails = function(details){
            $scope.displayviewDetails = false;
            $scope.displayZone = details;
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
