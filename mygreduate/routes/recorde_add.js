/**
 * Created by Administrator on 2016/8/26.
 */

//引用记录集合对象
var record_handler=require('../models/record_model.js');
var user_handler=require('../models/user_model.js');

//批量记账求情处理函数
exports.multi_recorde=function(req,res,next){
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
            reco.income=true;
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

}

//对recorde_fast的请求进行处理
exports.recorde_fast=function(req,res,next){

       console.log("来到了recorde_fast处理函数");
            //创建要插入的记录信息
            var reco={
                user_id:req.session.user_name,
                type:req.body.mon_type,
                record_money:parseInt(req.body.money,10)
            };
            if(req.body.mon_type=='收入'){
                reco.income=true;
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

}

//对添加模板进行处理
exports.module_add =function(req,res,next){
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



}

//对模板数据的求情进行响应
exports.get_modules=function(req,res,next){
        var conditions={user_id:req.session.user_name}
        var field={user_difined_type:1,_id:0}
        user_handler.user_model.findOne(conditions,field,function(err,docs){

            if(docs){
                res.end(JSON.stringify({sta:true,result:docs}));

            }else {
                res.end(JSON.stringify({sta:false,err:"数据库查询失败"}));


            }

        });


}

