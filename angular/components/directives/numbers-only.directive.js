;(function() {

  'use strict';

  /**
   * Numbers only,
   *  Directive
   *
   * @example
   * <input type="text" numbers-only class="form-control" />
   *
   */
  angular
    .module('londonZones')
    .directive('numbersOnly', numbers);
    function numbers () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }            
                ngModelCtrl.$parsers.push(fromUser);
            }
        }
    }

})();