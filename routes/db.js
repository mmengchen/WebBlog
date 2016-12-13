/**
 * 数据库操作模块
 */
var mysql = require("mysql");
var md5 = require('md5');
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//配置数据库连接
var connect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'db_blog',
    port:3306
});

connect.connect(); //连接数据库
/* 前台模块 */
/** 查询每个用户信息和所有文章信息*/
exports.showArticles = function(req,res){
    connect.query('select * from tb_article,tb_users where tb_users.uid= tb_article.uid',function(err,result){
        if(err==null){
             res.render('index',{list:result});
        } else{
            res.send("错误信息:"+err);
        }
           
    });
}

/** 根据文章ID查询文章信息和用户信息 */
exports.showArticlesDetails = function(req,res){
    //获取Url中参数(文章id)
    var aid = req.query.newsid;

    connect.query('select * from tb_article,tb_users where tb_users.uid = tb_article.uid and aid ='+aid,function(err,result){
        if(err==null){
             res.render('news_details',{article:result});
        } else{
            res.send("错误信息:"+err);
        }
    });

}


/* 用户的登陆 */
exports.login = function(req,res){
    //获取表单中的参数
    var uaccount = req.body.uaccount;
    var upass = req.body.upass;
    var remb = req.body.remb;
    var sql = 'select count(uid) status from tb_users where uaccount=? and upass=?;';
    var params = [uaccount,upass];
    //进行数据库查询
    connect.query(sql,params,function(err,result){
        if(err==null){
            if(result[0].status==1){//登陆成功

                //登陆成功之后,根据用户账号(唯一)查询用户相关信息
                connect.query('select * from tb_users where uaccount =?',uaccount,function(err,result){
                    if(err==null){
                        res.render('admin/index',{users:result});
                    }else{
                        res.send('信息加载异常'+err);
                    }
                });
            }else{
                res.send('用户名或密码错误');
            }
        } else{
            res.send("错误信息:"+err);
        }
    });
}

/* 后台管理*/

/** 展示所有用户信息 */
exports.showUsers = function(req,res){
    var sql = 'select * from tb_users';
    connect.query(sql,function(err,result){
         if(err==null){
             res.render('admin/userdata',{users:result});
         }else{
            res.send("错误信息:"+err);
         }
     });
}

/** 查询所有标签信息 */
exports.showTags = function(req,res){
    var sql = 'select * from tag';
    connect.query(sql,function(err,result){
         if(err==null){
             res.render('admin/tagdata',{data:result});
         }else{
            res.send("错误信息:"+err);
         }
     });
}

/** 查询所有文章信息 */
exports.showAllArticles = function(req,res){
 connect.query('select * from tb_article,tb_users,tag where tb_users.uid = tb_article.uid and tb_article.tid = tag.tid',function(err,result){
        if(err==null){
             res.render('admin/articledata',{data:result});
        } else{
            res.send("错误信息:"+err);
        }
           
    });
}

/** 查询所有评论信息 */
exports.showDiscuss= function(req,res){
    var sql = 'select * from tb_discuss,tb_article,tb_users where tb_discuss.aid = tb_article.aid and tb_discuss.uid = tb_users.uid';
    connect.query(sql,function(err,result){
         if(err==null){
             res.render('admin/discussdata',{data:result});
         }else{
            res.send("错误信息:"+err);
         }
     });
}