require('./filter/filter');
require('./directive/directive');
require('./service/service');



var app = angular.module('app', ['ui.bootstrap','ui.router', 'filter', 'directive', 'service', 'pascalprecht.translate']);

app.config(require('./routes'));

app.config(['$translateProvider','growlProvider', function ($translateProvider,growlProvider) {

  growlProvider.globalTimeToLive(1000);

  $translateProvider.translations('language', window.language);

  $translateProvider.preferredLanguage('language');
}]);

angular.bootstrap(document, ['app']);