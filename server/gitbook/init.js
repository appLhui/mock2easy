/**
 * Created by lihui on 15-9-22.
 *
 *  初始化 gitbook 环境
 *
 */

module.exports = function (mock2easy, callback) {
  var fs = require('fs');
  var async = require('async');
  var path = require('path');
  var createFile = require('../../util/createFile');
  var writeFile = require('../../util/writeFile');

  var initMd = function (fileName,data,ck) {
    if(!fs.existsSync(path.resolve(options.doc))) {
      fs.mkdirSync(path.resolve(options.doc));
    }
    writeFile(path.resolve(options.doc)+'/'+fileName+'.md',data[fileName],mock2easy).then(function () {
       ck();
    }, function (err) {
       ck(err);
    });
  }

  require('./createMenuData')(mock2easy, function (err, data) {
    if (err) {
      return callback(err);
    }
    async.parallel([function (ck) {
      initMd('README',data,ck);
    }, function (ck) {
      initMd('SUMMARY',data,ck);
    }],callback);

  });


}