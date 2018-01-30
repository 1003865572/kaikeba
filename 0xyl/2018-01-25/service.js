const http = require('http');
const fs = require('fs');
const common=require('./libs/common');
const url = require('url');
const uuid = require('uuid/v4');
const queryString = require('querystring');

let service = http.createServer((req,rep)=>{
    let path = req.url;
    if(path.indexOf('/favicon.ico') != -1){
        rep.writeHead(404);
        rep.end();
    }
    if(path.indexOf('.html') !=-1){
        fs.readFile(`www/${path}`,(err,data)=>{
            if(err){
                rep.write('错误页面')
            }else{
                rep.write(data);
            }
            rep.end();
        });
    }
    let arr=[];
    let files=[];
    console.log(path);
    if(path == '/upload'){
        req.on('data',data=>{
            arr.push(data);
        });
        let contextDate = [];
        req.on('end',()=>{
            let data = Buffer.concat(arr);
            if(req.headers['content-type']){
                let str = req.headers['content-type'].split('; ')[1];
                let boundary = str.split('=')[1];
                let context = data.split(boundary);
                context.shift();
                context.pop();
                context = context.map(item=>item.slice(2,item.length-2));
                // console.log(context.map(item=>item.toString()));
                context.map(item=>{
                    let n = item.indexOf('\r\n\r\n');
                    let left = item.slice(0,n);
                    n = n + '\r\n\r\n'.length;
                    let right = item.slice(n,item.length-2);
                    console.info(`说明：${left.toString()}`); // 
                    console.info(`内容：${right.toString()}`);// 内容
                    if(left.indexOf('\r\n') == -1){//不包含 '\r\n' 普通数据 
                        let dataName = left.split('; ');
                        dataName = dataName[1];
                        let name = dataName.split('=')[1];
                        name = name.toString();
                        right = right.toString();
                        contextDate.push({[name] : right});
                        
                        console.log(contextDate);
                    }else{//文件数据
                        let dataName = left.split('; ');
                        let fileNameDetail = dataName[2].split('=')[1];
                        fileNameDetail = fileNameDetail.split('\r\n')[0].toString();
                        console.info('文件名 > ' + fileNameDetail);
                        let [fileName,type] = fileNameDetail.split('.');
                        let filePath = `D:/syl/kaikeba/0xyl/2018-01-25//upload/${uuid()}`;

                        fs.writeFile(filePath, right, err=>{
                            if(err){
                                console.log(`上传失败：${err}`);
                            }else{
                                console.log(`上传成功`);
                                files.push({filePath,fileName,type});
                            }
                        });
                    }
                });

                
                
            }

        });
    }
    
});

service.listen(8089);