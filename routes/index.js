var express = require('express');
var router = express.Router();

var db = require('./db');

/* 前端处理模块 */
router.get('/',db.showArticles);

router.get('/news_details',db.showArticlesDetails);


/* 后端处理模块 */
router.get('/admin',function(req,res){
   res.sendFile( __dirname + "/admin/" + "login.html" );
});

router.get('/admin/login',function(req,res){
   res.sendFile( __dirname + "/admin/" + "login.html" );
});

router.post('/admin/login',db.login);

router.get('/admin/loginout',function(req,res){
    console.log("退出登陆");
});


router.get('/admin/usermanage',db.showUsers);

router.get('/admin/tagmanage',db.showTags);

router.get('/admin/articlemanage',db.showAllArticles);

router.get('/admin/discussmanage',db.showDiscuss);
module.exports = router;
