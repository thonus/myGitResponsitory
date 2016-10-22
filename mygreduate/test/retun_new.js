/**
 * Created by Administrator on 2016/8/12.
 */

function car(){

    this.jod="carry";
    console.log(this);
    return  function (){

    };

}

car.prototype.wheels=4;
var bus={};

car.call(bus,null);

console.log(bus);
console.log(car);

var cicle=new car();