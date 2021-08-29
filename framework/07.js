//引入express框架
const express = require('express');
//创建网站服务器
const app = express();
//创建路由对象
const home = express.Router();
//将路由和请求路径进行匹配
//一级路由
app.use('/home', home);
//在home路由下继续创建路由
//二级路由
home.get('/index', (req, res) => {
    res.send('欢迎来到博客首页')
})

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');
