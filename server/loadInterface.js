/**
 * Created by lihui on 14-9-18.
 * 根据文件内容依次去读取文件中的数据
 *
 *
 */

var async = require('async');
var path = require('path');
var fs = require('fs');

module.exports = function(mock2easy,files){

    var deferred = require('q').defer();

    async.reduce(files,{data:[],log:[],path:[]}, function(result, file, callback){

        var arry = file.split(global.options.database);

        var _json = {};
        fs.readFile(file,'utf-8',function(err,data){
            if(err){
                mock2easy.error(err);
            }else{
                process.nextTick(function(){
                   try{
                       if(data){
                           _json = JSON.parse(data);
                           var _url = arry[arry.length-1];
                           result.data.push({
                             url: _url.split('.')[0]+global.options.interfaceSuffix,
                             note:_json.interfaceName,
                             isJsonp:_json.isJsonp,
                             lazyLoad:_json.lazyLoad == 'yes'
                           });
                           var _path_ = '';
                           _json.interfaceUrl.split('/').forEach(function(o,i){
                             if(i && _json.interfaceUrl.split('/').length - 1 > i){
                               _path_ += '/' + o ;
                               if(result.path.indexOf(_path_)==-1){
                                 result.path.push(_path_);
                               }
                             }
                           });

                           if(_json.methodError || _json.reqError.length || _json.docError.length){
                             var _logObj = {url:_json.interfaceUrl};
                             if(_json.methodError){
                               _logObj.methodError = _json.methodError;
                             }
                             if(_json.reqError.length){
                               _logObj.reqError = _json.reqError;
                             }
                             if(_json.docError.length){
                               _logObj.docError = _json.docError;
                             }
                             result.log.push(_logObj);
                           }
                       }
                       callback(null, result);
                   }catch (err){
                     mock2easy.error(err);
                     callback(file, result);
                   }
                });
            }
        });

    }, function(err, result){
        if(err){
          deferred.reject(err);
        }else{
          deferred.resolve(result);
        }
    });

    return deferred.promise;
}