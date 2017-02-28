(function() {
    'use strict';
    
   angular
        .module('londonZones.contact',[])
        .controller('contactController', contactController);

	function contactController($scope, QueryService){
        $scope.contact = {};
        $scope.errors = {};
        $scope.errors.contact = {};
        $scope.requiredFiels = ['name', 'email', 'phone', 'question'];
        $scope.contactInfo = function (form) {
            if(form.$valid) {
                console.log($scope.contact);
                 QueryService.query('POST', 'saveContactUs', null, $scope.contact).then(function (result) {
                    console.log(result);
                    $scope.contact = {};
                    $scope.detailsSaved = 'Details saved successfully';
                });
            } else {
                angular.forEach($scope.requiredFiels, function (attr) {
                    if ($scope.contact && !$scope.contact[attr]) {
                        $scope.errors.contact[attr] = 'This field is required';
                    } else if (!$scope.contact) {
                        $scope.errors.contact[attr] = 'This field is required';
                    }
                });
            }
        }

        $scope.hideErrorMsg = function (id, key) {
            if($scope.detailsSaved){
                $scope.detailsSaved = '';
            }
            if ($scope.errors[key] && $scope.errors[key][id]) {
                $scope.errors[key][id] = false;
            }
        };
    }  
 })();
