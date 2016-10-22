/**
 * Created by Administrator on 2016/8/14.
 */

var record_model=require('../models/record_model');

record_model.create({
    user_id:"tom",
    type:"收入",
    record_money:8000

},function(err){
    if(err){
        console.log("插入出错");
    }else {
        console.log("插入成功");
    }

});

var a=new Date().getFullYear();

console.log(typeof a);