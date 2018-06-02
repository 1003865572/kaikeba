const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

let user = {
  // 'name': 'abc123'
}

let server = http.createServer((req, res) => {
  const {pathname, query} = url.parse(req.url, true);
  // 取值
  let str='';
  req.on('data', data=>{
    str+=data;
  });

  req.on('end', () => {
    let post=querystring.parse(str);
    switch (pathname) {
      case '/register':
        {
          // 验证
          let {username, password} = query
          if (!username || !password) {
            res.write(`username or password is required`);
          } else if (!/^\w{8,32}$/.test(username)) {
            res.write('invaild username');
          } else if (/^['|"]$/.test(password)) {
            res.write('invaild password');
          } else if (user[username]) {
            res.write('user is exist');
          } else {
            user[username] = password
            res.write('register success')
          }
        }
        res.end()
      break;
      case '/login':
        // 验证
        {
          console.log(post)
          const {username, password} = post
          if (user[username]) {
            res.write('login usccess');
          } else {
            res.write('username or password not exist');
          }
          res.end()
        }
      break;
      default:
        fs.readFile(`file/${pathname}`, (err, data) => {
          if (err) {
            res.writeHeader(404);
          } else {
            res.write(data);
          }
          res.end();
        })
    }
    console.log(user)
  })
})

server.listen(3000)
