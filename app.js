var browserify = require('browserify-middleware');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


module.exports = function(mock2easy,options) {


  var app = express();

// view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(favicon());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/gitbook', express.static(path.join(process.cwd(), 'doc/_book')));

  app.get('./build/bundle.js', browserify(path.join(__dirname, 'public')+'/javascripts/app.js'));

  app.use('/', require('./routes/index')(mock2easy));

  if(!!options.curl){
    app.use('/*'+options.interfaceSuffix,require('./routes/getJsonByCurl')(mock2easy));
  }else if(!!options.postman){
    app.use('/*'+options.interfaceSuffix,require('./routes/getJsonByPostman')(mock2easy));
  }else{
    app.use('/*'+options.interfaceSuffix,require('./routes/getJson')(mock2easy,options.ignoreField));
  }


/// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  return app;
};

