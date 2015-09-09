/**
 * Created by lihui on 14-7-30.
 */
var fs = require('fs');

module.exports = ['$scope', '$state', '$http', '$modal', '$filter', '$timeout', 'json2Data', 'config','growl', '$confirm',function ($scope, $state, $http, $modal, $filter, $timeout, json2Data, config,growl,$confirm) {

  angular.extend($scope, {
    interfaceSuffix: config.interfaceSuffix,
    data: {},
    recordData: {
      requiredParameters: []
    },
    suc: false,
    render: function () {
      $http.post('/getList', {url: '/console/domain/list.json'}).then(function (data) {
        if (data.data.data.length) {
          angular.forEach(data.data.data, function (o) {
            o.urlFilter = $filter('url')(o.url);
          })
        }
        if (data.data.log.length) {
          angular.forEach(data.data.log, function (o) {
            o.urlFilter = $filter('url')(o.url);
          });
        }
        angular.extend($scope, data.data);
      });
    },
    add: function () {
      $http.post('/add', {
        interfaceType: "GET",
        requiredParameters: [],
        responseParameters: [],
        reqError: [],
        docError: [],
        interfaceUrl: $scope.url
      }).then(function (data) {
        $state.go('detail', {url: $filter('url')($scope.url)});
      });
    },
    del: function (url) {

      $confirm({
        text: window.language['MAIN-DELETE-CONTENT'],
        title:window.language.DELETE,
        ok:window.language.SUBMIT,
        cancel:window.language.CANCEL
      }).then(function() {
          $http.post('/del', {
            interfaceUrl: url
          }).then(function (data) {
            $scope.render();
            growl.addSuccessMessage(window.language.SUCCESS);
          });
        });
    },
    changeLazy: function (url) {

      $http.post('/changeLazy', {
        interfaceUrl: url
      }).then(function (data) {
        angular.forEach($scope.data, function (o) {
          if (o.url == url) {
            return o.lazyLoad = !o.lazyLoad;
          }
        });
      });
    },
    changeUrl: function (url) {
      var modalInstance = $modal.open({
        template: fs.readFileSync(__dirname.replace('controller', '') + 'template/modal/changeUrl.html'),
        resolve: {
          data: function () {
            return {
              config: $scope.data,
              interfaceSuffix: $scope.interfaceSuffix
            };
          },
          url: function () {
            return url;
          }
        },
        controller: ['$scope', '$modalInstance', 'data', 'url', function ($scope, $modalInstance, data, url) {
          angular.extend($scope, {
            url: url,
            data: data.config,
            interfaceSuffix: data.interfaceSuffix,
            change: function (newUrl) {
              $http.post('/changeUrl', {
                url: $scope.url,
                newUrl: newUrl
              }).then(function (data) {
                $modalInstance.close(true);
              });
            }
          });
        }]
      });

      modalInstance.result.then(function (reData) {
        if (reData) {
          $scope.render();
        }
      });
    },
    record: {
      requiredParameters: [],
      addRequiredParameter: function () {
        $scope.recordData.requiredParameters.push({
          key: '',
          value: ''
        });
      },
      removeRequiredParameter: function (i) {
        $scope.recordData.requiredParameters.splice(i, 1);
      },
      submitRecord: function () {
        $http.post('/recordUrl', $scope.recordData).then(function (data) {
          var modalInstance = $modal.open({
            template: fs.readFileSync(__dirname.replace('controller', '') + 'template/modal/curlResult.html'),
            resolve: {
              data: function () {
                $scope.recordData.responseParameters = data.data;
                $scope.recordData.path = $scope.path;
                $scope.recordData.interfaceSuffix = $scope.interfaceSuffix;
                return $scope.recordData;
              }
            },
            controller: ['$scope', '$modalInstance', 'data' , function ($scope, $modalInstance, data) {
              angular.extend($scope, {
                data: data,
                record: function () {
                  var _requiredParameters = [];
                  angular.forEach($scope.data.requiredParameters, function (o, i) {
                    _requiredParameters.push({
                      name: o.key,
                      remark: o.value,
                      nameVerify: "name_" + i,
                      ruleVerify: "rule_" + i,
                      required: true
                    })
                  });

                  var _responseParameters = [];
                  var _id = 0;
                  angular.forEach($scope.data.responseParameters, function (o, i) {
                    json2Data(i, o, _id, [], _responseParameters);
                    _id += 1;
                  });

                  $http.post('/add', {
                    interfaceType: $scope.data.interfaceType,
                    requiredParameters: _requiredParameters,
                    responseParameters: _responseParameters,
                    reqError: [],
                    docError: [],
                    interfaceUrl: $scope.data.url
                  }).then(function (data) {
                    $state.go('detail', {url: $filter('url')($scope.data.url)});
                    $modalInstance.close();
                  });
                }
              });
            }]
          });
        });
      }
    }
  });

  $scope.render();


}];