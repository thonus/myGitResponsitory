/**
 * Created by Administrator on 2016/8/31.
 */

//所有以login开头的url请求都会来到这个函数流中间件处理

var express = require('express');
var login_router = express.Router();
var user_handler=require("../models/user_model.js");

//如果后面没有子地址的请求的话,返回登录界面
login_router.get('/',function(req,res,next){
    console.log("来到了响应登录界面的函数层");
    res.render('login_second');

});

//如果后面请求的是/username的话
login_router.post("/username",function(req,res,next){
    console.log("route函数流中间件获取的url",req.url);
    //console.log(req);
    //获取从页面传来的用='
    console.log("用户名为"+req.body.user_name);
    //从数据库中查找是否有匹配的用户名
    user_handler.user_model.find({user_id:req.body.user_name},function(err,docs){
        if(err){

            next();
        }else{
            res.writeHead(200,{"content-type":"application/json"})
            if(docs.length==0){

                res.write(JSON.stringify({ex:false}));

            }else{
                res.write(JSON.stringify({ex:true}));
            }
            res.end();
        }

    })




});

//如果后面请求的是/login_test的话
login_router.post('/login_test',function(req,res,next){

    console.log("函数中间件获取的URL",req.url);
    //console.log(req);
    //判断用户名密码是否正确
    console.log(req.body.acount+"__-"+req.body.pwd);
    console.log("来到了login_test函数");
    user_handler.user_model.findOne({user_id:req.body.acount,password:req.body.pwd},function(err,docs){
        if(err){
            console.log("出现了错误");
            next();
        }else{
            console.log("查询结束");
            console.log(docs==false);
            //console.log(docs.length);
            console.log(docs);
            //响应登录成功或者失败
            if(docs){
                //登录成功
                console.log("登录成功");
                //往session里面写信息
                req.session.user_name=docs.user_id;
                res.write(JSON.stringify({status:true,url:"/"}));
                res.end();
            }else{
                //登录成功，如何响应？？？？？
                console.log("登录失败");
                //跳转页面

                res.end(JSON.stringify({status:false}));
            }

        }



    });

});


module.exports=login_router;




