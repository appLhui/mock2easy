/**
 * Created by lihui on 14-9-16.
 */
module.exports = function() {
  return {
    restrict: 'A',
    require:'ngModel',
    link: function($scope, $el, $attr, $ctrl) {
      $ctrl.$parsers.push(function(val){
        var transformedInput;
        if (val === void 0) {
          return;
        }
        transformedInput = val.replace(/[\/<>"']/g,'');
        if (transformedInput !== val) {
          $ctrl.$setViewValue(transformedInput);
          $ctrl.$render();
        }
        return transformedInput;
      });
    }
  }
}