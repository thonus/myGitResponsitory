var express = require('express');
var router = express.Router();

/* GET users listing. */
//为何这里的url只需要写一个/,写全部的ur反而匹配不到
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

console.log(router);
