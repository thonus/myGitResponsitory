/**
 * Created by Administrator on 2016/9/4.
 */


var ar={};


function if_empty(ar) {
    for (var key in ar) {
        return true;
    }
    return false;
}

console.log(if_empty(ar));