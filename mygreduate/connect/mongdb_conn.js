/**
 * Created by Administrator on 2016/8/12.
 */

var mongoose=require('mongoose');

console.log("-------------");
module.exports= db=mongoose.connect("mongodb://localhost:27017/local");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

//console.log(mongoose);
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

