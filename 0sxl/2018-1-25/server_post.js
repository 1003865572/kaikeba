const http = require('http');
const fs = require('fs');
const common = require('./lib/common');
const zlib = require('zlib');
const uuid=require('uuid/v4');

let server = http.createServer((req, res) => {
  let arr = [];

  switch (req.url) {
    case '/upload':


    req.on('data', data => {
      arr.push(data)
    })
    req.on('end', () => {


      let post={};
      let files={};
      let data = Buffer.concat(arr);
      if (req.headers['content-type']) {
        let str = req.headers['content-type'].split('; ')[1];
        if (str) {
          let boundary = `--${str.split('=')[1]}`
          // 解析二进制文件上传数据

          // 1.用分隔符,切分整个数据
          let arr = data.split(boundary);
          // 2.去掉头尾的无效数据
          arr.shift();
          arr.pop();
          //3.丢弃掉每个数据头尾的"\r\n"
          arr = arr.map(buffer => buffer.slice(2, buffer.length - 2));
          //4.每个数据在第一个"\r\n\r\n"处切成两半
          arr.forEach(buffer => {
            let n = buffer.indexOf('\r\n\r\n');
            let desc = buffer.slice(0, n);
            let content = buffer.slice(n + 4);

            desc = desc.toString();

            // 判断是否是普通数据
            if (desc.indexOf('\r\n') == -1) {
              content = content.toString();
              let name = desc.split('; ')[1].split('=')[1];
              name = name.replace(/"/g, '');
              post[name] = content;
            } else {
              let [line1, line2] = desc.split('\r\n');
              let [, name, fileName]=line1.split('; ');
              let type = line2.split(': ')[1]
              name = name.split('=')[1];
              name = name.substring(1, name.length - 1);
              fileName = fileName.split('=')[1];
              fileName = fileName.substring(1, fileName.length - 1);
              console.log(
                `${name} : ${fileName} : ${type}`
              )

              // let path = `upload/${fileName}`;
              let path = `upload/${uuid().replace(/\-/g, '')}`;
              fs.writeFile(path, content, err => {
                if (err) {
                  console.log('写入失败')
                } else {
                  files[name] = {fileName, path, type};
                  console.log(
                    files
                  )
                }
              })

            }
          })
          console.log(post)

        }
      }


    })




      break;
    default:

    // let rd = fs.createReadStream(`www${req.url}`);
    let rd = fs.createReadStream(`www${req.url}`);
    const gz = zlib.createGzip()
    // zlib
    rd.pipe(gz).pipe(res);
    res.setHeader('content-encoding', 'gzip');
    rd.on('error', () => {
      res.writeHeader(404);
      res.write('Not found');
      res.end()
    })

  }


})

server.listen(3000)
