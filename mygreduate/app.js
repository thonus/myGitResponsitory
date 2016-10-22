var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router_handler=require('./routes/router.js');
var login=require('./routes/login.js');
var record_add_handler=require('./routes/recorde_add.js');
var session = require('express-session');
//将session存到mongodb数据库的模块
var MongoStore = require('connect-mongo/es5')(session);
//引入用户详情模块
var userinfo_router=require('./routes/userinfo_router.js');
//引入头部请求响应模块
var head_router=require('./routes/head_router.js');
//引入文件解析中间件
var file_parse=require('./routes/parser_by_formi.js');



//引入数据库连接对象
var  db=require('./connect/mongdb_conn.js');

var routes = require('./routes/index');
//这句没什么用先注释了
//var users = require('./routes/users');

//引入mid_all中间件，过滤所有未登录的请求（或session过期）
var all_router=require('./routes/mid_all.js');
//引入login_router,处理login下的左右请求
var login_router=require('./routes/login_router.js');
//引入record_add_router,处理'/recorde_add_router'下的所有请求
var recorde_add_router=require('./routes/record_add_router.js');
//引入static_router,处理'/static'下的所有请求
var statistic_router=require('./routes/statis_router.js');
//引入register_router，处理register下的所有请求
var register_router=require('./routes/register_router.js');

var app =new express();


// view engine setup,设置视图的路径和视图使用的模板引擎（视图的路径需要设置么）
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//写日志
app.use(logger('dev'));



//创建session（如果已经有的话就将session放进req中）
app.use(session({
  secret:"thonus",
  cookie:{maxAge: 1000 * 60 * 30},
  resave:true,
  name:"my_se_id",
  //这个是什么意思，强制没有实例化的session对象存储到内存（或者数据库中），如果false就在实例化之后才存储？？
  saveUninitialized: false,
  store: new MongoStore({
    //使用已有的数据库连接
    mongooseConnection: db.connection
  })

}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//处理cookies里面传来的信息
app.use(cookieParser());

//注册有关的所有请求
app.use('/register',register_router);

//访问登录界面
app.use('/login',login_router);

//app.use('/users', users);
//app.use('/username',router_handler);
//app.post('/login_test',login.login_test);

//静态文件处理，如果请求的文件再参数的文件路径下有，则会给客户端响应文件，否则则将请求交给下层的函数流
//正因为这句代码，所以public下的资源文件再页面中就可以直接引用了，而不用再前面添加路径，服务器返回也方便
app.use(express.static(path.join(__dirname, 'public')));



//首页。。。。
app.get('/', routes);






//过滤所有非登录请求
app.use(all_router);



//经过上面的过滤后，以下所有的请求都是登录以后才会操作的
//请求图片路径的请求
app.use('/head',head_router);

//请求用户图片的静态资源
app.use(express.static('f:/learn'));

//解析Excel表格
app.use('/recorde_add/add_excel',file_parse.all_parser);
//中间件拦截所有以'/recorde_add'开头的请求
app.use('/recorde_add',recorde_add_router);

//app.post('/multy_recode',record_add_handler.multi_recorde);
//app.post('/recorde_fast',record_add_handler.recorde_fast);
//
////新建模板事件的求情处理
//app.post('/module_add',record_add_handler.module_`add);
////对模板数据求情进行响应
//app.get('/get_modules',record_add_handler.get_modules);


//访问数据统计界面,数据访问界面下的请求都由该函数流解决
app.use('/statistic',statistic_router);

//解析文件资源,更换头像的时候
app.use('/userinfo/head_change',file_parse.all_parser);

//访问用户详情的请求，用户详情下的所有请求都在这个函数流中解决
app.use('/userinfo',userinfo_router);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
//定义错误处理函数
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
//最后的错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

//console.log(app);