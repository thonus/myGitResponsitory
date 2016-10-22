/**
 * Created by Administrator on 2016/8/13.
 */
var user_handler=require("../models/user_model.js");

user_handler.user_save("tom","632489",function(err){
    if(err){
        console.log("插入数据过程出现错误");
    }else {
        console.log("插入成功");
    }

});

//更新tom,默认只会更新一条

var condition={user_id:"tom"};
var update_obj={$set:{user_name:"随风飘扬的叼毛"}};
user_handler.user_model.update(condition,update_obj,function(err){
    if(err){
        console.log("更新出现错误");
    }else{
        console.log("测试更新成功");
    }

});

//删除数据，remove函数会删除所有匹配的docs
var conditions={user_id:"13580106489"};
user_handler.user_model.remove(conditions,function(err){
    if(err){
        console.log("删除出现错误");

    }else{
        console.log("删除成功");
    }

});
//查找docs

user_handler.user_model.find({user_id:"tom"},function(err,docs){
    if(err){
        console.log("查找出现错误");
    }else {
        console.log(docs.length);
        console.log(docs);
    }

});





