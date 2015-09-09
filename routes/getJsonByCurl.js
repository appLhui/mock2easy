/**
 * Created by lihui on 14-8-25.
 */



module.exports = function (mock2easy) {

  var extend = require('node.extend');
  var colors = require('colors');

  var obj2StrParams = function (obj) {
    var param = [];

    for (var prop in obj) {
      param.push(prop + "=" + encodeURIComponent(obj[prop]));
    }

    return param.join('&');
  }

  return function (req, res, next) {
    require('../server/getJsonByCurl')(grunt, function (error, stdout) {
      if (error) {
        return req.json(500, err);
      }
      res.send(stdout);
    }, global.options.curl.domain, req.originalUrl.split('?')[0], extend(true, {}, req.body, req.query, global.options.curl.parameter), global.options.curl.Cookie);

  }
};

