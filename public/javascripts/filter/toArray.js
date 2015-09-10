/**
 * Created by lihui on 15-9-10.
 */

module.exports =  function () {
  return function (obj, addKey) {
    if (!angular.isObject(obj)) return obj;
    if (addKey === false) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        var value = obj[key];
        return angular.isObject(value) ?
          Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
        { $key: key, $value: value };
      });
    }
  }
}