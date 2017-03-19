(function() {
    'use strict';
    
   angular
        .module('londonZones.home',[])
        .controller('homeController', homeController)
        .filter('pagination', pagination);

	function homeController($scope, QueryService, $timeout, $http){
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
        $scope.searchPostCode = {postCode: null};
        $scope.viewMap = false;
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
            $scope.displaySearchStation = false;
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

        $scope.viewStationList = function(){
            $scope.displayViewDetails = true;
            $scope.viewMap = false;
        }

        $scope.findZone = function (postCode) {
        	if(postCode){
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
            		$scope.displayviewDetails = false;
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
