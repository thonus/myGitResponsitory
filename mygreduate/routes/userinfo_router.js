/**
 * Created by Administrator on 2016/9/6.
 */

//所有register下的请求都会来到这里
var express = require('express');
var userinfo_router = express.Router();
var user_handler=require("../models/user_model.js");

//访问用户信息页面
userinfo_router.get('/',function(req,res,next){
    res.render('userinfo');

});

//上传头像的请求处理函数
userinfo_router.use('/head_change',function(req,res,next){
    //获取头像的路径,并且去掉f:/learn
    var head_path=req.getfiles.head;
    console.log('要打印路径咯');
    head_path=head_path.substr(8);
    console.log(typeof head_path);
    if(head_path==undefined){
        head_path='/upload_6e4226c33e64067b5b8f0ab693c9279a.jpg';
    }

    //操作数据库，更新头像
    var conditions={user_id:req.session.user_name};
    console.log(conditions);
    var update={$set:{user_head:head_path}};
    user_handler.user_model.update(conditions,update,function(err){
        if(err){
            console.log('caozuocg');
            res.end(JSON.stringify({sta:false,err:"数据库操作错误"}));
        }else {
            console.log('caozuoshibai ');
            res.end(JSON.stringify({sta:true,url:head_path}));
        }




    });



});

//更改密码请求的处理函数
userinfo_router.post('/pwd_update',function(req,res,next){
    var conditions={user_id:req.session.user_name,password:req.body.pwd};
    var updates={$set:{password:req.body.new_pwd}};
    user_handler.user_model.update(conditions,updates,function(err,docs){
        if(err){
            res.end(JSON.stringify({sta:false,err:"数据库操作错误"}));
        }else if(docs.n==0){

            console.log(docs.n);
            res.end(JSON.stringify({sta:false,err:"密码错误"}));
        }else {
            res.end(JSON.stringify({sta:true}));
        }

    });


});





module.exports=userinfo_router;




