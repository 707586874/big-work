"use strict";
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("access-Control-Allow-Origin", "*");
    res.header("access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    if (req.method == "OPTIONS") res.send(200);//让options请求快速返回
    else next();

})

var USERS = [
    { id: '01', userName: 'admin', password: '123456' },
    { id: '02', userName: 'aaa', password: '45678' }
];
var RESULTS = [
    { id: '03', userName: '张三', fs: '80' },
    { id: '04', userName: '李四', fs: '70' }
];




app.get('/hello', function (req, resp) {
    resp.send('哈哈哈哈');
    resp.end();
});

app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
})
//添加用户
app.post('/users', function (req, resp) {
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});
//修改用户
app.put('/users', function (req, resp) {
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, mag: '没有找到该用户！' });
    }
    resp.end();
});

//删除用户
app.delete('/users/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, mag: '没有找到该用户！' });
    }
    resp.end();
});
app.listen(8080, function () {
    console.log('服务器在8080端口启动!');
})






app.get('/cj', function (req, resp) {
    resp.send(RESULTS);
    resp.end();
});

app.get('/cj/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of RESULTS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
})
//添加用户
app.post('/cj', function (req, resp) {
    RESULTS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});
//修改用户
app.put('/cj', function (req, resp) {
    let founded = false;
    for (let user of RESULTS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, mag: '没有找到该用户！' });
    }
    resp.end();
});

//删除用户
app.delete('/cj/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of RESULTS) {
        if (user.id === req.params.id) {
            RESULTS.splice(index, 1);
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, mag: '没有找到该用户！' });
    }
    resp.end();
});

var yz = [
    {
        userName: 'admin111',
        password: '123456'
    }
]

app.post('/yz', function (req, resp) {

    const userName = req.body.userName;
    const password = req.body.password;
    let founded = false;
    console.log(req)
    for (let user of yz) {
        if (user.userName === userName && user.password === password) {
            founded = true;
        }
    }
    if (founded) resp.send({ succ: true });
    else resp.send({ succ: false });
    resp.end();

});