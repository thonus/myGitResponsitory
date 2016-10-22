/**
 * Created by Administrator on 2016/8/23.
 */
var user_handler=require("../models/user_model.js");

exports.login =function(req,res,next){
     //获取从页面传来的参数
       console.log(req.body.acount);
       res.end();

}

//返回登录界面
exports.login_view=function(req,res,next){
    res.render('login_second');

}

//过滤非登录

exports.filter=function(req,res,next){
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

}

exports.login_test=function(req,res,next){

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

}

//可以注释，已经用不上了，登录成功后，跳到  / 页面
//exports.recode=function(req,res,next){
//    res.render('recorde_add');
//}