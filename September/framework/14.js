const express = require('express');
const path = require('path');
const app = express()

//告诉express框架使用什么模板引擎渲染什么后缀的模块文件
app.engine('art',require('express-art-template'))
//告诉express框架模块存放得位置
app.set('views',path.join(__dirname,'views'))
//告诉express框架模块的默认后缀是什么
app.set('view engine','art');

app.get('/index',(req,res)=>{
    res.render('index',{
        msg:'message'
    })
})
app.get('/list',(req,res)=>{
    res.render('list',{
        msg:'listPage'
    })
})

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');