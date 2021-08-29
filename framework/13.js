
const express = require('express');
const path = require('path');
const app = express()


//实现静态资源访问功能 绝对路径
app.use(express.static(path.join(__dirname, 'public')))


//监听端口
app.listen(3000);
console.log('网站服务器启动成功');