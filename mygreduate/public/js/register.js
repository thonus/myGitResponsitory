onload=function(){
	
	phoneOn();
	//给注册方式的选择div添加事件
	document.getElementById("divLeftFSel").onclick=function(){phoneOn();}
	document.getElementById("divLeftESel").onclick=function(){emailOn();}
}

//隐藏邮箱注册，显示手机注册
function phoneOn(){
	//隐藏邮箱注册
	document.getElementById("emailRegister").style.display="none";
	
	//显示手机注册
	document.getElementById("phoneRegister").style.display="";
	
}

//显示邮箱注册，隐藏手机注册
function emailOn(){
	//隐藏邮箱注册
	document.getElementById("emailRegister").style.display="";
	
	//显示手机注册
	document.getElementById("phoneRegister").style.display="none";
}
