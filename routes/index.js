module.exports = function (mock2easy) {
  var express = require('express');
  var path = require('path');
  var fs = require('fs');
  var Mock = require('mockjs');

  var router = express.Router();


  router.get('/', function (req, res) {
    res.render('index', {
      interfaceSuffix: global.options.interfaceSuffix,
      language: JSON.stringify(global.language)
    });
  });

  //获取已经生成的接口路径
  router.post('/getList', function (req, res) {
    require('../server/loadInterface')(mock2easy, require('../server/getAllFiles')(mock2easy)).then(function (o) {
      res.json(o);
    }, function (err) {
      res.send(500,err);
    });
  });

  router.post('/load', function (req, res) {
    fs.readFile(path.resolve(global.options.database) + req.body.url.replace(/&/g, '\/').replace(global.options.interfaceSuffix, '.json'), 'utf-8', function (err, data) {
      if (err) {
        mock2easy.error(err);
        res.send(500, err);
      } else {
        if (data) {
          try {
            res.json(JSON.parse(data));
          } catch (err) {
            res.send(500, err);
          }

        }
      }
    });
  });


  router.post('/changeLazy', function (req, res) {
    var _url = path.resolve(global.options.database) + req.body.interfaceUrl.replace(global.options.interfaceSuffix, '.json');
    fs.readFile(_url, 'utf-8', function (err, data) {
      if (err) {
        mock2easy.error(err);
        res.send(500, err);
      } else {
        if (data) {
          var _data = JSON.parse(data);
          _data.lazyLoad = _data.lazyLoad == 'yes' ? 'no' : 'yes';
          require('../util/writeFile')(_url, JSON.stringify(_data, undefined, 5), mock2easy).then(function () {
            res.json({success: true});
          }, function (err) {
            res.send(500, err);
          });
        }
      }
    });
  });


  //删除接口
  router.post('/del', function (req, res) {
    fs.unlink(path.resolve(global.options.database) + req.body.interfaceUrl.replace(global.options.interfaceSuffix, '.json'), function (err) {
      if (err) {
        mock2easy.error(err);
        res.send(500, err);
      } else {
        require('../server/cleanInterface')(mock2easy).then(function () {
          res.json({success: true});
        }, function (err) {
          res.json(500, err);
        });
      }
    });
  });


  //获取已经生成的接口路径
  router.post('/add', function (req, res) {
    require('../server/createInterface')(mock2easy, req.body).then(function () {
      require('../server/cleanInterface')(mock2easy).then(function () {
        res.json({success: true});
      }, function (err) {
        res.json(500, err);
      });
    }, function (err) {
      res.json(500, err);
    });
  });

  //修改接口操作
  router.post('/modify', function (req, res) {
    require('../server/setConfiguration')(mock2easy, req.body).then(function () {
      require('../server/cleanInterface')(mock2easy).then(function () {
        res.json({success: true});
      }, function (err) {
        res.json(500, err);
      });
    }, function (err) {
      res.json(500, err);
    });
  });

  router.post('/changeUrl', function (req, res) {
    require('../server/changeUrl')(mock2easy, req.body).then(function () {
      require('../server/cleanInterface')(mock2easy).then(function () {
        res.json({success: true});
      }, function (err) {
        res.json(500, err);
      });
    }, function (err) {
      res.json(500, err);
    });
  });

  router.post('/recordUrl', function (req, res) {
    var _data = req.body;
    var query = {};

    _data.requiredParameters.forEach(function(o){
      query[o.key] = o.value;
    });



    require('../server/getJsonByCurl')(mock2easy, function (error, stdout) {
      if (error) {
        return  res.json(500, error);
      }
      res.json(JSON.parse(stdout));
    }, '', _data.interfaceUrl, query, _data.cookie,_data.interfaceType);

  });

  router.post('/gitbook', function (req, res) {
    require('../server/gitbook/checkInstall')(mock2easy,function(error,stdout){
       if(!error && stdout){
         require('../server/gitbook/init')(mock2easy,function(){
           res.json(200);
         });
       }else{
         res.json(200, {code:500});
       }
    });


  });

  return router;
}
