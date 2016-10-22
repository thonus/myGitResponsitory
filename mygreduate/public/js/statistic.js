//消除其他插件也使用$所带来的冲突
(function($) {
    //文档加载完成后的事件
    $(function(){

        $(".wrap>nav>div:first").css({"backgroundColor":"#eeeaff",color:"#107360"});
        sele_by_year(2016);
        //给年统计按钮添加事件
        $(".wrap>nav>div:first").on('click',function(){sele_by_year(2016);
            $(".wrap>nav>div:first").css({"backgroundColor":"#eeeaff",color:"#107360"});
            $(".wrap>nav>div:eq(1)").css({"background-color":"",color:""});
            $(".wrap>nav>div:eq(2)").css({"background-color":"",color:""});
        });
        //给月统计添加按钮点击事件
        $(".wrap>nav>div:eq(1)").on('click',function(){sele_by_month(2016,8);
             console.log('进入了月统计点击函数');
            $(".wrap>nav>div:eq(1)").css({"background-color":"#eeeaff",color:"#107360"});
            $(".wrap>nav>div:first").css({"background-color":"",color:""});
            $(".wrap>nav>div:eq(2)").css({"background-color":"",color:""});
        });

        //给预测按钮添加点击事件
        $(".wrap>nav>div:eq(2)").on('click',function(){
            //绘制预测图

            //按钮颜色的改变
            $(".wrap>nav>div:eq(2)").css({"background-color":"#eeeaff",color:"#107360"});
            $(".wrap>nav>div:eq(1)").css({"background-color":"",color:""});
            $(".wrap>nav>div:first").css({"background-color":"",color:""});

            //导出按钮，触发下载事件
            onload_excel();
        });



    });


})(jQuery);

//定义一个存放颜色的数组，因为后面的圆弧要用到这些颜色，颜色不能随机生成
var global_color=['#ffd775','#ffa786','#ff7ac1','#a37dff','#7ec4ff','#85ffab',
                    '#d9ff5a','#8f3dff','#1cff76','#ff7d23','#ff0c87'];


//从服务器获取某个年份的收入和支出的记录

function sele_by_year(year){
    console.log('------------打印year');
    console.log(year);
    $.post("/statistic/sele_by_year",{year:year},function(data){
        console.log(data.docs);
        if(data.sta){
            //如果返回信息，则绘制圆饼图
            //首先生成绘图所需要的集合
            render(create_colle_by_result(data.docs),parseInt(data.year,10));
            console.log(parseInt(data.year,10));
            console.log('要打印回调函数中的year咯');
            console.log(typeof year);

        }else {
            //出现错误，
            tips(data.err,"red");
            console.log("出现了错误,服务器返回了一个错误");
        }


    },'json');

}

//根据返回的数据生成绘制圆弧所需要的参数的集合？？？？这个函数不需要区分年统计和月统计
function create_colle_by_result(coll){
    //先创建一个目标集合data，用来存放结果
    var  data=[];
    //先循环一次计算出总金额
    var money_sum=0;
    for(var i=0;i<coll.length;i++){
        money_sum=money_sum+coll[i].count;
    }
    //再循环，创建参数对象，并放入data中
    var obj_temp={};
    var angle_temp=0;
    for(var i=0;i<coll.length;i++){
        //每一次循环，都需要对obj_temp重新赋值
        obj_temp={data:{startAngle:0,endAngle:0,clr:"#ff0000",innerRadius:10,outerRadius:130}}
          //对颜色进行赋值
        obj_temp.data.clr=global_color[i];
        //给临时的角度和对象变量进行赋值

        obj_temp.infos=coll[i];
        obj_temp.infos.startAngle=angle_temp;
        obj_temp.infos.endAngle=angle_temp+(coll[i].count/money_sum) * 6.2831855 ;
        angle_temp=obj_temp.infos.endAngle;

        //将对象放入目标集合中
        data.push(obj_temp);
        console.log(obj_temp);

    }

    //console.log(data);
    //返回目标集合
    return data;
}

//根据集合信息绘制圆饼图，第一层级绘图，绘制一级圆饼图-------这个需要区分年和月统计(调用的不一样)
function render(data,year){
    //不管三七，先清除子元素
    svg_clear();
    //然后让图表显示
    circle_show();

    //设置svg元素显示区域
    var svg = d3.select("svg");

    //创建圆弧构造器
    var arc = d3.svg.arc();

    //添加绘制扇形的路劲,其中的transform是定义动画的起点??????
    var result=svg.append("g")
        .attr("transform","translate(170,200)")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path");
    //给线条添加颜色
    result.attr("stroke","#000000");

    //给扇形填充颜色
    result.style("fill",function(d){return d.data.clr;});
    //between制作js动画，作为圆饼图的开场
    result.transition().duration(1000).tween("begain",function(d,i){
            return function (t){

                            d.data.startAngle=0+ d.infos.startAngle*t;
                            d.data.endAngle=0+ d.infos.endAngle*t;
                            d_temp=arc(d.data);

                            //再给path添加变化后的d
                            this.setAttribute("d",d_temp);

            }

    });

    //注册鼠标移上去显示信息的事件
    result.on('mousemove',function(d){
        show_tips(d);

    });

    //注册鼠标移出的事件
    result.on('mouseout',function(d){
        $(".create_tips:first").css({"display":""});

    });
    //这里需要区分年，月统计------------
    //注册点击事件,这里要根据不同的圆饼图注册不同的信息----------------------这里引出二级圆饼图

    //renderz中打印参数看看
    console.log('renderz中打印参数看看');
    console.log(typeof year);
    result.on('click',function(d){
        console.log("触发了点击事件");
        //如何判断，是年统计还是月统计 d中是无法统计的，因为d中的是绘图信息
        console.log('一级渲染给一级点击事件传参');
        console.log(year);
        first_cirdle_cli(d,year);

        console.log(d);
    });




}

//一级圆饼图点击事件，--------------这里需要区分年月统计
function first_cirdle_cli(d,year){
    //信息框要隐藏
    $(".create_tips:first").css({"display":""});
    //获取当前的时间参数2016
    console.log('一级圆饼图点击函数');
    console.log(year);
    //从服务器获取某年，收入或支出类型的统计数据
    $.post('/statistic/sele_by_year/income',{year:year,_id: d.infos._id},function(data){
        if(data.sta){
            //如果返回信息，则绘制二级圆饼图


            //首先生成绘图所需要的集合,,,,添加的监听事件此处的事件不一样
            render_second(create_colle_by_result(data.docs),data.year);

        }else {
            //出现错误，
            tips(data.err,"red");
            console.log("出现了错误,服务器返回了一个错误");
        }

    },'json');

}


//定义一个函数用来创建显示信息的div
function show_tips(d){
    //显示
    $(".create_tips:first").show();
    //$(".create_tips:first").css({"display":"block"});
    //设置div的样式,位置,减去提示框的宽度再减10
    //获取提示框的宽高
    $(".create_tips").width();
    $(".create_tips:first").css({"left":d3.event.pageX-$(".create_tips").width()-20,"top":d3.event.pageY-20-$(".create_tips").height()});
    //设置两个p的内容
    $(".create_tips:first>p:first").text(d.infos._id);
    $(".create_tips:first>p:last").text(d.infos.count);


}

//清除圆饼图
function svg_clear(){
    $("svg:first").empty();

}


//绘制二级圆饼图
function  render_second(data,year){
    //先清除一级圆饼图
    svg_clear();
    //设置svg元素显示区域
    var svg = d3.select("svg");

    //创建圆弧构造器
    var arc = d3.svg.arc();

    //添加绘制扇形的路劲,其中的transform是定义动画的起点??????
    var result=svg.append("g")
        .attr("transform","translate(170,200)")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path");
    //给线条添加颜色
    result.attr("stroke","#000000");

    //给扇形填充颜色
    result.style("fill",function(d){return d.data.clr;});
    //between制作js动画，作为圆饼图的开场
    result.transition().duration(1000).tween("begain",function(d,i){
        return function (t){

            d.data.startAngle=0+ d.infos.startAngle*t;
            d.data.endAngle=0+ d.infos.endAngle*t;
            d_temp=arc(d.data);

            //再给path添加变化后的d
            this.setAttribute("d",d_temp);

        }

    });

    //注册鼠标移上去显示信息的事件
    result.on('mousemove',function(d){
        show_tips(d);

    });

    //注册鼠标移出的事件
    result.on('mouseout',function(d){
        $(".create_tips:first").css({"display":""});

    });

    //这里是二级圆饼图的点击事件，这里应该显示具体的记录详情------------------------
    result.on('click',function(d){
        second_cirdle_cli(d,year);
        console.log(d);
    });


}

//二级圆饼图点击事件----------这个需要区分年，月统计
function second_cirdle_cli(d,year){
    //二级点击事件图表要隐藏
    circle_hide();
    //信息框要隐藏
    $(".create_tips:first").css({"display":""});

    //向服务器请求数据，并将数据插入表格中，需要的参数是，只包含类型，时间和金额的集合
    //需要的参数，年份，type(此处是_id)
    //$.post("/statistic/sele_by_year/type",{year:year,type: d.infos._id},function(data){
    //    //这个请求暂时不做错误判断
    //    show_table(data.docs);
    //    console.log(data);
    //},'json');

    //用瀑布流，代替普通显示
    var conditions={year:year,type: d.infos._id};
    water_fall.init("/statistic/sele_by_year/type",conditions);



}

//根据集合，将记录信息放入表格中
function show_table(coll){
    //根据集合，将数据插入表格中
    console.log('来到了show_table中');
    console.log(coll.length);
    console.log(typeof coll);
    //先要清除所有的非第一行的内容
    //$(".record_section:first>table:not(:first)").remove();
    $(".record_section:first>table:first>tbody:first>tr:not(:first)").remove();
    //console.log($(".record_section:first>table:first>tbody:first>tr:not(:first)"));
    //$(".record_section:first>table:first").empty();

    for(var i=0;i<coll.length;i++){
        insert_to_table(coll[i].type,coll[i].record_time,coll[i].record_money);

    }


}

//根据类型，时间金额创建tr元素并插入表格中
function insert_to_table(type,record_time,record_money){
    //创建tr
    $tr=$("<tr></tr>");
    //依次加入tr中
    $tr.append("<td>"+type+"</td>>");
    $tr.append("<td>"+record_time+"</td>>");
    $tr.append("<td>"+record_money+"</td>>");

    //将tr添加到表格中
    $("table:first").append($tr);


}


//------------------------------------------------此处之后就是按月统计的函数-----------------------------
//按月统计生成一级圆饼图
function sele_by_month(year,month){
    $.post('/statistic/sele_by_month',{year:year,month:month},function(data){
        //根据返回的集合，加到圆饼图中去
        if(data.sta){
            //如果返回信息，则绘制圆饼图
            //首先生成绘图所需要的集合???????要区分年统计和月统计
            console.log('打印月份统计一次绘制，的参数');
            console.log(typeof year);
            month_render(create_colle_by_result(data.docs),year,month);

        }else {
            //出现错误，
            tips(data.err,"red");
            console.log("出现了错误,服务器返回了一个错误");
        }


    },'json');

}

//月份统计一级圆饼图的点击事件
function month_first_cirdle_cli(d,year,month){
    //信息框要隐藏
    $(".create_tips:first").css({"display":""});
    //获取当前的时间参数2016

    //从服务器获取某年，收入或支出类型的统计数据
    $.post('/statistic/sele_by_month/income',{year:year,month:month,_id: d.infos._id},function(data){
        if(data.sta){
            //如果返回信息，则绘制二级圆饼图


            //首先生成绘图所需要的集合,,,,添加的监听事件此处的事件不一样
            month_render_second(create_colle_by_result(data.docs),year,month);

        }else {
            //出现错误，
            tips(data.err,"red");
            console.log("出现了错误,服务器返回了一个错误");
        }

    },'json');

}

//月统计二级圆饼图的点击事件
function month_second_cirdle_cli(d,year,month){
    //二级点击事件图表要隐藏
    circle_hide();
    //信息框要隐藏
    $(".create_tips:first").css({"display":""});

    //向服务器请求数据，并将数据插入表格中，需要的参数是，只包含类型，时间和金额的集合
    //需要的参数，年份，type(此处是_id)
    //将参数放进对象里面,为转化成瀑布流做准备
    var conditions={year:year,month:month,type: d.infos._id};

    //调用初始化瀑布流,需要参数------这里按照年月来查询信息的
    water_fall.init("/statistic/sele_by_month/type",conditions);



    //$.post("/statistic/sele_by_month/type",{year:year,month:month,type: d.infos._id},function(data){
    //    //这个求情暂时不做错误判断
    //    show_table(data.docs);
    //    console.log(data);
    //},'json');


}

//。。。。。。render函数也要写两遍，以区分年月
function month_render(data,year,month){
    //不管三七，先清除子元素
    svg_clear();
    //然后让图表显示
    circle_show();

    //设置svg元素显示区域
    var svg = d3.select("svg");

    //创建圆弧构造器
    var arc = d3.svg.arc();

    //添加绘制扇形的路劲,其中的transform是定义动画的起点??????
    var result=svg.append("g")
        .attr("transform","translate(170,200)")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path");
    //给线条添加颜色
    result.attr("stroke","#000000");

    //给扇形填充颜色
    result.style("fill",function(d){return d.data.clr;});
    //between制作js动画，作为圆饼图的开场
    result.transition().duration(1000).tween("begain",function(d,i){
        return function (t){

            d.data.startAngle=0+ d.infos.startAngle*t;
            d.data.endAngle=0+ d.infos.endAngle*t;
            d_temp=arc(d.data);

            //再给path添加变化后的d
            this.setAttribute("d",d_temp);

        }

    });

    //注册鼠标移上去显示信息的事件
    result.on('mousemove',function(d){
        show_tips(d);

    });

    //注册鼠标移出的事件
    result.on('mouseout',function(d){
        $(".create_tips:first").css({"display":""});

    });
    //这里需要区分年，月统计------------
    //注册点击事件,这里要根据不同的圆饼图注册不同的信息----------------------这里引出二级圆饼图
    result.on('click',function(d){
        console.log("触发了点击事件");
        //如何判断，是年统计还是月统计 d中是无法统计的，因为d中的是绘图信息
        month_first_cirdle_cli(d,year,month);

        console.log(d);
    });

}

//所以第二次绘图也需要重写，以区分月份
function  month_render_second(data,year,month){
    //先清除一级圆饼图
    svg_clear();
    //设置svg元素显示区域
    var svg = d3.select("svg");

    //创建圆弧构造器
    var arc = d3.svg.arc();

    //添加绘制扇形的路劲,其中的transform是定义动画的起点??????
    var result=svg.append("g")
        .attr("transform","translate(170,200)")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path");
    //给线条添加颜色
    result.attr("stroke","#000000");

    //给扇形填充颜色
    result.style("fill",function(d){return d.data.clr;});
    //between制作js动画，作为圆饼图的开场
    result.transition().duration(1000).tween("begain",function(d,i){
        return function (t){

            d.data.startAngle=0+ d.infos.startAngle*t;
            d.data.endAngle=0+ d.infos.endAngle*t;
            d_temp=arc(d.data);

            //再给path添加变化后的d
            this.setAttribute("d",d_temp);

        }

    });

    //注册鼠标移上去显示信息的事件
    result.on('mousemove',function(d){
        show_tips(d);

    });

    //注册鼠标移出的事件
    result.on('mouseout',function(d){
        $(".create_tips:first").css({"display":""});

    });

    //这里是二级圆饼图的点击事件，这里应该显示具体的记录详情------------------------
    result.on('click',function(d){
        month_second_cirdle_cli(d,year,month);
        console.log(d);
    });


}


//定义一个表格隐藏，圆饼显示函数
function circle_show(){
    $(".record_section:first").hide();
    $('.staSection:first').show();

}

//定义一个，圆饼图
function circle_hide(){
    $(".record_section:first").show();
    $('.staSection:first').hide();

}

//下载事件
function onload_excel(){
    var form = $("<form></form>");   //定义一个form表单
    form.attr('style', 'display:none');   //在form表单中添加查询参数
    //form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', "/statistic/excel_download");

    $("body").append(form);//将表单放置在web中

    form.submit();//表单提交




}



