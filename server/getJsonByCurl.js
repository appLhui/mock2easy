/**
 * Created by lihui on 15-1-21.
 */

var child_process = require('child_process');


var obj2StrParams = function(obj){
  var param = [];

  for (var prop in obj) {
    param.push(prop + "=" + encodeURIComponent(obj[prop]));
  }

  return param.join('&');
}


module.exports = function(mock2easy,callback,domain,url,query,cookie){

  try{
    var sh = ['curl',' ',
      domain,
      url,' ',
      '--data "'+obj2StrParams(query)+'" ',
      cookie ? "-H \'Cookie: ":'',cookie,cookie ?"; \'":''
    ];
    sh = sh.join('');
    mock2easy.log();
    mock2easy.log(('+---------------------'+global.language['SERVER-CURL-LOG']+'--------------------------').yellow);
    mock2easy.log('| '.yellow + sh.green);
    mock2easy.log('+-------------------------------------------------------'.yellow);
    child_process.exec(sh,function(error, stdout, stderr){
      if(error){
        return callback(error);
      }
      callback(null,stdout);
    });

  } catch(error){
    callback(error);
  }
}
