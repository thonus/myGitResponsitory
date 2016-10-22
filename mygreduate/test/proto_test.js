/**
 * Created by Administrator on 2016/8/12.
 */

function car(){
    this.jod="carry";
    console.log("i can run");
    return "iiii";
}

car.prototype.wheels=4;

var bus=new car();

console.log("直接访问原型中的属性");
console.log(car.wheels);
console.log(car.prototype.wheels);
console.log("通过__proto__访问整个原型");
console.log(typeof car.__proto__);
car.__proto__();
console.log("是否有__proto__这个属性");
console.log(car.hasOwnProperty("__proto__"));
console.log("通过Object的方法访问整个原型");
console.log(Object.getPrototypeOf(car));
console.log("通过prototype访问整个原型");
console.log(car.prototype);
console.log("是否有prototype这个属性");
console.log(car.hasOwnProperty("prototype"));


console.log("-------------------------------以下是对象");
console.log("直接访问原型中的属性");
console.log(bus.wheels);
console.log("通过__proto__访问整个原型");
console.log(bus.__proto__);
console.log("是否有__proto__这个属性");
console.log(bus.hasOwnProperty("__proto__"));
console.log("通过Object的方法访问整个原型");
console.log(Object.getPrototypeOf(bus));
console.log("通过prototype访问整个原型");
console.log(bus.prototype);
console.log("是否有prototype这个属性");
console.log(bus.hasOwnProperty("prototype"));

console.log(bus);

console.log("给bus添加__proto__属性");
bus.__proto__="haha";
console.log(bus.__proto__);
