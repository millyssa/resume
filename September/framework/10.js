//引入express模块
const express = require('express');
//创建网站服务器
const app = express()
//拦截所有请求
//extended:false方法内部使用querystring模块处理请求参数的格式
//extended：true 方法内部使用第三方模块qs处理请求参数的格式

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/add', (req, res) => {
    //获取POST请求参数
    res.send(req.body)
});
//监听端口
app.listen(3000);
console.log('网站服务器启动成功');