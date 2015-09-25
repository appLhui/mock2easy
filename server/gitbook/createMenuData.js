/**
 * Created by lihui on 15-9-23.
 * 获取
 */


module.exports = function(mock2easy,callback) {

  var _filse = require('../getAllFiles')(mock2easy);
  var async = require('async');
  var fs = require('fs');

  // 数组第一位为
  var md = {
    README: global.language['SERVER-MENU-TITLE'],
    SUMMARY:''
  };



  // 如果没有文档直接返回
  if(!_filse.length) callback(null,md);
  var i = 1;
  async.each(_filse.sort(),function( file, callback) {

    fs.readFile(file, 'utf-8', function (err, data) {
      if (err) {
        mock2easy.error(err);
        callback(err);
      } else {
        try {
          if (data) {
            var _json = JSON.parse(data);
            md['README'] += '|'+i+'.|[' + _json.interfaceUrl + '](' + _json.interfaceUrl.replace(global.options.interfaceSuffix, '.html') + ')|'+_json.interfaceName+'|\n';
            md['SUMMARY'] += '- ['+_json.interfaceName+'](' + _json.interfaceUrl.replace(global.options.interfaceSuffix, '.md') + ')\n';
            i++;
            callback();
          }
        } catch (e) {
          mock2easy.error(err);
          callback(err);
        }
      }
    });
  },function(err){
    if(err){
      callback(err);
    }else{
      callback(null,md);
    }
  });
}