onload=function(){
	
	//获取一次图片的分辨率（宽高比值）
	var ratio=document.getElementById("bgImg").offsetWidth/document.getElementById("bgImg").offsetHeight
	ratio=ratio.toFixed(4);
//	console.info(ratio);
	
	setBgImg(ratio);
	
	//当body大小该变得时候触发事件

	document.body.onresize=function(){
		
//		console.info("body的onresize事件触发了");
		  setBgImg(ratio);
	}
	//账号输入框失去焦点事件
	$("#inputText").blur(function(){
         //向服务器发送数据
        console.log($("#inputText").val());
		$.post("/login/username",{"user_name" : $("#inputText").val()},function(data){

			if(data.ex){
				$("#tipIcon").css({display:""});
				$("#tipText").text("");
			}else {

			  $("#tipIcon").css({display:"inline-block"});
              $("#tipText").text("不存在此用户");
			}

		},"json");

	});

	//提交事件
	$("form:first").submit(function () {

    return false;
	} );


	//给submit按钮添加事件
	$("#btnsub").on("click",function(){

		//先让两个输入框失去焦点,为何按下确认键和点击按钮效果不一样（因为点击按钮失去焦点事件触发了两次）
		//$("#inputText").blur();
		//判断是否进行验证（账号正确，密码不为空，则验证）
        if($("#tipText").text()!='不存在此用户' && $("#tipText").text()!=null && $("#inputPwd").val()!=null){
			//post进行判断
			$.post("/login/login_test",{acount:$("#inputText").val(),pwd:$("#inputPwd").val()},function(data){
				if(data.status){
					//window.location.replace(data.url);
					window.location.href=data.url;

				}else {


					$("#tipIcon").css({display:"inline-block"});
					$("#tipText").text("账号或密码错误");
				}


			},"json");
		}



	});



}



//定义一个函数根据body的大小来设置背景图的大小和位置，参数rat为图像的宽高比
function setBgImg(rat){
	
	//获取body的宽高
	var bW=document.body.clientWidth;
//	console.info(bW);
//	console.info(document.body.clientHeight);
	var bH=document.body.clientHeight;
	//获取图像的宽度
	
	var imgT=document.getElementById("bgImg");
    
	var iW=imgT.offsetWidth;
	var iH=imgT.offsetHeight;
	
//	console.info(iW);
//	console.info(iH);
	
	//如果body的窗口宽高比值大于图像比值，则图像的大小随宽
	if(bW/bH >= rat){
		
		var newH=bW/rat
		//console.info("比值为"+iW/iH);
		   to=(bH-newH)/2;
		   imgT.style.width=bW+"px";
		   imgT.style.height=newH+"px";
		   imgT.style.top=to+"px";
		   imgT.style.left="";
		   
//		   console.info("比值为"+iW/iH);
//		   console.info("top值"+imgT.style.top);
//		   console.info("left值"+imgT.style.left);
		   
		
	}else {
		var newW=rat*bH;
		lef=(bW-newW)/2;
		imgT.style.width=newW+"px";
		imgT.style.height=bH+"px";
		imgT.style.top="";
		imgT.style.left=lef+"px";
		
//		 console.info("比值为"+iW/iH);
//		 console.info("到了高强势的语句");
//		 console.info("top值"+imgT.style.top);
//		 console.info("left值"+imgT.style.left);
		}
	
	
	
	//如果body的窗口宽高的比值小于图像比值，则图像的大小随高
	
	
}



