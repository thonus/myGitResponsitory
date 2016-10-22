/**
 * Created by Administrator on 2016/9/5.
 */

//所有register下的请求都会来到这里
var express = require('express');
var register_router = express.Router();
var user_handler=require("../models/user_model.js");

//首先访问注册页面
register_router.get('/',function(req,res,next){

    res.render('register_second');

});

//这里请求是否已存在用户名
register_router.post('/user_name',function(req,res,next){
    var conditions={user_id:req.body.user_name}
    console.log(conditions);
    user_handler.user_model.findOne(conditions,function(err,doc){
        if(err){
            console.log("数据操作出现错误");
            res.end(JSON.stringify({sta:false,err:"数据库查询出现错误"}));

        }else if(doc){
            res.end(JSON.stringify({sta:false,err:"已存在该用户"}));
        }else {
            res.end(JSON.stringify({sta:true}));
        }

    });



});


//处理注册信息
register_router.post('/final_sub',function(req,res,next){
    var conditions={user_id:req.body.user_name,password:req.body.pwd}
    user_handler.user_model.create(conditions,function(err,docs){

        //如果出现错误
        if(err){
            console.log("数据库操作错误");
            res.end(JSON.stringify({sta:false,err:"数据库操作错误"}));
        }else {
            //将用户名放在session中
            req.session.user_name=req.body.user_name;
            res.end(JSON.stringify({sta:true,url:"/"}));
        }

    });


});









module.exports=register_router;
