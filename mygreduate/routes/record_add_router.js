/**
 * Created by Administrator on 2016/8/31.
 */
//recorde_add页面上的所有的请求('/recorde_add')，都有该函数流来处理

//引用记录集合对象
var record_handler=require('../models/record_model.js');
var user_handler=require('../models/user_model.js');

var express = require('express');
var recorde_add_router = express.Router();

//导入excel处理的函数
var excel_handler=require('./excel_parser.js');



//批量记账的事件
recorde_add_router.post('/multy_recode',function(req,res,next){
    //获取从页面传过来的参数，类型和money
    console.log(typeof parseInt(req.body.money,10));
    console.log(req.body.mon_type);
    //还要从session中获取用户名。。。。。。
    //创建要插入的记录信息
    var reco={
        user_id:req.session.user_name,
        type:req.body.mon_type,
        record_money:parseInt(req.body.money,10)
    };
    if(req.body.mon_type=='收入'){
        reco.income='收入';
    }

    //将数据插入集合中
    record_handler.create(reco,function(err,docs){
        if(err){
            console.log("插入失败");
            res.end(JSON.stringify({sta:false}));
        }else{
            console.log("插入成功");
            res.end(JSON.stringify({sta:true}));
        }

    });

})

//快速记账事件
recorde_add_router.post('/recorde_fast',function(req,res,next){

    console.log(req.body.mon_type);

    //创建要插入的记录信息
    var reco={
        user_id:req.session.user_name,
        type:req.body.mon_type,
        record_money:parseInt(req.body.money,10)
    };
    if(req.body.mon_type=='收入'){
        reco.income='收入';
    }

    //将数据插入集合中
    record_handler.create(reco,function(err,docs){
        if(err){
            console.log("插入失败");
            res.end(JSON.stringify({sta:false}));
        }else{
            console.log("插入成功");

            res.end(JSON.stringify({sta:true}));
        }

    });

})

//新建模板事件的求情处理
recorde_add_router.post('/module_add',function(req,res,next){
    //获取从页面传来的数据
    req.body.mon_type;
    req.body.money;
    var mod={mon_type:req.body.mon_type,money:req.body.money}
    //向用户中的自定义类型数组中添模板
    var conditions={user_id:req.session.user_name};
    var update={$push:{user_difined_type:mod}};
    user_handler.user_model.update(conditions,update,function(err){
        if(err){
            res.end(JSON.stringify({sta:false,err:"数据库更新失败"}));
        }else {
            res.end(JSON.stringify({sta:true,mon_type:req.body.mon_type,money:req.body.money}));
        }

    });



});

//对模板数据请求响应
recorde_add_router.get('/get_modules',function(req,res,next){
    var conditions={user_id:req.session.user_name}
    var field={user_difined_type:1,_id:0}
    user_handler.user_model.findOne(conditions,field,function(err,docs){

        if(docs){
            res.end(JSON.stringify({sta:true,result:docs}));

        }else {
            res.end(JSON.stringify({sta:false,err:"数据库查询失败"}));


        }

    });


});

//删除模板事件
recorde_add_router.post('/module_delete',function(req,res,next){
    //对数据库进行操作
    var conditions={user_id:req.session.user_name,};
    var mod={mon_type:req.body.mon_type,money:req.body.money};
    var updates={$pop:{user_difined_type:mod}};
    user_handler.user_model.update(conditions,updates,function(err){
        if(err){
            res.end(JSON.stringify({sta:false,err:"从数据库中删除失败"}));
        }else {
            res.end(JSON.stringify({sta:true}));
        }



    });

});

//处理Excel表格记账的事件
recorde_add_router.post('/add_excel',function(req,res,next){
    console.log("进入了post/add_excel");
    //获取上传后的文件的路径
    //如果取不到文件，文件上传失败
    console.log(req.getfiles.excel);
    if(!req.getfiles.excel){
        res.end(JSON.stringify({sta:false,err:"文件上传失败"}));
        return;
    }

    //获取上传的文件的路径
    //var excel_path="F:/learn/123.xlsx";
    var excel_path=req.getfiles.excel;
    //调用插入数据的函数
    excel_handler.insert_by_excel(excel_path,req.session.user_name);
    res.end(JSON.stringify({sta:true}));


});




//暴露函数流
module.exports=recorde_add_router;

