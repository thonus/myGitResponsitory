/**
 * Created by Administrator on 2016/9/7.
 */
(function($){
    $(function(){

        //给更换头像的头像添加图片....为何获取不到头像里面的url因为获取的时候，
        //所以此处要是想加载头像的话，需要自行ajax请求
        set_userinfo_head();
        //$("article>img:first").prop($('.user>#img_wra>img:first').prop("src"));
        //console.log($('.user>#img_wra>img').prop("src"));

        //添加内容改变事件
        $('#head_up').on('change',function(){
            //提交请求数据
            head_up();

        });

        //添加图片点击事件，触发input
        $("article>span>a:first").on('click',function(){
            console.log('------------');
            console.log($('#head_up'));
            //触发intput file的点击事件
            $('#head_up').trigger('click');
        });

        //确认提交事件
        $("input[type='button']:first").on('click',function(){
            //修改密码事件
            pwd_update();

        });




//一下文档加载结束
    });
})(jQuery);

//ajax提交图片数据
function head_up(){
    console.log($('form:first'));

    var formdata=new FormData(document.getElementsByTagName('form')[0]);
    console.log(formdata);

    //利用ajax上传图片
    $.ajax({
        url: "/userinfo/head_change",
        type: "POST",
        cache: false,
        data:formdata,
        dataType:'json',
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false ,  // 告诉jQuery不要去设置Content-Type请求头
        success: function(data){
            //对返回的数据进行处理
            //result= $.parseJSON(data);

            if(data.sta){
                console.log('上传成功了-----');
                $('.user>#img_wra>img').prop({src:data.url});

                //也给中间的头像换头像
                $("article>span>img:first").prop({src:data.url});
            }else {
                console.log('上传shibai了-----');
                //tips('上传失败','red');

                tip.tip_err('上传失败');
                console.log("shangcshibaile ");
            }

        }
    });


}


//定义一个修改密码事件函数
function pwd_update(){
    var pwd_fir=$("input[type='password']:first").val();
    var pwd_se=$("input[type='password']:eq(1)").val();
    var pwd_thir=$("input[type='password']:eq(2)").val();
    if(pwd_se==null||pwd_se!=pwd_thir){
        //tips("密码为空或两次输入不一致",'red');
        tip.tip_err("密码为空或两次输入不一致");
        return;
    }else if(pwd_fir==null){
        //tips("密码为空",'red');
        tip.tip_err("密码为空");
        return;
    }else {
        //这里进行修改密码的请求
        $.post('/userinfo/pwd_update',{pwd:pwd_fir,new_pwd:pwd_se},function(data){
            if(data.sta){
                //tips('修改成功','green');
                tip.tip_ok('修改成功');
                console.log("修改信息成功");
                //将输入框的数据清零
                $("input[type='password']:first").val('');
                $("input[type='password']:eq(1)").val('');
                $("input[type='password']:eq(2)").val('');
            }else {
                //tips(data.err,'green');
                tip.tip_err(data.err);
            }


        },'json');




    }


}


//定义一个函数，从服务器获取头像，并放入头像中
function set_userinfo_head(){
    $.post('/head',function(data){
        if(data.sta){
            //将路径放入图像中
            $("article>span>img:first").prop({src:data.url});
        }else{

        }

    },'json');


}










