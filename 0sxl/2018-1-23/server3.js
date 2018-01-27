const http = require('http');
const fs = require('fs');
const url = require('url');

let server = http.createServer((res, req) => {
  let str = ''
  res.on('data', data => {
    str += data
    console.log(str)
  })
  res.on('end', () => {
    console.log(str)
    req.write(str);
    req.end();
  })
  // const {pathname, query} = url.parse(res.url, true)
  // fs.readFile(`file/${pathname}`, (err, data) => {
  //   if (err) {
  //     req.writeHeader(404)
  //   } else {
  //     req.write(data)
  //   }
  //   req.end()
  // })
})

server.listen(3000)
