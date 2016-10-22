/**
 * Created by Administrator on 2016/8/14.
 */
var  mongoose=require('mongoose');
var  db=require('../connect/mongdb_conn.js');

//新建模板，用来约束集合里面的键值对
var record_shema=new mongoose.Schema({
    user_id: {type: String},
    type:{type:String},
    record_money:{type:Number},
    income:{type:String,default:'支出'},
    record_time:{type:Date,default:new Date()},
    record_year:{type:Number,default:new Date().getFullYear()},
    record_month:{type:Number,default:new  Date().getMonth()}
});

//新建集合并暴露出去
module.exports=db.model("record_info",record_shema);
