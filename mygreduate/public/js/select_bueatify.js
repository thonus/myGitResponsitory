

//调用所有需要用的函数，生成优化的select
function callAll(selectType,reA,imA,ulIdA,spanSeeA,topLeft_secA){
	
	//定义div代替select
	select_change(document.getElementById(selectType),reA,ulIdA,imA,ulIdA,spanSeeA);
	//定义div里面的li的事件
	liAddEvent(ulIdA,selectType,spanSeeA,imA);
	//添加ul点击事件

	div_Onclick(ulIdA,reA,topLeft_secA,imA);
}



//这个函数根据select来动态创建元素替换select元素
function select_change(sele,re,ulId,imA,ulIdA,spanSeeA){
	//获取select的宽高
	
//	sele.style.display="none";
	//创建元素re，取代select的位置
	    div_replace_select(sele,re);
	  
	  //给这给新加的div添加一个选择按钮图片 
	    div_put_img(document.getElementById(re),imA);
	    
	//给re元素添加ul子标签
	   div_put_ul(document.getElementById(re),ulIdA);
	   
	   
	   //给re元素添加span标签
	   div_put_span(document.getElementById(re),spanSeeA);
	    
//在ul里面添加li标签
	  
	
	//获取select里面的所有元素
	    var optionList=sele.getElementsByTagName("option");
//	    console.info(optionList);
	
	/*根据select里面的元素，给re添加子元素，并给每一个子元素添加点击事件，
	 * 改事件的执行结果和select的option被选择了一样。添加的li的点击事件，
	 * 对应的option状态为selected
	*/
	    for(var i=0;i<optionList.length;i++){
//	    	console.info(optionList[i].innerHTML);
//	    	console.info(optionList.length);
	    	addLi(document.getElementById(ulId),document.getElementById(re),optionList[i].innerHTML);
	    	
	    	//如果有一个是selected,则span的内容就是它
			    	if(optionList[i].selected==true){
			    		
			    		document.getElementById(spanSeeA).innerText=optionList[i].innerHTML;
			    	
			    	}
			  	
	    }
	    
//	    setTimeout(function(){ulOff(u);},3000);
//	    setTimeout(function(){ulOn(u);},10000);
	
	//给外层添加事件，点击的时候隐藏弹出来的元素

//     console.info("出了循环");
       //最后隐藏原生的select
       
}

//创建元素re，取代select的位置
function div_replace_select(sele,reA){
	var re= document.createElement("div");
	  
	     //给创建的元素添加样式
	  re.style.display="inline-block";
		//代替显示的div的宽高，不要依赖于select---------------------------
	  //re.style.width=sele.offsetWidth+"px";
	  //re.style.height=sele.offsetHeight+"px";
	  //re.style.lineHeight=sele.offsetHeight+"px";

	  re.style.width="60%";
	  re.style.backgroundColor="white";
	  re.style.textAlign="left";
	  re.style.verticalAlign="text-bottom"
	  re.style.position="relative";
	  re.id=reA;
	  re.style.borderRadius=4+"px";
	  re.style.cursor="pointer";
	  
//	  console.info(sele.offsetWidth+"--"+sele.offsetHeight);
	  sele.parentElement.insertBefore(re,sele);
	   sele.style.display="none";
}

//往刚刚创建的div里面添加图片
function div_put_img(re,imA){
	
	var im=document.createElement("img");
	       //给图片添加样式
	    im.src="../picture/select.gif";
	    im.style.height="100%";
	    im.style.width=re.offsetHeight+"px";
	    im.style.float="right";
	    
	    im.id=imA;
	    im.style.MozTransition="all 0.5s ease-in";
	    im.style.webkitTransition="all 0.5s ease-in";
	    re.appendChild(im);
	
}

//往div里面天机ul元素
function div_put_ul(re,ulIdA){
	
	var u=document.createElement("ul");
		//这里是优化后的ul的宽度定义，需要修改--------------------------------
        //u.style.width= re.offsetWidth+"px";
	      u.style.width="100%";

	    u.style.margin="0px 0px";
	    u.style.padding="0px 0px";
	    u.style.backgroundColor="white";
	    u.style.position="absolute";
		//此处top值，需要修改--------------------------------------
	    u.style.top="100%";

	    u.id=ulIdA;
	    u.style.borderRadius=4+"px";
	    u.style.cursor="pointer";
	    u.style.display="none";
	    re.appendChild(u);
	
}

//在re里面添加一个span
function div_put_span(re,spanSeeA){
	var sp=document.createElement("span");
	sp.id=spanSeeA;
	sp.innerHTML="交通工具";
	sp.style.marginLeft=10+"px";
	sp.style.MozUserSelect="none";
	sp.style.cursor="pointer";
    re.appendChild(sp);
}


//定义一个往ul里面放li的函数,三个参数，父类，优化后的选择框，和显示字符
function addLi(u,re,str){
	
	var liT=document.createElement("li");
		//这三个是设置代替者li的宽高的样式，这里需要修改-----------------------
        //liT.style.width="inherit";
        //liT.style.height=re.offsetHeight+10+"px";
        //liT.style.lineHeight=re.offsetHeight+"px";

	    liT.innerText=str;
	    liT.style.listStyle="none";
//	    liT.style.backgroundColor="brown";
        liT.style.padding="5px 5px";
        liT.style.cursor="pointer";
        liT.style.boxSizing="border-box";
        liT.style.cursor="pointer";

        
	    u.appendChild(liT);
}

//定义函数控制ul的动画出现
function ulOn(u,imA){
	
	
	//先变为可见，才能执行动画,添加出现动画的函数
	u.style.display="";
	u.style.MozAnimation="select_div_on 0.5s 1 ease-in-out";
	u.style.webkitAnimation="select_div_on 0.5s 1 ease-in-out";
	u.style.oAnimation="select_div_on 0.5s 1 ease-in-out";
	u.style.animation="select_div_on 0.5s 1 ease-in-out";
	rotatePo(imA);
	
}

//定义函数控制ul的动画消失，添加消失动画的函数
function ulOff(u,imA){
	
	u.style.MozAnimation="select_div_off 0.5s 1 ease-in-out";
	u.style.webkitAnimation="select_div_off 0.5s 1 ease-in-out";
	u.style.oAnimation="select_div_off 0.5s 1 ease-in-out";
	u.style.animation="select_div_off 0.5s 1 ease-in-out";
	//一秒后设置不可见

	setTimeout(function(){

		u.style.display="none";

	},500);
	rotateNega(imA);
	
}

//给ul下的每个li添加事件
function liAddEvent(ulIdA,selectType,spanSeeA,imA){
	
	//获取ul下的所有的li
	var liList=document.getElementById(ulIdA).getElementsByTagName("li");
//	  console.info(liList);
	//获取select下的所有option
	var opList=document.getElementById(selectType).getElementsByTagName("option");
//     console.info(opList);
    for (var i=0;i<liList.length;i++) {
    	
    	//这里虽然形成了闭包，但是只是拥有了，i的索引，循环结束后i的值为4，每次点击调用时，都是使用i=4的值
    	liList[i].onclick=(function(j){
    		
			       return function(){
			       	
			       	opList[j].selected="selected";
//			       	console.info(document.getElementById(selectType).value);
			       	ulOff(document.getElementById(ulIdA),imA);
			       	document.getElementById(spanSeeA).innerText=opList[j].innerHTML;
			       	console.info(document.getElementById(selectType).value);
			       }
   
   
    	})(i);
    	
    	//定义每个li鼠标移上去的事件
    	liList[i].onmouseenter=function(){
    		this.style.backgroundColor="#107360";
    	}
    	
    	liList[i].onmouseleave=function(){
            this.style.backgroundColor="";
    	}
    	
    }

//console.info("li添加事件成功");

}

//定义给div和body添加点击事件的函数
function div_Onclick(ulIdA,reA,topLeft_secA,imA){
	
	
	//先获取ul
	var uT=document.getElementById(ulIdA);
	
//	console.info(uT);
	
	document.getElementById(reA).onclick=function(e){
		   if (uT.style.display=="none") {
			//ul是隐藏状态的话，让它出现
			ulOn(uT,imA);
			
		} else{
			ulOff(uT,imA);
		}
//	console.info(this);
	
	//阻止事件冒泡
	 e.stopPropagation();
	 
	
	}
	
	//给section添加点击事件
	document.getElementById(topLeft_secA).onclick=function(){
		
	if (uT.style.display=="none") {
			//ul是隐藏状态的话，让它出现
		
			
		} else{
			ulOff(uT,imA);
		}
	
//	console.info("在下section");
    }
	
}	

//定义图片顺时针旋转的函数
function rotatePo(imA){
	//document.getElementById(imA).style.transform="rotate(180deg)";
	$("#"+imA).css({transform:"rotate(180deg)"});
}

//定义图片逆时针旋转的函数
function rotateNega(imA){
	
	//document.getElementById(imA).style.transform="rotate(0deg)";
	$("#"+imA).css({transform:"rotate(0deg)"});
}

//升级说明2016、9、26,原先的select生成的ul和li的宽高是由所依赖的选择框的宽高决定的，
// 这个代替的函数只调用一次，所以狂高都是固定的，所以在流体布局，响应布局中，这个优化的
// 选择下拉框的格调就会和周围的格格不入，所以如果重绘的话（窗口改变），select是隐藏的，
// 它的宽高是无法获取的，就算是可以获取的，select也是需要做变化的样式，
// 那为什么不直接把变化的样式写在优化后的选择框中，所以以select的宽高来生成代替者的宽高
//从思路上就是错误的


