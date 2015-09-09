/**
 * Created by lihui on 14-7-31.
 */
var fs = require('fs');
var $ = require('jquery');


module.exports = ['$scope','$stateParams','$http','$filter','$modal','json2Data','growl',function($scope,$stateParams,$http,$filter,$modal,json2Data,growl) {

  angular.extend($scope,{
    data:{
      interfaceType:'GET',
      requiredParameters:[],
      responseParameters:[],

    },
    render:function(){
      $http.post('/load',{url:$stateParams.url}).then(function(data){
        data.data.lazyLoad = !!data.data.lazyLoad && data.data.lazyLoad == 'yes'?'yes':'no';
        angular.extend($scope,{data:data.data});
//        $scope.data.responseParametersType = true;
      });

    },
    addRequiredParameters:function(){
      $scope.data.requiredParameters.push({
        name:'',
        required:true,
        remark:'',
        nameVerify:'name_'+Date.parse(new Date()),
        ruleVerify:'rule_'+Date.parse(new Date())
      });
    },
    removeRequiredParameters:function(i){
      $scope.data.requiredParameters.splice(i,1);
    },
    addResponseParameters:function(id){
      var _id = id+'00';
      var _length = _id.length;
      if($scope.data && $scope.data.responseParameters){
        angular.forEach($scope.data.responseParameters,function(o,i){
          if(o.id.length === _id.length && id == o.id.substr(0, o.id.length-2)){
            if(parseInt(_id) < parseInt(o.id)){
              _id = o.id;
            }
          }
        });


        _id = parseInt(_id)+1;
        _id = (''+_id).length%2==0?''+_id:'0'+_id;

        var _array = [];
        var _i = 2;
        while(_id.length-_i > 0){
          angular.forEach($scope.data.responseParameters,function(o,i){
            if(_id.substr(0,_id.length-_i) == o.id && o.kind == 'array(object)'){
              _array.push(o.id);
            }
          });
          _i+=2;
        }
      }else{
        $scope.data.responseParameters = [];
      }


      id =  id == '00'?'00'+_id:_id;

      while(id.length < _length){
        id = '0'+ id;
      }

      $scope.data.responseParameters.push({
        id: id,
        kind:'string',
        name:'--',
        rule:'--',
        array:_array,
        nameVerify:'name_'+Date.parse(new Date()),
        ruleVerify:'rule_'+Date.parse(new Date())
      });
    },
    removeResponseParameters:function(i){
      $scope.data.responseParameters = $filter('orderBy')($scope.data.responseParameters,'id');
      $scope.data.responseParameters.splice(i,1);
    },
    submit:function(){
      $('[json2html]').html();
      $http.post('/modify',angular.fromJson($scope.data)).then(function(){
        window.location.href = '/';
      });
    },
    used:function(){
      $('[json2html]').html();
      $http.post('/modify',angular.fromJson($scope.data)).then(function(){
        growl.addSuccessMessage(window.language.SUCCESS);
      });
    },
    //打开窗口
    openWin:function(){
      var modalInstance = $modal.open({
        template: fs.readFileSync(__dirname.replace('controller','') + 'template/modal/importJson.html'),
        controller: ['$scope','$modalInstance',function($scope,$modalInstance){
          $scope.importResponseParameters = function(json){
            json = json.replace(/"(?:.|\s)*?":/g, function (m) {
              return m.replace(/\|/g,'^');
            });
            $modalInstance.close(json);
          }
        }]
      });

      modalInstance.result.then(function (json) {
        var reData = [];
        var _id = 0;
        angular.forEach(JSON.parse(json),function(o,i){
          json2Data(i,o,_id,[],reData);
          _id += 1;
        });
        $scope.data.responseParameters = reData;
      });

    }
  });
  $scope.render();

}];