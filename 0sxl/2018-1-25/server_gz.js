const http = require('http');
const fs = require('fs');
const gzib = require('zlib')

let server = http.createServer((req, res) => {
  console.log('有请求访问了')
})

server.listen(3000)
