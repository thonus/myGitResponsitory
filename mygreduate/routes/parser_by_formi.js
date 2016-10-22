var formidable = require('formidable');
var url = require("url");
var queryString = require("querystring");
var fs=require('fs');
var path=require('path');
var async=require('async');


exports.all_parser=function(req,res,next){
	//接受完数据之后流中就再也没有数据了，所以后面的函数层就只能拿到流的名字和地址了
	
	//将请求行中的数据放进req的getParams中
	//req.getParams = queryString.parse(url.parse(req.url).query);
	
	//新建一个formidable对象，用来解析参数
	var form = new formidable.IncomingForm();
	
	var place_addre="f:/learn/"+req.session.user_name;
	//盘断地址是否存在，如果不存在则新建一个文件夹
	fs.exists(place_addre,function(exist){
		console.log("判断后的回调函数");
		if(exist){
			
		}else{
			fs.mkdir(place_addre, function(err){
				if(err){
				console.log("在新建文件夹的时候出错了");
				throw err;
				}
			})
		}
	
	
	//设置上传文件所存放的位置，注意要先有这个目录，不然会报错。因为这个模块没有做判断，
	//是否有这个文件夹，所以前面要做判断，如果没有这个文件夹就新建
	form.uploadDir = place_addre;
	form.multiples=true;
	

       console.log("要开始form.parse咯");
	if ("POST" == req.method){
		console.log("读取流中的数据了");
		form.parse(req, function(err, fields, files) {
            if(err){
            	console.log("出现了错误");
            }

//          console.log(fields);
        //处理字符串变量放进req.getparams
            req.getparams=fields;
            
            req.getfiles={};
            
            var len=0;

           //先循环一次往里面添加key值，因为后面的forEach是拿不到key值的
           for(var key in files){
           	
           	 
           	len++;
           	files[key].key_name=key;
//           console.log(files);
           	
           }
           //foreach循环重命名,用一个记数来判断是否改完名了，完事后就next
           var count_rename=0;
           console.log(files);
			if(len==0){
				console.log(req.getParams);
				console.log("666666666666666");
				next();
			}
           
           async.forEach(files,function(element){
               //获取文件的后缀
               var exist_name=path.extname(element.name);
			   //如果当前文件上传失败的话，则跳过这次循环（Excel表频繁出现）

               //组合的名字
               var whole_name=element.path+exist_name;
//             console.log(whole_name);
			   //由打印结果可以看出，有时候重命名不成功是因为whole_name中也没有后缀
			   // 而导致这个现象的是exist_name为空，
			   // 但是并不是path.extname(element.name)没有解析好
			   //而是formi中间件再流中没有读取到文件的文件名，至于是浏览器传输的问题
			   //还是中间件解析的问题，就不知道了
			   console.log(element.path+"重命名为"+whole_name);
               fs.rename(element.path,whole_name,function(err){
               	    if(err){
               	    	console.log("重命名出现错误");
						res.end(JSON.stringify({sta:false,err:"文件重命名失败"}));
						return;
               	    }else{
//             	    	console.log(element.key_name);

						if(!element.name){

							req.getfiles[element.key_name]="";

						}else {
							req.getfiles[element.key_name]=whole_name;
						}

						console.log(req.getfiles[element.key_name]);
               	    	
               	    }
           	        len--;
           	    	if(len==0){
           	    		console.log("要结束响应了");
                        console.log(req.getfiles);
                        next();
           	    	}
               	    
               	    
               });
           
           });
        
            
            
        });   
            

	
		
	}
	
	
	
	});
	
}
