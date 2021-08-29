//引入express模块
const express = require('express');
//创建网站服务器
const app = express()
//拦截所有请求
app.get('/index/:id', (req, res) => {
    res.send(req.params);
})
//http://localhost:3000/index/123
//监听端口
app.listen(3000);
console.log('网站服务器启动成功');