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

router.get('/', db.showAllArticles);
router.get('/delArticle', db.delArticles);
module.exports = router;