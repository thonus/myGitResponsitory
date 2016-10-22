/**
 * Created by Administrator on 2016/9/27.
 */

var record_handler=require('../models/record_model.js');
var xlsx = require("node-xlsx");
var async=require('async');
var fs = require('fs');

var make_excel={

   //生成Excel的对象数组
    sheet_arr:[],

    //用户名吧，似乎多处用到
    user_id:"tom",

    creat_ok:false,

    //Excel里面有多少个表
    index:0,

    //响应和请求对象
    req:{},

    res:{},

    //对表的第一次操作，这次操作后，对象数组里面就有sheet
    creat_sheet:function(){

        var self=this;

        record_handler.aggregate([
                {"$match":{user_id:self.user_id}},
                {"$group":{"_id":"$type"}},
            ],
            function(err,docs){
                if(err){
                   console/log("出现了错误");
                    return;
                }else {

                   console.log(docs);
                    //逐个将sheet添加进sheet_arr
                    for(var i=0;i<docs.length;i++){
                        var sheet_temp={};
                        sheet_temp.name=docs[i]._id;
                        sheet_temp.data=[];

                        //添加进去sheet数组里面
                        self.sheet_arr.push(sheet_temp);


                    }
                    console.log(self.sheet_arr);
                    self.creat_ok=true;
                    self.fill_sheet(self);




                }



            });



        return this;
    },


    fill_sheet:function(self){
        //var self=this;
        console.log(self.sheet_arr,"--------");
        //循环里面有回调，异步循环，需要用到foreach
        async.forEach(self.sheet_arr,function(element){
            //对每一个element进行操作，查找数据库将信息放入element的数组中

            var conditions={type:element.name,
                user_id:self.user_id};
            var field={type:1,record_time:1,record_money:1,_id:0};
            //console.log(conditions);暂时选择所有
            //var options={skip:parseInt(req.body.record_index,10),limit:5};

            record_handler.find(conditions,field,function(err,docs){
                if(err){
                   console.log('数据库操作出现错误');
                    return;
                }else {

                    //console.log(docs);
                   //逐个将数据写入饿了element的data中

                    for(var i=0;i<docs.length;i++){
                        var final_arr_temp=[];

                        //将docs中的数据写入final_arr_temp
                        final_arr_temp.push(docs[i].type);
                        //不知道这里格式会不会出错----------------------
                        final_arr_temp.push(docs[i].record_time);
                        final_arr_temp.push(docs[i].record_money);

                        element.data.push(final_arr_temp);

                    }

                    //console.log(element.data);

                    //到这里对象构建完成-------------------
                    console.log(self.sheet_arr);

                    //到这里创建Excel表吧
                    var file = xlsx.build(self.sheet_arr);

                    //console.log("excel表中的sheet的长度",self.sheet_arr.length);

                    fs.writeFile('F:/learn/'+self.user_id+'.xlsx', file, 'binary',function(err){
                            if(err){
                                console.log("出现错误了");
                            }else {
                                self.index++;
                                //console.log("要返回下载的数据了",self.index);
                                //此处要做这样的判断，因为Excel表中的每一个子表的写入都会触发一次回调
                                if(self.index==self.sheet_arr.length){
                                    self.res.download('F:/learn/'+self.user_id+'.xlsx');
                                }
                            }


                    });

                    //最后从这里往客户端发送Excel表？？？？？
                    console.log('F:/learn/'+self.user_id+'.xlsx',"-----");
                    //self.res.download('F:/learn/'+self.user_id+'.xlsx');

                    //setTimeout(function(){
                    //    self.res.download('F:/learn/'+self.user_id+'.xlsx');
                    //},2000);



                }


            });



        });




    },


    init:function(req,res,next){
        this.req=req;
        this.res=res;
        this.user_id=req.session.user_name;
        return this;
    }







}

module.exports=make_excel;


//测试。。。。。

//make_excel.creat_sheet();








