const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const url = require('url');

const server = http.createServer((req, res) => {
  const {pathname} = url.parse(req.url);
  let path = `www${pathname}`;
  fs.stat(path, (err, stat) => {
    if (err) {
      res.writeHeader(404);
      res.write('Not Found');
      res.end();
    } else {
      console.log(
        req.headers['if-modified-since']
      )
      if (req.headers['if-modified-since']) {
        // 获取 cline 端静态文件的修改时间，对比修改时间
        let oDate = new Date(req.headers['if-modified-since']);
        let time_server = Math.floor(stat.mtime.getTime() / 1000)
      } else {
        sendFileToClient()
      }
    }
    function sendFileToClient() {
      // 发送
      let rs = fs.createReadStream(`www${req.url}`);
      const gz = zlib.createGzip();

      rs.on('error', err=>{
        res.writeHeader(404);
        res.write('Not Found');
        res.end();
      });

      res.setHeader('content-encoding', 'gzip');
      rs.pipe(gz).pipe(res);
    }
  })



})

server.listen(3000)
