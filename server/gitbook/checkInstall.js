/**
 *
 * 检查是否安装了gitbook
 * Created by lihui on 15-9-15.
 */


module.exports = function(mock2easy,callback) {

  var child_process = require('child_process');

  child_process.exec('gitbook -V',function(error, stdout, stderr){
    if(error){
      return callback(error);
    }
    callback(null,stdout);
  });

}