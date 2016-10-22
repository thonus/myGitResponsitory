/**
 * Created by Administrator on 2016/8/31.
 */
//引用记录集合对象
var record_handler=require('../models/record_model.js');
var user_handler=require('../models/user_model.js');

var make_excel=require('./make_excel.js');

var express = require('express');
var staticstic_router = express.Router();

//该路径下没有其他子路径，返回statistic页面
staticstic_router.get('/',function(req,res,next){
    res.render('statistic');


});

//获取某年的消费信息的请求
staticstic_router.post('/sele_by_year',function(req,res,next){
    //获取参数

    //根据年份查询信息
    //sele_byyear();.....响应必须在数据库操作的回调函数里
    //var result=sele_byyear();
    //console.log("在响应前打印result");
    //console.log(result);
    //res.end(JSON.stringify(result));
    sele_byyear(req,res,next);
});

//获取某年的收入或支出类型的消费信息
staticstic_router.post('/sele_by_year/income',function(req,res,next){
        //获取参数中的年份和income类型
    console.log('来到了年度的二级请求');
    console.log(req.body.income);
    sele_byyear_and_income(req,res,next,req.body._id);

});


//获取某年某种类型的信息集合的请求
staticstic_router.post('/sele_by_year/type',function(req,res,next){
    //获取年份和类型（此处是客户端_id的字段传参）
    //查询条件
    var conditions={record_year:req.body.year,type:req.body.type,user_id:req.session.user_name};
    var field={type:1,record_time:1,record_money:1,_id:0};
    var options={skip:parseInt(req.body.record_index,10),limit:5};
    //console.log(options);
    //console.log(conditions);
    record_handler.find(conditions,field,options,function(err,docs){
        if(err){
            console.log("出现了错误？？？？？");
            res.end(JSON.stringify({sta:false,err:'数据库操作出现错误'}));
            return;
        }else {

            //console.log(docs);
            //创建响应对象
            var result={};
            result.sta=true;
            result.docs=docs;
            result.year=req.body.year;
            //返回数据
            res.end(JSON.stringify(result));

            console.log("dayinglo",result.docs);

        }
    });




});

//第一次获取年份和类型的信息集合
staticstic_router.post('/sele_by_year/type/first',function(req,res,next){
    //获取从客户端传来的参数，进行合成查询参数
    var conditions={record_year:req.body.year,type:req.body.type,user_id:req.session.user_name};
    var field={type:1,record_time:1,record_money:1,_id:0};
    //要查询的数量
    var first_max_num=req.body.first_max_num;
    var options={limit:parseInt(first_max_num,10)};
    //查询数据库，从第0条到第first_max_num条的记录
    record_handler.find(conditions,field,options,function(err,docs){
        if(err){
            res.end(JSON.stringify({sta:false,err:'数据库操作出现错误'}));
            return;
        }else {

            //console.log(docs);
            //创建响应对象
            var result={};
            result.sta=true;
            result.docs=docs;
            result.year=req.body.year;
            //返回数据
            res.end(JSON.stringify(result));

        }


    });


});


//------------------------------------------------------以下为按月份查询的请求的处理程序。----
staticstic_router.post('/sele_by_month',function(req,res,next){
    //获取参数，年份和月份
    sele_bymonth(req,res,next,parseInt(req.body.year,10),parseInt(req.body.month,10));


});
//根据年份和月份，还有income类型来查找信息集合
staticstic_router.post('/sele_by_month/income',function(req,res,next){
    //该函数里面有响应
    sele_bymonth_and_income(req,res,next,parseInt(req.body.year,10),parseInt(req.body.month,10),req.body._id)

});

//根据年份，月份和type类型来查找信息集合
staticstic_router.post('/sele_by_month/type',function(req,res,next){
    //获取年份和类型（此处是客户端_id的字段传参）
    //查询条件
    var conditions={record_year:parseInt(req.body.year,10),
        record_month:parseInt(req.body.month,10),type:req.body.type,
        user_id:req.session.user_name};
    var field={type:1,record_time:1,record_money:1,_id:0};
    //console.log(conditions);
    var options={skip:parseInt(req.body.record_index,10),limit:5};

    record_handler.find(conditions,field,options,function(err,docs){
        if(err){
            res.end(JSON.stringify({sta:false,err:'数据库操作出现错误'}));
            return;
        }else {

            //console.log(docs);
            //创建响应对象
            var result={};
            result.sta=true;
            result.docs=docs;
            result.year=req.body.year;
            result.months=req.body.month;
            console.log(result);
            //返回数据
            res.end(JSON.stringify(result));

        }


    });


});


//第一次获取根据年份，月份和类型的信息集合
staticstic_router.post('/sele_by_month/type/first',function(req,res,next){
    //获取年份和类型（此处是客户端_id的字段传参）
    //查询条件
    var conditions={record_year:parseInt(req.body.year,10),
        record_month:parseInt(req.body.month,10),
        type:req.body.type,
        user_id:req.session.user_name};
    var field={type:1,record_time:1,record_money:1,_id:0};
    console.log(conditions);
    //要查询的数量
    var first_max_num=req.body.first_max_num;
    var options={limit:parseInt(first_max_num,10)};

    record_handler.find(conditions,field,options,function(err,docs){
        if(err){
            res.end(JSON.stringify({sta:false,err:'数据库操作出现错误'}));
            return;
        }else {

            //console.log(docs);
            //创建响应对象
            var result={};
            result.sta=true;
            result.docs=docs;
            result.year=req.body.year;
            result.months=req.body.month;
            console.log(result);
            //返回数据
            res.end(JSON.stringify(result));

        }


    });


});


//excel下载的请求处理函数---------------
staticstic_router.post("/excel_download",function(req,res,next){

        console.log("进入了Excel下载的处理函数");
        make_excel.init(req,res,next).creat_sheet();


});



//暴露这个函数流
module.exports=staticstic_router;

//根据income做分组查询,根据年份，做分组求和操作
function sele_byyear(req,res,next){
    console.log(req.body.year);
    parseInt(req.body.year,10);
record_handler.aggregate([
    {"$match":{"record_year":parseInt(req.body.year,10)}},
    {"$group":{"_id":"$income",count:{$sum:"$record_money"}}},



    ],
    function(err,docs){
        if(err){
            res.end(JSON.stringify({sta:false,err:'数据库操作出现错误'}));
            return;
        }else {

            //console.log(docs);
            //创建响应对象
            var result={};
            result.sta=true;
            result.docs=docs;
            result.year=req.body.year;
            //返回数据
            console.log(result);
            res.end(JSON.stringify(result));

        }



});


}

//更具年份和income类型，做分组查询
function sele_byyear_and_income(req,res,next,income){

    record_handler.aggregate([
            {"$match":{"record_year":parseInt(req.body.year,10),income:income,user_id:req.session.user_name}},
            {"$group":{"_id":"$type",count:{$sum:"$record_money"}}},
        ],
        function(err,docs){
            if(err){
                res.end(JSON.stringify({sta:false,err:'数据库操作出现错误'}));
                return;
            }else {

                //console.log(docs);
                //创建响应对象
                var result={};
                result.sta=true;
                result.docs=docs;

                result.year=req.body.year;
                //返回数据
                console.log(result);
                res.end(JSON.stringify(result));

            }



        });


}


//-----------根据年份和月份做分组查询,年份和月份的数值要做参数
function sele_bymonth(req,res,next,year,month){
    console.log('先打印年，月的参数试一下先');
    console.log(typeof year,typeof month);
    //数据库操作，并返回
    record_handler.aggregate([
            {"$match":{"record_year":year,record_month:month,user_id:req.session.user_name}},
            {"$group":{"_id":"$income",count:{$sum:"$record_money"}}},



        ],
        function(err,docs){
            if(err){
                res.end(JSON.stringify({sta:false,err:'数据库操作出现错误'}));
                return;
            }else {

                //console.log(docs);
                //创建响应对象
                var result={};
                result.sta=true;
                result.docs=docs;
                console.log(result);
                //返回数据
                res.end(JSON.stringify(result));

            }



        });


}

//根据年份，月份，和income类型来查询数据的请求
function sele_bymonth_and_income(req,res,next,year,month,income){
    console.log('打印一次点击时的传过来的income');
    console.log(income);
    record_handler.aggregate([
            {"$match":{"record_year":year,record_month:month,income:income,user_id:req.session.user_name,user_id:req.session.user_name}},
            {"$group":{"_id":"$type",count:{$sum:"$record_money"}}},



        ],
        function(err,docs){
            if(err){
                res.end(JSON.stringify({sta:false,err:'数据库操作出现错误'}));
                return;
            }else {

                //console.log(docs);
                //创建响应对象
                var result={};
                result.sta=true;
                result.docs=docs;
                //返回数据
                res.end(JSON.stringify(result));

            }



        });


}



