/**
 * Created by Administrator on 2016/8/12.
 */
var  mongoose=require('mongoose');
var  db=require('../connect/mongdb_conn.js');

//创建schema,数据模板，约束数据格式
var user_schema=new mongoose.Schema({
    user_id:{type: String},
    user_name:{type:String},
    password:{type:String},
    phone_number:{type:String},
    register_time:{type:Date,default:new Date()},
    user_job:{type:String},
    user_difined_type:{type:Array},
    user_head:{type:String,default:"/upload_6e4226c33e64067b5b8f0ab693c9279a.jpg"}

});

//创建集合对象，，一个model对应数据库里面的一个集合
var user_model=db.model("user_info",user_schema);
exports.user_model=user_model;

//打印uer_model
//console.log(user_schema);
//给user_schema添加age属性
//user_schema.add({age:"Number"});
//console.log(user_schema);
//console.log("-------------");




//创建实体对象,参数为一个对象，对象的key的名字必须是在schema的范围内。

//var user_entity=new user_model({
//    user_id: "13580106489",
//    user_name:"随风飘扬的叼毛",
//    password:"sfpyddm",
//    phone_number:"13580106489",
//    register_time: new Date(),
//    user_job:"studen",
//
//});

//测试是否能扩展实体对象,结论，并不能
//user_entity.blabla="iiii";
//console.log(user_entity);

//通过实体对象来插入数据
//user_entity.save(function(err,doc){
//    if(err){
//        console.log("err"+err);
//
//    }else{
//        console.log(doc);
//    }
//
//
//});

//更新数据，更新操作因为用户的操作不确定性，
// 导致更新条件的键值对不应该简化，因为简化后还要判断，增加了其复杂性，所以不进行封装（参数去键名）
//查询条件
//var conditions={user_id:"13580106489"};
////更新操作,有三个参数，查找条件，更新操作，和回调函数
//var update={$set:{user_job:"lilili"}};
//user_model.update(conditions,update,function(err){
//       if(err){
//           console.log("插入操作出现错误");
//       }else {
//           console.log("更新成功");
//       }
//
//});

//数据的删除
//var conditions={phone_number:"13580106489"}
//
//user_model.remove(conditions,function(err){
//    if(err){
//        console.log("出现错误");
//    }else{
//        console.log("删除成功");
//    }
//
//});

//数据的查找，多个参数，查找条件，【投影，结果控制，】回调函数
//user_model.find({phone_number:"13580106489"},function(err,docs){
//console.log(typeof docs);
//
//});

//console.log(user_model);
//定义一个函数，将用户名和密码插入集合中，暴露方法
exports.user_save=function(name,password,callback){
  //使用model新建entity

    var entity=new user_model({
        user_id:name,
        password:password

    });
   console.log(entity);
   //往数据库里面插入只包含只有用户名和密码的document
   entity.save(callback);
}






