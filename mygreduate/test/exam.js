/**
 * Created by Administrator on 2016/8/24.
 */


onload=function(){

//获取表单
    var  form=document.getElementsByTagName("form")[0];
    form.onsubmit=function(){
        console.log(this);
        //先获取所有要判断的内容,用户名长度2-20位,只能由数字和字母组成,首字符必须为字母
        var user_name=document.getElementsByName("userName")[0].value;
        if(user_name.length>2 &&user_name.length<20 &&user_name.match(/^[a-zA-Z][a-zA-Z0-9]{1,19}/)){

        }else {
                    console.log("用户名不行");
                    return false;
        }

       //密码可以为如何可见字符,长度为2-20位
        var password=document.getElementsByName("userPwd")[0].value;
        var password_confirm=document.getElementsByName("userPwdConfrim")[0].value;
        console.log(password);
        console.log(password_confirm);
        if(password!=password_confirm || password.length<2 ||password.length>20 ){
                    console.log("密码不行");
                    console.log(password.length!=password_confirm);
                    return false;
        }

        //4.爱好至少选2项
        var hobbits=document.getElementsByName("userLove");
        console.log(hobbits);
        var time=0;
        var final_hb=[];
        for (var key in hobbits){
                    if(hobbits[key].checked){
                        time++;
                        final_hb.push(hobbits[key].value);
                    }

        }

        if(time<2){
                    console.log("爱好不行");
                    return false;
        }
        //籍贯必须有效
        var province=document.getElementsByName("userAddress")[0].value;
        console.log(province);
        if(province=="请选择"){
                     console.log("出生不行");
                     return false;
         }

        //1.用户名长度2-20位,只能由数字和字母组成,首字符必须为字母

        console.log("-------表单提交咯");

    }

}

console.log(Math.random(0,1));

console.log(document);