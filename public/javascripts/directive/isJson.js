/**
 * Created by lihui on 15-1-26.
 */


module.exports = function () {
  return {
    require: 'ngModel',
    link: function ($scope, $el, $attr, $ctrl) {
      $scope.$watch($attr.ngModel,function(newValue){
        if(newValue){
          try{
             JSON.parse(newValue)
            $ctrl.$setValidity('isjson', true);
          }catch (e){
            $ctrl.$setValidity('isjson', false);
          }
        }
      });
    }
  }
}
