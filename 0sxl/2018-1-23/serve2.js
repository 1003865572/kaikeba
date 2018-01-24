const http = require('http')
const url = require('url')
const querystring = require('querystring')

let server = http.createServer((res, rep) => {
  const {pathname, query} = url.parse(res.url, true);
  let str = ''
  res.on('data', data => {
    str += data
  })
  res.on('end', () => {
    let data = querystring.parse(str)
    rep.write(JSON.stringify(data));
    // rep.write(data);
    // rep.write('aaa');
    rep.end();
  })
})

server.listen(3000)
