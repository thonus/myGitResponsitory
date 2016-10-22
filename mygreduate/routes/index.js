var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //这里是如何能找到login_second这个页面的？？？而且render方法似乎并不是response的方法，
  // 如果是express的方法，它在什么时候被加进去response里面的

  //如果未登录，则充定向到登录界面
  if(req.session.user_name){
    res.render('recorde_add');
  }else {
    res.redirect('/login');
  }

});


module.exports = router;

//console.log(router);
