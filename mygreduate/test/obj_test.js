/**
 * Created by Administrator on 2016/8/11.
 */

function func_name( fi){
    console.log("我是arry函数");
};
var  arry=func_name;
console.log(arry);
arry.age=20;

console.log(arry);
console.log(typeof arry.name);
console.log(typeof arry.func_name);
console.log(func_name.name);
console.log(func_name._proto_);

function cla(){


    function cla_tem(){
         console.log("cla_tem-------");
    }
    cla_tem.age=20;
    return cla_tem;

}

tem=new cla();

console.log(tem);
tem();


////给b做测试，object中是不是一定要键值对
//
//var b={name:"jcak",age:20};
//console.log(b);
//
////字面量表方法能创建function么
//var fun={
//    //arry,
//    ja:"tom"
//};
//
////引用测试
//var fun_test =function(){
//    console.log("测试functest");
//}
//
//var tem=fun_test;
//
//console.log(tem);
//tem.age=20;
//tem=function(){
//    console/log("我是tem再次定义");
//}
//
//console.log(fun_test);
//fun_test();
//console.log(tem);