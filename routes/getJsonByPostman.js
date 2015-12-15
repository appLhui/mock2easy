/**
 * Created by lihui on 15-11-24.
 */

module.exports = function (mock2easy) {

  var extend = require('node.extend');


  return function (req, res, next) {
    var ck = function(error, stdout){
      if (error) {
        return req.json(500, err);
      }
      res.send(stdout);
    }
    require('../server/getJsonByPostman')(mock2easy,ck, global.options.postman,req);
  }


};


