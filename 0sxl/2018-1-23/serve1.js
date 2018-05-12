const http = require('http')
const url = require('url')

let server = http.createServer((res, rep) => {
    console.log(
      // url.parse(res.url, true)
      res
    )
    rep.write('aaa')
    rep.end();
})

server.listen(3000)
