require('./util/angular');
require('./util/angular-ui-router');
require('./util/angular-translate');
require('./util/json2');
require('./util/ui-bootstrap-tpls');
require('angular-sanitize');

require('./filter/filter');
require('./directive/directive');
require('./service/service');



var app = angular.module('app', ['ui.bootstrap', 'ngSanitize','ui.router', 'filter', 'directive', 'service', 'pascalprecht.translate']);

app.config(require('./routes'));

app.config(['$translateProvider','growlProvider', function ($translateProvider,growlProvider) {

  growlProvider.globalTimeToLive(1000);

  $translateProvider.translations('language', window.language);

  $translateProvider.preferredLanguage('language');
}]);

angular.bootstrap(document, ['app']);