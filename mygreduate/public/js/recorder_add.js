

onload=function(){
	
     //给批量记账生成优化的select
	callAll("selectType","re","im","ulId","spanSee","topLeft_sec");
     //gei快速记账生成优化的select
     callAll("selectTypeF","reF","imF","ulIdF","spanSeeF","sectionFast");

	//初始化模板
	module_init();
	
	//批量记账按钮添加事件
	//document.getElementById("topLeft_btn").onclick=function(){
	//
	//	recorde_multi();
    //}
     //原本是放大九倍的，现在统一使用一个动画之后就放大五倍，是否统一改为九倍?????
	$("#topLeft_btn").on('click',function(){

		//add_animation_on($("#topLeft_btn"),$("#topLeft_sec"));
		//现在不需要出现动画了，批量记账，直接出现文件选择的界面
		//所以直接触发，Excel表的选择事件
		$("#excel_input").trigger('click');


	});
	
	//给模板记账按钮添加点击事件
	//document.getElementById("topRight_btn").onclick=function(){
	//	recorde_moudle();
    //
	//}

	$("#topRight_btn").on("click",function(){add_animation_on($("#topRight_btn"),$("#topRight_sec"))});
	
	
	
	//给快速记账按钮添加事件
	//document.getElementById("bottom").onclick=function(){
	//	recorde_fast();
    //
	//}

	$("#bottom").on('click',function(){add_animation_on($("#bottom"),$("#sectionFast"))});
	
	//给退出批量记账section的按钮添加事件
	//document.getElementById("topLeft_sec_exit").onclick=function(){
	//	recorde_multi_exit();
	//
	//}

	$("#topLeft_sec_exit").on("click",function(){add_animation_off($("#topLeft_btn"),$("#topLeft_sec"))});
	
	//给退出模板记账的section的按钮添加事件
	//document.getElementById("topRight_sec_exit").onclick=function(){
	//	recorde_moudle_exit();
	//}
	//退出模板记账的事件
	$("#topRight_sec_exit").on("click",function(){add_animation_off($("#topRight_btn"),$("#topRight_sec"))});
	$(".exit_section:first>i").on("click",function(){add_animation_off($("#topRight_btn"),$("#topRight_sec"))});


	//给退出快速记账section的div添加事件sectionFast_exit
	//document.getElementById("sectionFast_exit").onclick=function(){
	//	recorde_fast_exit();
	//}
	$("#sectionFast_exit").on('click',function(){add_animation_off($("#bottom"),$("#sectionFast"))});
	$(".exit_section:last>i").on("click",function(){add_animation_off($("#bottom"),$("#sectionFast"))});
//------------------    //添加按钮点击事件，触发批量记账提交事件----------------------------------------------
	$("#topLeft_sub").on('click',multi_sub);


	//添加按钮点击事件，触发快速记账事件
    $("#recorde_fast_sub").on('click',recorde_fast);

	//给添加模板的li添加点击事件
    $("#add_li").on('click',function(){
		   //让添加模板的编辑框显示,aside和article
           $("aside:first").css({display:"block"});
		   $("article:first").css({display:"block"});
		   console.log($("#ul_add_module > li").length);

	});

	//给article添加点击事件
	$("article:first").on('click',function(){
		//让添加模板的编辑框消失aside和article,编辑框和她的遮羞布
		$("aside:first").css({display:""});
		$("article:first").css({display:""});

	});

	//给添加模板的确认按钮添加点击事件
	$("aside>input:last").on('click',modle_add);

	//给excel_img添加点击事件
	$("#excel_input_img").on('click',function(){
		console.log($("#excel_input"));
		//触发文件选择事件
		$("#excel_input").trigger('click');
	});

	//定义一个formdata
	var formdata=new FormData(document.getElementsByTagName('form')[0]);
	//给input file添加change事件
	$("#excel_input").on('change',function(){
		//先显示正在加载
		//tip.on_lis_tip();

		//利用ajax上传图片
		$.ajax({
			url: "/recorde_add/add_excel",
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
					console.log('上传成功了^v^');
					//使用升级后的tip
					//tips('上传成功了-----','green');
					tip.tip_ok('上传成功了^v^');

				}else {
					console.log('上传shibai了-----');
					//tips('上传失败','red');
					//使用升级后的tip
					tip.tip_err('上传失败');
					console.log("shangcshibaile ");
				}

			}
		});

	});



//onload事件到此------------------------------------------------------
}

//我就在这里注释解释好不   嗯
//下面有两个函数一个是on 一个是off 嘛，


//定义给元素添加动画的函数,开始选择动画，add_animateion_on(),两个参数
//第一个参数，btn就是哪三个，记账的方式嘛，然后section就是那个后面出来的
function add_animation_on(botn,sec){
//设置body溢出隐藏
	document.body.style.overflow="hidden";
	//通过jquery的方法设置样式,按钮放大消失，section逐渐显示

	//这里按钮和section两个同时执行动画，但是注意并没有使用forword,所以最后，
	// 的样式会返回原来的样子，所以我在后面写了一个延时函数嘛
	botn.css({animation:"bottom_off 1s  ease-in-out","z-index":"1"});
	sec.css({animation:"section_fast 1s  ease-in-out","z-index":"2"});
	//动画执行了一秒，一秒后sec设置可见
	setTimeout(function(){
		//document.getElementById("sectionFast").style.visibility="visible";
		sec.css({visibility:"visible"});
		botn.css({"z-index" : ""});
		sec.css({"z-index":""});
	},900);


}
//定义给元素添加动画的函数，结束选择的动画add_animation_off(),两个参数
function add_animation_off(botn,sec){
	//先执行section变淡
        sec.css({animation:"section_off 1s ease-in-out"});
	//再执行bottom变小
	    botn.css({animation:"bottom_on 1s  ease-in-out"});
	//动画执行一秒，半秒后sec不可见，清除body的overflow属性
		setTimeout(function(){

			sec.css({visibility:""});
			//document.body.style.overflow="";
		},500);

	setTimeout(function(){


		document.body.style.overflow="";
	},1000);

}


//批量记账
function multi_sub(){
	//获取选择的类型，文字
	//$("#selectType").val();
	//console.log($("#selectType").val());
	//获取输入的金额
	//$("#inputMoney").val();
	//console.log($("#inputMoney").val());
	//判断是否为数字
	if(isNaN($("#inputMoney").val())){
		//tips("请输入数字","red")
		//提示升级
		tip.tip_err("请输入数字");
	}else {
		//进行ajax提交
		console.log("要提交咯");
		$.post("/recorde_add/multy_recode",{mon_type:$("#selectType").val(),money:$("#inputMoney").val()},function(data){
			//对返回结果进行反映
			if(data.sta){
				console.log("数据保存成功");
				//tips("数据保存成功","green");
				tip.tip_ok("数据保存成功");

			}else {

				//tips("数据保存失败","red")
				tip.tip_err("数据保存失败");
			}
		},"json");

	}
}

//快速记账信息提交的函数
function recorde_fast(){
  		//获取选择框的信息
	    $("#selectTypeF").val();
	    //获取文本输入框的金额
	    $("#inputMoneyF").val();
		//判断验证
	    if(isNaN($("#inputMoneyF").val())){
			//tips("请输入数字","red");
			tip.tip_err("请输入数字");
		}else {
			//进行表单的提交
			$.post("/recorde_add/recorde_fast",{mon_type:$("#selectTypeF").val(),money:$("#inputMoneyF").val()},function(data){
						//对返回的信息进行处理

				//console.log(data.sta);
						if(data.sta){
							console.log("数据保存成功");
							//tips("数据保存成功","green");
							tip.tip_ok("数据保存成功");
						}else {
							//tips("数据保存失败","red");
							tip.tip_err("数据保存失败");
						}

			},'json');
		}


}

//添加模板确认点击事件，所触发的函数
function modle_add(){
	//获取输入的内容
	$("aside>input:eq(1)").val();

	console.log($("aside>input:first").val(),$("aside>input:eq(1)").val());
	if(isNaN($("aside>input:eq(1)").val())){
		//tips('金额请输入数字','red');
		tip.tip_err('金额请输入数字');
	}else {
		$.post('/recorde_add/module_add', {
			mon_type: $("aside>input:first").val(),
			money: $("aside>input:eq(1)").val()
		}, function (data) {
			//如果添加成功的话(对用户表进行添加)，对模板进行刷新
			if(data.sta){
				//更新成功对模板进行刷新,添加刚刚新建的模板
				/*????????????????????????????????????????????????????????????????????*/
                console.log(data.mon_type,data.money);
				add_mudle_on(data.mon_type,data.money);
				$("aside:first").css({display:""});
				$("article:first").css({display:""});
			}else {
				tips(data.err,'red')
			}


		}, 'json');
	}

}

/*刷新页面上的模板的事件*/
  /*根据类型和金额创建模板，添加到$addli前面去*/
function add_mudle_on(mon_type,money){
	/*创建li*/
    var $li=$("<li class='moudleLi col-xs-6 col-sm-4 col-md-4 col-lg-4'></li>");
    /*给li中添加内容,新建两个p标签，用于存放内容*/
    var $p_type= $('<p></p>');
	$p_type.text(mon_type);
	var $p_money=$("<p></p>");
	$p_money.text(money);

	//添加进去li里面
	$li.append($p_type);
	$li.append($p_money);
	//添加删除小标签，在又上角
	var $delete_icon=$("<img class='delete_png' src='/picture/delete.png'/>");
	//给删除小标签添加点击事件
	$delete_icon.on('click',function(e){

		$.post('/recorde_add/module_delete',{mon_type:mon_type,money:money},function(data){
			if(data.sta){
				//获取父元素并删除
				$delete_icon.parent().remove();
				//如果li等于6
				if($("#ul_add_module > li").length==6){

					$("#add_li").show();

				}


			}else {
				tips(data.err,'red');
			}


		},'json');

		e.stopPropagation();

	});

	$li.append($delete_icon);
	//给$li添加事件
	$li.on('click',function(){
		//往服务器提交记账的信息
		$.post('/recorde_add/multy_recode',{mon_type:$p_type.text(),money:$p_money.text()},function(data){
			if(data.sta){
				console.log("数据保存成功");
				//tips("数据保存成功","green");
				tip.tip_ok("数据保存成功");

			}else {
				//tips("数据保存失败","red");
				tip.tip_err("数据保存失败");
			}


		},'json');

	});
	//给li添加mouseover事件
	$li.on('mouseover',function(){
		$delete_icon.show();

	});

	$li.on('mouseout',function(){
		$delete_icon.hide();

	});


	//给即将加入的li内的删除图标添加删除事件



	//将$li添加到addli前面去,判断ul里面是否有六个，如果是的话，就隐藏addli再添加

	if($("#ul_add_module > li").length==6){
		$("#add_li").before($li);
		$("#add_li").hide();

	}

	$("#add_li").before($li);





}

//页面加载的时候，给模板记账添加模板，模板数据从服务器获取
function module_init(){

		$.get('/recorde_add/get_modules',function(data){

				if(data.sta){
					console.log(data.result.user_difined_type);
					if(data.result.user_difined_type.length==0){return;}
					console.log('要添加模板了');
					console.log(data.result.user_difined_type.length);
					//获取到了模板的信息逐个添加
					var len=data.result.user_difined_type.length <= 6 ? data.result.user_difined_type.length :6 ;
					console.log(len);
					for(var i= 0;i<len;i++){
							add_mudle_on(data.result.user_difined_type[i].mon_type,data.result.user_difined_type[i].money);

					}

				}else {
					add_mudle_on("模板加载失败",0);
				}

		},'json');


}
//------------------------------------------------------------------



