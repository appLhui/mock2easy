/**
 * Created by lihui on 14-7-30.
 */

module.exports = function(){
    return function(val){
        if(window.interfaceRule)  val = val.replace(/\.mock2easy/g,'');
        return val.replace(/database/g,'');
    }
}