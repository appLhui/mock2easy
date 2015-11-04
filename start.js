/**
 * Created by lihui on 15-9-10.
 */
module.exports = function(mock2easy,options ,ck){
  var fs = require('fs');
  var path = require('path');
  global._ = require('underscore');


  if (arguments.length == 2){
    ck = options;
    options = _.extend({
      port:3000,
      lazyLoadTime:3000,
      database:'mock2easy',
      doc:'doc',
      keepAlive:true,
      isSpider:false,
      ignoreField:[],
      interfaceSuffix:'.json',
      preferredLanguage:'en'
    },mock2easy);
    mock2easy = {
      log: console.log,
      error: console.error
    }
  }else if(arguments.length == 3){
    options = _.extend({
      port:3000,
      lazyLoadTime:3000,
      database:'mock2easy',
      doc:'doc',
      keepAlive:true,
      isSpider:false,
      ignoreField:[],
      interfaceSuffix:'.json',
      preferredLanguage:'en'
    },options);
  }else{
     console.error('arguments error');
  }


  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };


  var makeDo = function(mock2easy,options){
    var deferred = require('q').defer();
    require('async').parallel([
        function(callback){
          if(!fs.existsSync(path.resolve(options.database))) {
            fs.mkdirSync(path.resolve(options.database));
          }

          fs.readFile(__dirname + '/_do.tmp','utf-8',function(err,data) {
            if (err) {
              mock2easy.error(err);
            } else {

              require('./util/writeFile')(path.resolve(options.database) + '/do.js',_.template(data)({
                port: options.port,
                interfaceSuffix: options.interfaceSuffix
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
      ck(require('./app')(mock2easy,options));
    });

  });

}
