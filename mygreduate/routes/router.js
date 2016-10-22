/**
 * Created by Administrator on 2016/8/21.
 */

var express = require('express');
var router_handler = express.Router();
var user_handler=require("../models/user_model.js");

router_handler.post("/",function(req,res,next){
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




module.exports = router_handler;
//console.log(router_handler);