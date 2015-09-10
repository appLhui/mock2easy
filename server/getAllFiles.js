/**
 * Created by lihui on 14-8-25.
 */

module.exports = function(mock2easy){
    var path = require('path');
    var fs = require('fs');

    var _data = [];
    var _i = 1;
    var _filse = [];

    var getAllFiles = function(root){
        function getAllFiles(root) {
            var result = [], files = fs.readdirSync(root)
            files.forEach(function(file) {
                var pathname = root+ "/" + file
                    , stat = fs.lstatSync(pathname)
                if (stat === undefined) return
                // 不是文件夹就是文件
                if (!stat.isDirectory()) {
                    result.push(pathname)
                    // 递归自身
                } else {
                    result = result.concat(getAllFiles(pathname))
                }
            });
            return result
        }
        return getAllFiles(root);
    }

    try{
      getAllFiles(path.resolve(global.options.database)).forEach(function(file){
        var arry = file.split(global.options.database);
        String.prototype.endWith=function(endStr){
          var d=this.length-endStr.length;
          return (d>=0&&this.lastIndexOf(endStr)==d)
        }
        if(arry[arry.length-1].endWith('.json')){
          _filse.push(file);
        }
      });
    }catch (e){
       mock2easy.error(e);
    }

    return  _filse;
}