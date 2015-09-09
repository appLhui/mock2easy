/**
 * Created by lihui on 15-1-22.
 */


module.exports = angular.module('service', [])
  .factory('json2Data', function () {
    return  require('./json2Data')
  });