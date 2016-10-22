/**
 * Created by Administrator on 2016/9/23.
 */

//创建一个瀑布流对象,由于我的这个的瀑布流，在搜索查看过程中，数据不会有变化
    //所以，不需要唯一的标识，可以用索引，也不需要用到总数
var water_fall={

    //所加载的索引
    recoed_index:0,
    //是否加载完成的标识
    load_finish:false,
    //查找数据库的条件-------这个初始化的时候需要被赋值，作为参数
    conditions:{},
    //请求的地址-------这个初始化的时候需啊哟被赋值，关于这个地址的中间件，服务器有的判断
    url:"/statistic/sele_by_year/type",
    //初次加载可以加载行的数量
    first_max_num:1,

    //加载数据的方法，每次加载多条
    append:function(){
        console.log(this.recoed_index);
        //先创建引用，后面用的到
        var self=this;
        //正在加载的时候不能再触发加载的方法，所以给load_finish先设为true先
        this.load_finish=true;
        //从数据库中拿信息，要将当前的索引传给服务器
         //先将索引添加进参数中
        this.conditions.record_index=this.recoed_index;
        //这个函数一出去，接下来就看服务器的了，，，其实服务器还是有大的改动，
        // 需要多返回一个标识符，用老标识，是否加载完成
        //似乎这里的地址需要修改，服务器端也是需要再多一个返回的额参数
        //服务器还需要多一个判断，如果索引为0的话，就是第一次加载，第一次要加载多少数据？？？
        $.post(self.url,self.conditions,function(data){
            //这个请求暂时不做错误判断
            //这里又show_table变为append了，所以需要，往后面添加信息，但是
            //但是因为showtable会清除之前的信息，所以showtable需要修改，将清除信息，放在初始化吧
            var coll=data.docs;
            console.log(data.docs);
            for(var i=0;i<coll.length;i++){
                self.insert_to_table(coll[i].type,coll[i].record_time,coll[i].record_money);
                //索引要加一
                self.recoed_index++;
            }

            //循环信息添加结束之后，判断对是否加载完成的设置
            if(coll.length<5){
                console.log(self.load_finish);
            }else {
                //如果没有加载完所有数据的话，将标识符设为false
                self.load_finish=false;
            }

            //console.log(data);
        },'json');
        //这个返回值，只是一个引用，所以这个返回值，可以不用考虑回调函数是否执行完吧？？？？
        return this;
    },

    //将一条数据添加进表格的方法
    insert_to_table:function(type,record_time,record_money){
        //创建tr
        $tr=$("<tr></tr>");
        //依次加入tr中
        $tr.append("<td>"+type+"</td>>");
        $tr.append("<td>"+record_time+"</td>>");
        $tr.append("<td>"+record_money+"</td>>");

        //将tr添加到表格中
        $("table:first").append($tr);

    },


    //滚动事件
    scroll:function(){
        var self=this;
        //存放记录详情的section的滚动事件
        $(".record_section:first").on('scroll',function(){

            //先指定刷新的点吧，当表格里面最后一行距离记录详情的section
            // 的距离（offsetTop,父类要定位）为section的clientHeight的时候，
            // 往流后面添加记录，当然，还要判断是否加载完成，所有数据加载完成就不加载了

            //var last_tr_offTop=$("table:first>tbody>tr:last").offset().top;

            //由于offsetTop在各大浏览器中的表现不一致，而且这里使用offset似乎并不能实现，
            // 所以，流的加载点的判断，需要另寻路径
            //var last_tr_offTop=$("table:first>tbody>tr:last").get(0).offsetTop;
            //console.log($("table:first>tbody>tr:last").get(0).offsetParent);
            //console.log(last_tr_offTop,$(".record_section:first").innerHeight());

            //section的高度，减去滚动距离在减去clientHeight的值
            var re_sec=$(".record_section:first").get(0);
            var bottom_hid_dis=re_sec.scrollHeight-re_sec.scrollTop-re_sec.clientHeight;
            //console.log(bottom_hid_dis,$("table:first tr").outerHeight());
            if(!self.load_finish && bottom_hid_dis<$("table:first tr").outerHeight()){
                console.log("触发了流加载的事件");
                //触发了加载数据的条件
                self.append();
            }

        });

        return this;
    },



    //第一次加载的时候的时候，记得清除表格信息。。。。。。。。。
    //var creat=fun
    create:function(){
        var self=this;
        //先清除表格里面的信息,表格里面不是第一条的tr，删掉
        $(".record_section:first>table:first>tbody:first>tr:not(:first)").remove();
        //计算当前的section能存放多少条数据
        this.first_max_num=Math.ceil($(".record_section:first").innerHeight() / $(".record_section:first>table:first>tbody:first>tr:first").innerHeight());

        console.log("打印看看，clientHeight是否带单位",$(".record_section:first").innerHeight());
        console.log("先打印初次请求最大的行数",this.first_max_num);
        //根据url生成第一次请求的url
        var url_first=this.url+"/first";
        this.conditions.first_max_num=this.first_max_num;
        //请求数据
        $.post(url_first,this.conditions,function(data){


            var coll=data.docs;
            console.log('打印data.docs',coll);
            for(var i=0;i<coll.length;i++){
                self.insert_to_table(coll[i].type,coll[i].record_time,coll[i].record_money);
                //索引要加一
                self.recoed_index++;
            }

            //判断所有数据是否加载完成，如果加载完成，将变量load_finish设为true
            if(coll.length<self.first_max_num){
                self.load_finish=true;
            }

        },'json');

        //回调函数，对this没影响吧。。。。。能不能return，return对前面的回调函数应该没有影响吧
        return this;
    },

    //初始化瀑布流
    init:function(url,conditions){
        //先将参数初始化
        this.conditions=conditions;
        this.url=url;
        this.recoed_index=0;
        this.load_finish=false;
        //创建瀑布流，初始化之后，监听滚动
        this.create().scroll();
    }


}





