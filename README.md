# mock2easy

##什么是mock2easy？

1. 结合[Mockjs](http://mockjs.com/)使静态的接口活起来

2. 接口自动化测试

3. 接口地址重定向多功能于一身的工具

4. 结合Gitbook整理专业接口文档

5. 支持多平台暂时提供 grunt、gulp 和 webpack 平台。

尝试一下一定会帮你解决很大问题～


### 基本配置

#### options.port

Type: `Number`

Default value: 3000

service port of the starting service

启动的服务的端口号
 

#### options.lazyLoadTime

Type: `Number`

Default value: 3000

enable lazy-loading interface, the delayed time of executing the interface 

启动接口延时加载，调用接口的延迟时间 

#### options.database

Type: `String`

Default value: `mock2easy`

location of the generated interface data 

接口数据的生成位置

#### options.doc

Type: `String`

Default value: `doc`

location of the generated interface documents

接口文档的生成位置


#### options.curl

Type: `Object`

Default value: false

By default leave it blank. If not empty then instead of accessing the local mock data, use will access the service interface through Curl

默认为不写，如果写了的话优先于Curl请求，所有的接口将不再访问本地的mock数据，改为通过Curl访问服务端的接口，我们可以通过这个参数轻松实现ajax请求重定向，我们的ajax可以轻松跨域访问，非常适合联调测试。

```
 curl: {
      domain: 'http://10.1.28.217:8080',
       parameter: {
       },
       Cookie: ''
    }
```

#### options.interfaceSuffix

Type: `Sting`

Default value:  `.json`

Default value is `.json`, all generated interface end with `.json`. All the interface end with ‘.action’, you can change the attribute to `.action`

默认为`.json` ,产生的接口都是以`.json`为后缀的，若你的接口全部都是`.action`结尾的话，可以将该属性更改为`.action`。
后缀不能设置为`.mock2easy` 该后缀已经占用。


#### options.interfaceRule

Type: `RegEx`

Default value:  `null`

接口拦截方案，通过正则表但是的方式进行请求接口拦截，如果`options.interfaceRule` 参数设定，则`options.interfaceSuffix` 将会失效。

#### options.ignoreField

Type: `Array`

Default value: []

Default value is []. It is ok to add ignorable request parameters. Each time when sending request, these key words will not be verified.

默认为[]，可以添加忽略的请求参数，在每次发起请求的时候不去校验这些字段，例如：`__preventCache`等字段，可能不是我们想要的校验的参数。

#### options.preferredLanguage

Type: `String`

Default value: 'en'

支持多语言，默认是英文，将 参数设为 `cn`，将展示为中文，欢迎提供其他语言的翻译支持，[国际化代码地址](https://github.com/appLhui/mock2easy/blob/master/server/translate.js)

Default value is en, en/cn  EN/中文


### 不同的平台配置Demo

#### Grunt

[Grunt平台请使用插件](https://www.npmjs.com/package/grunt-mock2easy)

#### Gulp

```
gulp.task('serve', ['styles', 'fonts'], function () {

  // 在这配置mockeasy的配置
  var options = {
	options.port,
    lazyLoadTime: 3000,
    database: 'mock2easy',
    doc: 'doc',
    ignoreField: [],
    interfaceSuffix: '.json',
    preferredLanguage: 'en'
  };

 // 启动mock2easy,注意demo例子里端口号为3000，请避开端口重复 
  require('mock2easy')(options, function (app) {
    try {
      app.listen(options.port, function () {
        console.log(('mock2easy is starting , please visit : http://localhost:' + options.port).bold.cyan);
      });
    } catch (e) {
      console.log(e);
    }
  });


  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      },
      middleware: [require('./mock2easy/do')] //注意这里来定义middleware ，如果不配置的话将不能对接口进行拦截
    }
  });

  ...
});
```



## Support of mockjs  mockjs的支持

The default folder for the generated documents is `./doc/`. Push it to git for direct review.

文档生成默认在 `./doc/` 目录下，push 到 git 上可以直接查看

Support all the mockjs grammar, [Mockjs grammar examples](http://mockjs.com/demo/mock.html)

支持所有的mockjs语法，[Mockjs语法样例](http://mockjs.com/demo/mock.html) 

If you have any idea or suggestion, please connect me:lhui3it@gmail.com 

如果有好的建议和意见请联系我：lhui3it@gmail.com

[Click here to view the use case>>](https://github.com/appLhui/grunt-mock2easy-demo) 

[使用案例请戳我>>](https://github.com/appLhui/grunt-mock2easy-demo) 

## Basic UI 基本界面

#### Main UI 主界面

1. Simulate the lazy-loading status. Easy to check if the loading status is properly handled
   
   方面模拟访问延时状态，轻松检查 loading 状态是否合理处理。

2. Record interface (similar to postman operation), easily access remote interface through curl, (make sure the system supports curl command). Also record the interface to the local interface base.
   
   录制接口（类似 postman 操作），轻松通过 curl ( 保证系统支持curl命令 )访问远程接口，并将接口录制入本地接口库。

3. Access local interface base, automatically check if the interface has any issue. Easy to keep the consistency of the code in local interface base and the code in js execute interface. Besides, make sure the interface document and script the same at real time
   
   访问本地接口库，自动检查接口是否存在异常，轻松保持本地接口库代码和 js 调用接口代码保持一致，并且确保接口文档实时和脚本保持一致。


![image](https://raw.githubusercontent.com/appLhui/grunt-mock2easy/master/img/index.png) 

#### 接口操作页面

1. Dynamic interface, use [Mockjs](http://mockjs.com/demo/mock.html)as support, can dynamically and randomly generate the interface
   
   动态接口，使用 [Mockjs](http://mockjs.com/demo/mock.html)  作为支持，可以动态随机生成接口。

2. Dynamic interface can access any node and add comments.
   
   动态接口，可以轻松在任何一个节点上加上注释。

3. Static interface. If the interface data is too complex for mock2easy to meet your requirement. Please use static interface.
   
   静态接口，如果接口数据过于复杂，mock2easy  无法满足您的需求，请选用静态接口。

4. Switch between json and jsonp
   
   json 和 jsonp 互相切换

![image](https://raw.githubusercontent.com/appLhui/grunt-mock2easy/master/img/detail.png) 

#### Interface documentation 接口文档

 
 [Interface menu>>](https://github.com/appLhui/grunt-mock2easy-demo/blob/master/doc/menu.md)

 
![image](https://raw.githubusercontent.com/appLhui/grunt-mock2easy/master/img/md_menu.png) 

 [Interface details>>](https://github.com/appLhui/grunt-mock2easy-demo/blob/master/doc/demo/jsondemo.md)


![image](https://raw.githubusercontent.com/appLhui/grunt-mock2easy/master/img/md_detail.png) 





