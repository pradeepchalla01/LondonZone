(function() {
    'use strict';
    
   angular
        .module('londonZones.contact',[])
        .controller('contactController', contactController);

	function contactController($scope){
        $scope.contact = {};
        console.log("---->contactController <----");
        console.log("1111111111111111111111111111");

        $scope.contactInfo = function (form) {
            $scope.requiredError = '';
            if(form.$valid) {
                console.log($scope.contact);
            } else {
                $scope.requiredError = 'Please fill all the required fields';
            }
            
        }
    }  
 })();
