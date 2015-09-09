/**
 * Created by lihui on 14-9-10.
 * 验证新接口是否验证通过
 */

module.exports = function() {
  return {
    restrict: 'A',
    require:'ngModel',
    scope:{
      canAdd:'='
    },
    link: function($scope, $el, $attr, $ctrl) {
      $ctrl.$parsers.push(function(val){
        if(val){
          val = val.trim();
          if(!!!val.indexOf('/') && val.indexOf($attr.interfaceSuffix) == val.length - $attr.interfaceSuffix.length && val.indexOf('//') == -1){
            $ctrl.$setValidity('isOK',true);
          }else{
            $ctrl.$setValidity('isOK',false);
          }
          var isOnly = true;
          if($scope.canAdd.length){
            angular.forEach($scope.canAdd,function(o){
              if(o.url === val){
                isOnly = false;
              }
            });
          }
          $ctrl.$setValidity('isOnly',isOnly);
        }else{
          $ctrl.$setValidity('isOK',true);
        }
        return val;
      });
    }
  }
}