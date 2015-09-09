/**
 * Created by lihui on 14-7-31.
 */

module.exports = function() {
    return {
        scope:{
            mockjs:'='
        },
        link: function($scope, $el) {
            $scope.$watch('mockjs',function(){
                $el.html(Mock.mock($scope.mockjs));
            });
        }
    };
}