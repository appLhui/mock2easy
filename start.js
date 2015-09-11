/**
 * Created by lihui on 15-9-10.
 */
module.exports = function(mock2easy,options ,ck){


  var fs = require('fs');
  var path = require('path');
  global._ = require('underscore');

  var makeDo = function(mock2easy,options){
    var deferred = require('Q').defer();
    require('async').parallel([
        function(callback){
          if(!fs.existsSync(path.resolve(options.database))) {
            fs.mkdirSync(path.resolve(options.database));
          }


          fs.readFile(__dirname + '/_do.tmp','utf-8',function(err,data) {
            if (err) {
              mock2easy.error(err);
            } else {

              require('./util/writeFile')(path.resolve(options.database) + '/do.js', _.template(data)({
                port: options.port,
                interfaceSuffix:options.interfaceSuffix
              }), mock2easy).then(function () {
                callback();
              });
            }
          });
        }
      ],
      function(err, results){
        deferred.resolve();
      });
    return deferred.promise;
  }




  makeDo(mock2easy,options).then(function(){
    global.options = options;
    global.language = require('./server/translate')(mock2easy,options.preferredLanguage);

    require('./server/cleanInterface')(mock2easy).then(function(){
      ck(require('./app'));
    });

  });

}
