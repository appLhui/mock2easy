/**
 * Created by lihui on 14-9-11.
 * 删除xxx目录以及子目录成功
 *
 */



module.exports = function(mock2easy,dir,cb){

    var fs = require('fs');

    var iterator = function(url,dirs){
        var stat = fs.statSync(url);
        if(stat.isDirectory()){
            dirs.unshift(url);//收集目录
            inner(url,dirs);
        }else if(stat.isFile()){
            fs.unlinkSync(url);//直接删除文件
        }
    }

    var inner = function(path,dirs){
        var arr = fs.readdirSync(path);
        for(var i = 0, el ; el = arr[i++];){
            iterator(path+"/"+el,dirs);
        }
    }


      cb = cb || function(){};
      var dirs = [];

      try{
        iterator(dir,dirs);
        for(var i = 0, el ; el = dirs[i++];){
          fs.rmdirSync(el);//一次性删除所有收集到的目录
        }
        cb()
      }catch(err){//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
        mock2easy.error(err);
        err.code === "ENOENT" ? cb() : cb(err);
      }
  }
