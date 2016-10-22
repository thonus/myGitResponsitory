/**
 * Created by Administrator on 2016/9/2.
 */

//数据必须具有指定名称的属性
var data=[
    {data:{startAngle:0,endAngle:0,clr:"#ff0000",innerRadius:10,outerRadius:100},angle:{startAngle:0,endAngle:0.2}},
    {data:{startAngle:0,endAngle:0,clr:"#00ff00",innerRadius:10,outerRadius:100},angle:{startAngle:0.2,endAngle:0.7}},
    {data:{startAngle:0,endAngle:0,clr:"#0000ff",innerRadius:10,outerRadius:100},angle:{startAngle:0.7,endAngle:1.3}},
    {data:{startAngle:0,endAngle:0,clr:"#ffff00",innerRadius:10,outerRadius:100},angle:{startAngle:1.3,endAngle:1.4}},
    {data:{startAngle:0,endAngle:0,clr:"#00ffff",innerRadius:10,outerRadius:100},angle:{startAngle:1.4,endAngle:5}}
];

//画圆饼图的函数
var render = function(){

    //设置svg元素显示区域
    var svg = d3.select("svg")
        .attr({width:600,height:300});

    //创建圆弧构造器
    var arc = d3.svg.arc();

     var result=svg.append("g")
        .attr("transform","translate(200,100)")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path");
    result.style({border:"1px solid black"});
    result.attr("stroke","#000000");

    ////这句绘制扇形，开场动画，的话，是每过几秒就绘制一次？？？？？
    //result.attr("d",function(d){return arc(d);});	//将每个数据使用构造器转化为d属性
    ////给扇形填充颜色
    result.style("fill",function(d){return d.data.clr;});

    //between制作js动画，作为圆饼图的开场
    result.transition().duration(1000).tween("begain",function(d,i){


        return function (t){
            //result.attr("d",function(d){
            //    d.endAngle=d.endAngle+0.5*t;
            //    return arc(d);});
            //打印一下t,看看t到底是什么鬼
            //console.log(t);  //的确是从零到一，t没问题。。。。。
            //先让角度变化
            d.data.startAngle=0+ d.angle.startAngle*t;
            d.data.endAngle=0+ d.angle.endAngle*t;
            d_temp=arc(d.data);

            //再给path添加变化后的d
            this.setAttribute("d",d_temp);

        }

    });

    //使用each加tween试一下是否能完成开场动画js动画
    //result.each(function(d,i){
    //    //d.transition().duration(1000).tween("bigain",function(t){
    //    //    d.endAngle=d.endAngle+0.1*t;
    //    //    d.style("fill",function(d){return d.clr;});
    //    //})
    //    //this指向的是path????ghjhgjhgjhgjhg
    //
    //    d.endAngle=d.endAngle+1;
    //    console.log(d);
    //    var d_temp=arc(d);
    //    this.setAttribute("d",d_temp);
    //
    //
    //
    //});

    result.text(function(d){return d.startAngle});



    //注册事件
    result.on('click',function(d){

        console.log(d);
    });





};
window.onload = function(){
    render();
};
