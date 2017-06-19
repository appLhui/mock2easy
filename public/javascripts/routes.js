/**
 * Created by lihui on 14-7-30.
 */
var fs = require('fs');
module.exports = ['$stateProvider', '$urlRouterProvider', '$provide', function ($stateProvider, $urlRouterProvider, $provide) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('list', {
      url: "/",
      template: fs.readFileSync(__dirname + '/template/main.html'),
      controller: require('./controller/main.js')
    })
    .state('detail', {
      url: "/detail/:url",
      template: fs.readFileSync(__dirname + '/template/detail.html'),
      controller: require('./controller/detail.js')
    });

  $provide.constant('config', {
    interfaceSuffix: window.interfaceSuffix,
    interfaceRule: window.interfaceRule
  });


}];
