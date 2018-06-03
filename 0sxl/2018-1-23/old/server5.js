const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

let user = {

}

let server = http.createServer((req, res) => {
  const {pathname, query} = url.parse(req.url, true);

  let str = ''
  req.on('data', data => {
    str += data
  })
  req.on('end', () => {

    switch (pathname) {
      case `/register`:
          {
            const {username, password} = query
            if (!username || !password) {
              res.write(JSON.stringify({err: 1, msg: 'username or password not exist'}))
            } else if(!/^\w{8,32}$/.test(username)) {
              res.write(JSON.stringify({err: 1, msg: 'invaild username'}))
            } else if (/^['|"]$/.test(password)) {
              res.write(JSON.stringify({err: 1, msg: 'invaild password'}))
            } else if (user[username]) {
              res.write(JSON.stringify({err: 1, msg: 'username is exist'}))
            } else {
              user[username] = password
              res.write(JSON.stringify({err: 0, msg: '注册成功'}))
            }
            res.end()
          }
        break;
      case `/login`:
        {
          const {username, password} = querystring.parse(str)
          if (!username || !password) {
            res.write(JSON.stringify({err: 1, msg: 'username or password not exist'}))
          } else if(!/^\w{8,32}$/.test(username)) {
            res.write(JSON.stringify({err: 1, msg: 'invaild username'}))
          } else if (/^['|"]$/.test(password)) {
            res.write(JSON.stringify({err: 1, msg: 'invaild password'}))
          } else if (!user[username]) {
            res.write(JSON.stringify({err: 1, msg: 'username is exist'}))
          } else {
            res.write(JSON.stringify({err: 0, msg: '登录成功'}))
          }
          res.end()
        }
        break;
      default:
        fs.readFile(`file/${pathname}`, (err, data) => {
          if (err) {
            res.writeHeader(404);
          } else {
            res.write(data)
          }
          res.end()
        })
    }
    console.log(
      user
    )
  })
})

server.listen(3000)
