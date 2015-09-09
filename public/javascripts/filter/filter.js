/**
 * Created by lihui on 14-7-30.
 */

module.exports = angular.module('filter', [])
    .filter('url', require('./url'))
    .filter('database',require('./database'))
