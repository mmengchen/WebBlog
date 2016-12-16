var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.use(function (req, res, next) {
  if (undefined == req.session.user) {//如果session 中user不存在
    res.render('admin/login');;//跳转到登陆页面
    return;
  }
  next();
});

router.get('/', db.showTags);

router.get('/add', function (req, res, next) {
  res.render("admin/tag/add");
});

router.post('/doAdd', function (req, res, next) {
  res.send('网站后台执行博客标签添加');
});

router.get('/delTag', function (req, res, next) {
  res.send('网站后台执行博客标签删除');
});

module.exports = router;
