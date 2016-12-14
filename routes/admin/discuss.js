var express = require('express');
var router = express.Router();
var db = require('./db');

router.use(function(req,res,next){
    if (undefined == req.session.user) {//如果session 中user不存在
        res.sendFile( __dirname + "/" + "login.html" );//跳转到登陆页面
        return;
    }
    next();
});
router.get('/',db.showDiscuss);

router.get('/delDiscuss',db.delDiscuss);
module.exports = router;