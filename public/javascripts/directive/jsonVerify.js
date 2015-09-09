/**
 * Created by lihui on 14-9-11.
 */



module.exports = function() {
  return {
    restrict: 'A',
    require:'ngModel',
    link: function($scope, $el, $attr, $ctrl) {
      $ctrl.$parsers.push(function(val){
        try{
          JSON.parse(val);
          $ctrl.$setValidity('json',true);
        }catch(e){
          $ctrl.$setValidity('json',false);
        }
        return val;
      });
    }
  }
}