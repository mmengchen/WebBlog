var express = require('express');
var router = express.Router();

var db = require('./admin/db');


/* 前端处理模块 */
router.get('/', db.showArticles);

router.get('/news_details', db.showArticlesDetails);

module.exports = router;
