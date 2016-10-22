/**
 * Created by Administrator on 2016/9/6.
 */
(function ($){
    $(function(){
        //文档加载完的事件可以愉快地在这里

        //用户头像点击事件
        $('.user:first').on('click',function(event){
            console.log('进入了头像点击事件');

            //判断导航栏的状态，如果显示，隐藏，如果隐藏就显示
            if($('.reco_add:first').attr("_sta")=="off"){
                console.log($('.reco_add:first').attr("_sta"));
                nav_on();
            }else {
                console.log($('.reco_add:first').attr("_sta"));
                nav_off();
            }
            //阻止事件冒泡
            event.stopPropagation();



        });
        //给body添加点击事件，如果点击则隐藏导航
        $('body').on('click',function(){
            if($('.reco_add:first').attr("_sta")=="on"){
                nav_off();
            }

        });

        //调用函数，设置头像
        set_head();

        //退出登录
        $('#out_img').on('click',function(event){
            $.get('/head/exit',function(data){

                window.location.href=data.url;
            },'json');


            //阻止事件冒泡
            event.stopPropagation();

        });



//------------文档加载分界线-----------
     });
})(jQuery);


//定义记账导航的动画函数-------------
function reco_add_on(){
    console.log('进入了记账导航动画函数');
    $('.reco_add:first').css({animation:"reco_add_on 0.5s ease-in-out forwards"});
    $('.reco_add:first').attr({_sta:"on"});

}
//消失
function reco_add_off(){
    $('.reco_add:first').css({animation:"reco_add_off 0.5s ease-in-out forwards"});
    $('.reco_add:first').attr({_sta:"off"});
}

//定义记账导航的动画函数-------------
function to_statistic_on(){
    $('.to_statistic:first').css({animation:"to_statistic_on 0.5s ease-in-out forwards"});

}
//消失
function to_statistic_off(){
    $('.to_statistic:first').css({animation:"to_statistic_off 0.5s ease-in-out forwards"});

}

//定义用户详情导航动画的函数
function to_userinfo_on(){
    $('.to_userinfo:first').css({animation:"to_userinfo_on 0.5s ease-in-out forwards"});

}

//消失

function to_userinfo_off(){
    $('.to_userinfo:first').css({animation:"to_userinfo_off 0.5s ease-in-out forwards"});

}

//导航出现的函数
function nav_on(){
    to_userinfo_on();
    //setTimeout(to_statistic_on,250)
    //setTimeout(reco_add_on,500)

   to_statistic_on();
    reco_add_on();

}

//导航消失动画
function nav_off(){
    reco_add_off();
    //setTimeout(to_statistic_off,250);
    //setTimeout(to_userinfo_off,500);

    to_statistic_off();
    to_userinfo_off();

}

//定义一个函数，从服务器获取头像，并放入头像中
function set_head(){
    $.post('/head',function(data){
        if(data.sta){
            //将路径放入图像中
            $('.user>#img_wra>img').prop({src:data.url});
        }else{

        }

    },'json');


}





