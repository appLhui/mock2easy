/**
 * Created by lihui on 15-11-24.
 */


module.exports = function (mock2easy, callback, postman, req) {
  var http;

  var options = {
    host: postman.hostname,
    port: postman.port,
    path: req.originalUrl,
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Cookie': postman.cookie
    }
  };

  if(postman.protocol == 'https'){
    http = require('https');
    // 如果是https 忽略证书
    options.rejectUnauthorized = false;
  }else{
    http = require('http');
  }

  var _write = JSON.stringify(req.body);


  if (req.method == 'POST') {
    options.headers['Content-Length'] = _write ? _write.length : 0;
  }

  var _req = http.request(options, function (_res) {

    var data = '';
    _res.on('data', function (chunk) {
      data += chunk;
    });
    _res.on('end', function () {
      callback(null, data);
    });
  });

  _req.on('error', function (e) {
    mock2easy.log(e);
  });



  if (req.method == 'POST' && _write) {
    _req.write(_write);
  }

  _req.end();

};
