/**
 * Created by lihui on 14-9-18.
 * @param
 *  url 路径
 *  doc 文件内容
 * @type {exports}
 *
 */



module.exports = function(url,doc,mock2easy){
    var fs = require('fs');
    var deferred = require('q').defer();
    fs.open(url,"w",0644,function(err,fd){
        if(err){
          mock2easy.error(err);
            deferred.reject(err);
        }else{
            fs.write(fd,doc,0,'utf8',function(err){
                if(err){
                  mock2easy.error(err);
                    deferred.reject(err);
                }else{
                    fs.closeSync(fd);
                    deferred.resolve();
                }
            });
        }
    });
    return deferred.promise;
}
