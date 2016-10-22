/**
 * Created by Administrator on 2016/9/5.
 */
//自运行的匿名函数
(function($){
    $(function(){
        /*给用户名添加失去焦点的事件*/
        $("input[type='text']:first").on('blur',function(){
            console.log("用户名输入框失去了焦点");
            user_name_test(do_nothing);
        });
        /*给按钮添加点击事件*/
        $("input[type='button']:first").on('click',function(){

            //如果三个的格式正确则提交信息,如果验证正确，而且用户名不冲突的话，则注册
            var name=$("input[type='text']:first").val();
            var pwd_f=$("input[type='password']:first").val();
            var pwd_s=$("input[type='password']:last").val();
            //这里还差一个用户名的正则匹配
            if(pwd_f==pwd_s&&pwd_f!=null&&name.match(/^[a-zA-Z][a-zA-Z0-9]{1,19}/)){
                user_name_test(final_sub);
            }else {
                //tips('密码不匹配，或用户名格式错误',"red");
                //提示信息升级
                //tip.tip_err('密码不匹配，或用户名格式错误');
                tip.tip_err('密码不匹配，或用户名格式错误');
            }



        });




    });
})(jQuery);


function user_name_test(callback) {
//定义一个用户名失去焦点后的事件，请求判断是否存在该用户
    if($("input[type='text']:first").val().match(/^[a-zA-Z][a-zA-Z0-9]{1,19}/)){

            $.post('/register/user_name', {user_name: $("input[type='text']:first").val()}, function (data) {
                if (data.sta) {
                    callback();
                } else {
                    //tips(data.err, "red");
                    tip.tip_err(data.err);
                }


            }, 'json');
    }else {
        //tips("输入的格式错误","red");
        tip.tip_err("输入的格式错误");
    }

}

//定义一个什么都不做的函数
function do_nothing(){
    return;
}

//定义一个提交注册信息的函数
function final_sub(){
    var para={user_name:$("input[type='text']:first").val(),pwd:$("input[type='password']:first").val()};
    console.log(para);
    $.post('/register/final_sub',para,function(data){
        if(data.sta){
            //注册成功重定向到返回的地址
            console.log(data);
            window.location.href=data.url;

        }else {
            //tips(data.err,"red");
            tip.tip_err(data.err);
        }

    },'json');


}

