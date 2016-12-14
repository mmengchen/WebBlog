var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.get('/',function(req,res){
   res.render('admin/login');
});


router.get('/login',function(req,res){
  res.render('admin/login');
});

router.post('/login',db.login);

router.get('/loginout',function(req,res){
    req.session.user = null;//将session清空
    res.send('退出登录成功!');
});

module.exports = router;
