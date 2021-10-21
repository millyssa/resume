////引入express模块
const express = require('express');
//创建网站服务器
const app = express()
//拦截所有请求
app.use(fn({ a: 1 }))

function fn(obj) {
    return function (req, res, next) {
        if (obj.a == 2) {
            console.log(req.url);
        } else {
            console.log(req.method);
        }

        next();
    }
}
app.get('/', (req, res) => {
    res.send('ok')
})

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');