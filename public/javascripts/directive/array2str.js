
module.exports = function() {
    return {
        restrict: 'A',
        require:'ngModel',
        link: function($scope, $el, $attr, $ctrl) {

            $scope.$watch($attr.ngModel,function(inputValue){
                if(angular.isArray(inputValue)){
                    $ctrl.$setViewValue(angular.toJson(inputValue));
                    $ctrl.$render();
                }
            });

        }
    }
}
