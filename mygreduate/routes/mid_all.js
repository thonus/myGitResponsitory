/**
 * Created by Administrator on 2016/8/31.
 */
var express = require('express');
var all_router = express.Router();

all_router.use(function(req,res,next){
    //打印请求头
    //console.log(req.header('x-requested-with'));
    var req_iden=req.header('x-requested-with');

    //如果session中没有用户,则到登录界面
    if(req.session.user_name){
        next()
    }else if(req_iden=='XMLHttpRequest'){
        //ajax请求，返回json数据
        res.end(JSON.stringify({sta:false,stateL:"your identify was  expired"}));
    }else {
        //同步请求响应重定向
        res.redirect('/login');
    }

});

//暴露函数流
module.exports=all_router;

