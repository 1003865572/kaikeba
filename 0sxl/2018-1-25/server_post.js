const http = require('http');
const fs = require('fs');
const common = require('./lib/common');
const uuid = require('uuid/v4');
const zlib = require('zlib')

let server = http.createServer((req, res) => {

  let arr = []
  switch (req.url) {
    case '/upload':

      req.on('data', data => {
        arr.push(data)
      })
      let post = {}
      let files = {}
      req.on('end', () => {
        let data = Buffer.concat(arr);
        // 在 req.headers 中找到 content-type
        if (req.headers['content-type']) {
          let str = req.headers['content-type'].split('=')[1];
          if (str) {

            let boundary = `--${str}`
            // 1.切分数据
            let arr = data.split(boundary)
            // 2.去掉头尾
            arr.shift();
            arr.pop();
            // 3.分析数据, 去掉数据中多余的 \r\n, 分析数据到底是上传来的, 还是 post 的字段
            arr = arr.map(buffer => buffer.slice(1, buffer.length - 1))
            arr.forEach(buffer => {
              // console.log(
              //   buffer.toString()
              // )
              let n = buffer.indexOf('\r\n\r\n');
              let desc = buffer.slice(0, n);
              let content = buffer.slice(n + 4);
              desc = desc.toString();

              if (desc.indexOf('\r\n') === -1) {
                content = content.toString();
                desc = desc.split('; ')[1].split('=')[1];
                desc = desc.substring(1, desc.length - 1)
                post[desc] = content
              } else {
                let [line1, line2] = desc.split('\r\n');
                let [, name, fileName] = line1.split('; ');
                let type = line2.split('; ')[0];
                name = name.split('=')[1];
                name = name.substring(1, name.length-1);
                fileName = fileName.split('=')[1];
                fileName = fileName.substring(1, fileName.length - 1);
                console.log(name, fileName, type);
                files[name] = {name, fileName, type};
                let path = `upload/${uuid()}`
                path = path.replace(/\-/g, '');
                fs.writeFile(path, content, (err) => {
                  if (err) {
                    console.log('写入失败');
                  } else {
                    console.log('写入成功');
                  }
                })
              }
            })

          }
        }
      })

      break;
    default:
    let rs = fs.createReadStream(`www${req.url}`);
    res.setHeader('content-encoding', 'gzip')
    let gz = zlib.createGzip();
    rs.pipe(gz).pipe(res);
    rs.on('error', () => {
      res.writeHeader(404);
      res.write('Not found');
      res.end();
    })
  }


})

server.listen(3000)
