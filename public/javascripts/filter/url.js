/**
 * Created by lihui on 14-7-30.
 */

module.exports = function(){
    return function(val){
        return val.replace(/\//g,'&');
    }
}
