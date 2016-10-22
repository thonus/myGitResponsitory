/**
 * Created by Administrator on 2016/8/26.
 */

//这个提示消息的js模块，是要用到awesome字体的，所以页面用到的时候需要引入awesome字体
//创建提示消息弹出的事件，基于jquery


//暴露这个方法,两个参数，一个是显示的文字，一个是文字的颜色
function tips(text,font_color) {
  console.log("跑了tip模块");
//创建一个<p>对象,自动添加到body中
    var $p = $("<p> id='huguhg'></p>").appendTo("body");


//设置p的样式

    $p.css({
        color: font_color,
        position: "fixed",
        "left": "50vw",
        "top": "50vh",
        "font-weight":"bold",
        "z-index":"3",
        "font-size":"20px",
        opacity:0

    });

    //设置p的过渡


//设置p的文字内容
    $p.text(text);

//淡入,jquery的自定义动画函数
    $p.animate({opacity:1},"fast").animate({opacity:0},"fast",function(){
        //这句。。。。
        this.remove();
    });
}



//创建一个提示对象模块，
var tip={
    //提示的文字
    text:"正在加载，请稍候。。。",

    //放置提示消息的p对象
    p_ob:$("<p><i></i></p>"),
    //放置awesome图标的i元素
    i_ob:$("<i></i>"),
    //放置提示消息的变量
    span_ob:$("<span></span>"),
    //一个标识变量，检测，是否第一次调用，检测i_ob是否在p_ob里面
    is_init:false,


    //创造p标签的函数
    create:function(){
        var self=this;

        //设置p_ob的样式
        this.p_ob.css({
            //"color": grey,
            position: "fixed",
            "left": "50vw",
            "top": "50vh",
            "font-weight":"bold",
            "z-index":"3",
            "font-size":"20px",
            "display":"none",
            "background-color":"#c6c6c6",
            "padding":"1rem 1rem",
            "border-radius":"1rem"


            //"border-radius":"10%"


        });

        //将房awesome图标的i标签添加到p中

        //this.p_ob.prepend(this.i_ob);
        //this.i_ob.appendTo(this.p_ob);

        //添加到文档流中，最后执行
        this.p_ob.appendTo("body");
        this.i_ob.appendTo(self.p_ob);
        this.span_ob.appendTo(self.p_ob);

        //将初始化的标识设置为true
        this.is_init=true;


    },

    //显示正在加载提示的方法
    on_lis_tip:function(){
        var self=this;
        //判断是否已经初始化，如果没有则先初始化
        if(!this.is_init){
            this.create();
            console.log("已经初始化了");
        }

        //给放图标的i添加awesome的图标的类
        this.i_ob.addClass("icon-spinner",function(){
            //加载了提示图标后才做其他的不能写在回调函数里面，不然请求都响应了
            //设置提示文本
            //self.p_ob.text(this.text);
            //
            ////将其设置为可见
            //self.p_ob.css({"display":"block"});
            //console.log('已经设置可见了');
        });

        //设置提示文本
        self.span_ob.text(this.text);

        //将其设置为可见
        self.p_ob.css({"display":"block"});





    },

    //加载完成的提示信息
    tip_ok:function(tips){
        var self=this;
        this.on_lis_tip();
        //用jquery的animate自定义动画，之前有一个过渡(旋转一秒)
        setTimeout(function(){
            //将提示信息，拿进来先，要先更换图标，再更改提示信息
            //this.p_ob.text(tips);
            //跟换图标类，删除原先的图标先(删除所有类)，再添加图标类
            self.i_ob.removeClass();
            //添加i的图标类
            self.i_ob.addClass("icon-ok");
            //修改p_ob的文本信息。。。不知道这个回调函数执行时，还在不在tips的作用域
            self.span_ob.text(tips);
            //慢慢消失的提示消息，
            self.p_ob.fadeOut(1000);
            console.log('进入了，删除class的回调');


        },500);






    },

    //加载失败的提示信息,加载失败和加载成功的区别就是图标和文字不一样么
    tip_err:function(tips){
        var self=this;
        this.on_lis_tip();

        setTimeout(function(){
            //将提示信息，拿进来先，要先更换图标，再更改提示信息
            //this.p_ob.text(tips);
            //跟换图标类，删除原先的图标先(删除所有类)，再添加图标类
            self.i_ob.removeClass();

            //添加i的图标类,正在加载的样式
            self.i_ob.addClass("icon-remove");
            //修改p_ob的文本信息。。。不知道这个回调函数执行时，还在不在tips的作用域
            self.span_ob.text(tips);
            //慢慢消失的提示消息，
            self.p_ob.fadeOut(1000,function(){


            });

        },500);



    }


}









