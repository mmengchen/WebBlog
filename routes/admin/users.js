var express = require('express');
var router = express.Router();
var db = require('./db');

router.use(function (req, res, next) {
    if (undefined == req.session.user) {//如果session 中user不存在
        res.render('admin/login');//跳转到登陆页面
        return;
    }
    next();
});
/* GET users listing. */
router.get('/', db.showUsers);

router.get('/updateUser', db.selectUser);

router.post('/updateUser', db.updateUser);

router.get('/delUser', db.delUser);

module.exports = router;
