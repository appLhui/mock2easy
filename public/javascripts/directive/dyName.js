/**
 * Created by lihui on 14-7-31.
 */

module.exports = function() {
    return {
        require: "ngModel",
        link: function($scope, el, iAttrs, ngModelCtr) {
            var formController;
            ngModelCtr.$name = $scope.$eval(iAttrs.dyName);
            formController = el.controller('form') || {
                $addControl: angular.noop
            };
            formController.$addControl(ngModelCtr);
            return $scope.$on('$destroy', function() {
                return formController.$removeControl(ngModelCtr);
            });
        }
    };
}
