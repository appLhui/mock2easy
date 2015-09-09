/**
 * Created by lihui on 14-8-28.
 * 校验请求参数
 *
 */


module.exports = function (mock2easy) {

  var fs = require('fs');
  var path = require('path');
  var colors = require('colors');

  return function (url, method, params, jsonData, ignoreField) {
    jsonData.reqError = [];
    jsonData.docError = [];

    if(jsonData.isJsonp){
      ignoreField.push('_');
      ignoreField.push('callback');
    }

    delete jsonData.methodError;

    if (method !== jsonData.interfaceType) {
      jsonData.methodError = global.language['SERVER-MEDTH-ERROR'];
    }

    jsonData.requiredParameters.forEach(function (o) {
      if (o.required && !!!params[o.name]) {
        jsonData.reqError.push(_.template(global.language['SERVER-ERROR-PARAMETER-1'])({parameters: o.name}));
      }
    });

    //过滤出来请求参数有，而文档中该参数没有定义

    for (name in params) {
      var _i = 0;
      jsonData.requiredParameters.forEach(function (o) {
        if (o.name !== name) {
          _i++;
        }
      });
      if (_i === jsonData.requiredParameters.length && ignoreField.indexOf(name) === -1) {
        jsonData.docError.push(_.template(global.language['SERVER-ERROR-PARAMETER-2'])({parameters: name}));
      }
    }


    if (jsonData.methodError || jsonData.reqError.length || jsonData.docError.length) {
      mock2easy.log(('+---------------------'+global.language['SERVER-WARN']+'--------------------------').red);
      mock2easy.log('| '.red + url.bold);
      if (jsonData.methodError) {
        mock2easy.log('| '.red + global.language['SERVER-WARN-TEXT'].red);
      }
      if (jsonData.reqError.length) {
        jsonData.reqError.forEach(function (o) {
          mock2easy.log('| '.red + o.red);
        });
      }
      if (jsonData.docError.length) {
        jsonData.docError.forEach(function (o) {
          mock2easy.log('| '.red + o.red);
        });
      }
      mock2easy.log('+-------------------------------------------------------'.red);
    }
    fs.writeFileSync(path.resolve(global.options.database) + url.replace(global.options.interfaceSuffix,'.json'), JSON.stringify(jsonData, undefined, 5));
  }
};