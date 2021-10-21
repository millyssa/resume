const express = require('express');
const path = require('path');
const app = express()

//告诉express框架使用什么模板引擎渲染什么后缀的模块文件
app.engine('art',require('express-art-template'))
//告诉express框架模块存放得位置
app.set('views',path.join(__dirname,'views'))
//告诉express框架模块的默认后缀是什么
app.set('view engine','art');

app.locals.users=[{
    name:'张三',
    age:12
},{
    name:'李四',
    age:19
}]

app.get('/index',(req,res)=>{
    res.render('index',{
        msg:'首页'
    })
})
app.get('/list',(req,res)=>{
    res.render('list',{
        msg:'列表页'
    })
})

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');