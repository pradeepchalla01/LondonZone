(function() {
    'use strict';
    
   angular
        .module('londonZones.home',[])
        .controller('homeController', homeController)
        .filter('pagination', pagination)
		.directive('ngEnter', ngEnter);

	function homeController($scope, QueryService, $timeout, $http){
        $scope.displayViewDetails = true;
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
            $scope.displayViewDetails = true;
            $scope.displaySearchStation = false;
            $scope.viewMap = false;
            $scope.selectedLetter = letter;
            angular.forEach($scope.totalZoneDetails, function(zone) {
                if(zone.name.startsWith(letter)){
                    $scope.zoneDetails.push(zone);
                }
            });
        };
        QueryService.query('POST', 'trainDetails').then(function(trainDetails){
            $scope.totalZoneDetails = trainDetails.data;
            $scope.zoneDetails = $scope.totalZoneDetails;
            $scope.getZoneDetails('A');
        });
        $scope.numberOfPages = function(){
            return Math.ceil($scope.zoneDetails.length / $scope.pageSize);
        };
        
        $scope.dispalyDetails = function(details){
            $scope.displayViewDetails = false;
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
        	$scope.getZoneDetails('A');
            $scope.displayViewDetails = true;
            $scope.viewMap = false;
        }

        $scope.findZone = function (postCode) {
        	if(postCode){
        		$scope.selectedLetter = '';
        		$scope.matchedStations = [];
        		$scope.searchResultList=[];
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
            $scope.displayViewDetails = true;
        };
        
        $scope.search = function(e){
            var searchStr = $scope.searchPostCode.postCode;
            if (searchStr && searchStr.length > 2) {
                if(e.keyCode !== 40 && e.keyCode !== 39 && e.keyCode !== 38 && e.keyCode !== 37 && e.keyCode != 13 && e.keyCode != 9){
                    $scope.searchResultList = [];
                    angular.forEach($scope.totalZoneDetails, function(value){
            			var required = ['name', 'postCode'];
            			angular.forEach(required, function(key){
            				if(value && value[key] && value[key].toLowerCase().match(searchStr.toLowerCase())){
            					$scope.searchResultList.push(value);
            				}
            			});
            		});
                    if($scope.searchResultList && $scope.searchResultList.length){
                        angular.element('.company-results').removeClass('hide');
                    }
                }
            }else{
                $scope.searchResultList=[];
            }
        };
        $scope.stationSearch = function(e){
            if(e.keyCode == 9){
                $scope.searchResultList=[];
            }
        }
        $scope.showStation = function(searchResult){
        	$scope.searchPostCode.postCode = searchResult;
            $scope.searchResultList=[];
        };
    }

    function pagination(){
        return function(input, start){
            start = +start;
            return input.slice(start);
        };
    };
    
    function ngEnter() {
    	var linkFn = function(scope,element,attrs) {
    		element.bind("keypress", function(event) {
    			if(event.which === 13) {
    				scope.$apply(function() {
    					scope.$eval(attrs.ngEnter);
    				});
    				event.preventDefault();
    			}
    		});
    	};

    	return {
    		link:linkFn
    	};
    };
 })();
