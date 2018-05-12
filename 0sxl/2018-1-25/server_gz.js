const http = require('http');
const fs = require('fs');
const gzib = require('zlib');
const common = require('./lib/common');
const path = require('path')

let server = http.createServer((req, res) => {
  let arr = []
  switch (req.url) {
    case '/upload':
      console.log('表单提交');
      req.on('data', data => {
        arr.push(data)
      })
      req.on('end', err=> {
        if (req.headers) {
          let data = Buffer.concat(arr)
          let boundary = req.headers['content-type'];
          boundary = `--${boundary.split('=')[1]}`

          // 1. 用"分隔符切分整个数据"
          data = data.split(boundary);

          // 2. 丢弃头尾两个数据
          data.shift()
          data.pop()

          // 3. 丢掉每个数据头尾的 \r\n
          data.map(item => {
            console.log(item.toString())
          })

        } else {
          res.write('not ')
          res.end()
        }
        // console.log(arr.toString())
      })
      break;
    default:
      console.log(
        `${__dirname}\\wwww${req.url.replace('/','\\')}`
      )
      fs.readFile(`${__dirname}\\wwww${req.url.replace('/','\\')}`, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.write(data);
          res.end();
        }
      })
      let rs = fs.createReadStream(`${__dirname}\\wwww${req.url.replace('/','\\')}`)
      rs.pipe(res);
      rs.on('error', err => {
        console.log(' error ');
        res.writeHeader(404);
        res.write('Not found');
        res.end();
      })
  }
})

server.listen(3000)
