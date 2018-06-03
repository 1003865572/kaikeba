const http = require('http');
const url = require('url');
const queryString = require('querystring');
const fs = require('fs');

let sourceMap = {
    'user': '123',
    'blue': '321'
}

let server = http.createServer((req, res) => {

    // GET
    let { pathname, query } = url.parse(req.url, true);
    
    // POST
    let str = ''
    req.on('data', data => (str += data));
    req.on('end', () => {
        let post = queryString.parse(str);
        console.log(pathname, query, post);
        const { name, pass } = query;
        
        switch (pathname) {
            case '/reg':
                if (!name) {
                    res.write('{"err": 1, "msg": "name is require"}')
                } else if (!pass) {
                    res.write('{"err": 1, "msg": "pass is require"}')
                } else if (!/^\w{4,32}$/.test(name)) {
                    res.write('{"err": 1, "msg": "name 的长度 4 - 32"}')
                } else if (/^['|"]$/.test(pass)) {
                    res.write('{"err": 1, "msg": "pass 不合法"}')
                } else if (sourceMap[name]) {
                    res.write('{"err": 1, "msg": "用户名已被使用"}')
                } else {
                    sourceMap[name] = pass
                    res.write('{"err": 0, "msg": "注册成功"}');
                    console.log(sourceMap);
                }
                res.end()
                break;
            case '/login':
                if (!name) {
                    res.write('{"err": 1, "msg": "name is require"}')
                } else if (!pass) {
                    res.write('{"err": 1, "msg": "pass is require"}')
                } else if (!/^\w{4,32}$/.test(name)) {
                    res.write('{"err": 1, "msg": "name 的长度 4 - 32"}')
                } else if (/^['|"]$/.test(pass)) {
                    res.write('{"err": 1, "msg": "pass 不合法"}')
                } else if (!sourceMap[name]) {
                    res.write('{"err": 1, "msg": "user is not exist"}')
                } else if (sourceMap[name] !== pass) {
                    res.write('{"err": 1, "msg": "pass is invaild"}')
                } else {
                    res.write('{"err": 0, "msg": "login success"}')
                }
                res.end()
                break;
            default:
                fs.readFile(`www${pathname}`, (err, data) => {
                    if (err) {
                        res.writeHeader(404);
                        res.wirte('404 Not Found')
                    } else {
                        res.wirte(data)
                    }
                    res.end();
                })
                break;
        }

    })
})
server.listen(8080);