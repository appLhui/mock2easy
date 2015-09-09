/**
 * Created by lihui on 15-1-22.
 *
 * 格式化 json
 *
 */


/**
 * Created by lihui on 14-7-31.
 */

require('../util/mock');
var $ = require('jquery');
module.exports = function () {


  return {
    scope: {
      jsonFormat: '='
    },
    link: function ($scope, $el) {

      function syntaxHighlight(json) {

        if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 100);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>').replace(/\s/g, "&nbsp;");
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              match = match.split('//');
              if (match.length == 2) {
                return '<span remark="' + match[1] + '" style="color: #97089C;">' + match[0] + '":</span>';
              } else {
                return '<span style="color: #97089C;">' + match[0] + '</span>';
              }

            } else {
              return '<span style="color: #129C22;">' + match + '</span>';
            }
          } else if (/true|false/.test(match)) {
            return '<span style="color: #0A0A80;">' + match + '</span>';
          } else if (/null/.test(match)) {
            return '<span style="color: #070EB1;">' + match + '</span>';
          } else {
            return '<span style="color: #003BF7;">' + match + '</span>';
          }

        });
      }


      $scope.$watch('jsonFormat', function (to) {
        if (to) {
          if (typeof to == 'string') {
            try {
              JSON.parse(to);
            } catch (e) {
              return $el.html('<span style="color: red;">内容不是一个JSON数据！</span>');
            }
          }
          $el.html(syntaxHighlight(to));
        }
      });

    }
  };
}