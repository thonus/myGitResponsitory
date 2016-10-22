/**
 * Created by Administrator on 2016/9/6.
 */
var express = require('express');
var head_router = express.Router();
var user_handler=require("../models/user_model.js");

head_router.post('/',function(req,res,next){
    console.log('iiiiiiiiiiiiiiiii');
    console.log(req.session.user_name,'-------------');

    user_handler.user_model.findOne({user_id:req.session.user_name},function(err,doc){
        if(err){
            res.end(JSON.stringify({sta:false,err:"查找数据错误"}));
        }else {
            res.end(JSON.stringify({sta:true,url:doc.user_head}));


        }

    });

});


head_router.get("/exit",function(req,res,next){

    req.session.user_name="";
    res.end(JSON.stringify({url:"/"}));

});










module.exports=head_router;


