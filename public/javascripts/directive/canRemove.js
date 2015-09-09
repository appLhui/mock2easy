/**
 * Created by lihui on 14-7-31.
 */

module.exports = function() {
    return {
        scope:{
            canRemove:'=',
            listId:'@'
        },
        link: function($scope, $el) {
            $scope.$watch('canRemove',function(data){
                var _isShow = true;
                angular.forEach(data,function(o,i){
                    if(o.id.substr(0, o.id.length-2) == $scope.listId){
                        return _isShow = false;
                    }
                });
                if(!_isShow){
                    $el.addClass('remove-hide');
                }else{
                    $el.removeClass('remove-hide');
                }
            },true);
        }
    }
}