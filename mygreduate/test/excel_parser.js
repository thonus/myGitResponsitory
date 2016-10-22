/**
 * Created by Administrator on 2016/9/8.
 */
var record_handler=require('../models/record_model.js');
var xlsx = require("node-xlsx");

//var list = xlsx.parse("f:/learn/" +"multi.xlsx");
var fs = require('fs');





//read_sheets_from_list(list);

//console.log(list);
//写一个函数根据某个表来都数据，并将其写入数据库,需要的参数，表的集合数组，用户名，，，
// 没有对操作结果进行判断处理
function read_sheet(sheet,user_name){
    //先定义一个全局变量用来存放用户名
    //console.log(sheet);
    for (var i=1;i<sheet.length;i++){
        //console.log(sheet[i]);

        //创建要插入的信息
        var reco={
            user_id:user_name,
            type:sheet[i][0],
            record_money:parseInt(sheet[i][2],10)
        };
        //根据表格的每一行数据，将数据插入记录集合中
        record_handler.create(reco,function(err,docs){
            if(err){
                //插入数据出现错误

            }else {

            }


        });


    }


}

//定义一个函数来根据读取的Excel表来操作数据
function read_sheets_from_list(list,user_name){
    //遍历list，来读取sheet
    for (var i=0;i<list.length;i++){
        //console.log(list[i].data);
        //将数据插入数据库
        read_sheet(list[i].data,user_name);

    }


}

//定义一个函数，用来灯具Excel表的路径将数据写入数据库中


//暴露读取Excel文件的函数,需要知道文件的路径和用户名
exports.insert_by_excel=function(pa,user_name){
    //首先解析excel表
    var list = xlsx.parse(pa);

    console.log(list);
    //写入数据库
    read_sheets_from_list(list,user_name);

}

//--------------------------暂时先不生产Excel表

//定义一个函数，用来从数据库生成excl表,根据用户名，完成后执行回调函数（回调函数的参数为生成文件的文件路径）
exports.make_excel=function(user_name,callback){
        //先从数据库中获取数据
    var conditions={user_id:user_name};
    record_handler.find(conditions,function(err,docs){
        if(err){
            console.log("数据库操作错误");
        }else {
            callback(docs,user_name);
        }

    });


}



//定义一个函数，根据集合来生成excel表?????exce里面只生成一个表？？？？？
function make_excel_by_docs(docs,user_name){

        //暂时obj里面就只放一个表，应该是一个数组，并不是对象数组，

        //根据docs来生成数组,应该是一个二维数组
        var data_ar=[];
        //用一个for循环来插入数据
        for(var i=0;i<docs.length;i++){
            data_ar[i]=[];
            //插入数据
            data_ar[i].push(docs[i].type);
            data_ar[i].push(docs[i].record_time);
            data_ar[i].push(docs[i].record_money);
        }

         var obj = {"worksheets":[{name:"sheets","data":docs}]};

        //生成Excel格式的对象
    console.log(obj);
        var file = xlsx.build(obj);

        //根据格式对象生成Excel表格
      fs.writeFileSync("f:/learn/user_name/"+user_name+"xlsx", file, 'binary');

}





//调用函数，直接将数据写入数据库中，根据路径和用户名
//insert_by_excel("f:/learn/" +"multi.xlsx","tom");

//生成Excel
//make_excel("tom",make_excel_by_docs);




