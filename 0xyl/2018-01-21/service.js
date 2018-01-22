const http = require('http');
const fs = require('fs');

let service = http.createServer((res,rep)=>{
    fs.readFile('1.html',(err,data)=>{
        if(err){
            console.info(err);    
            rep.write(err);
        }else{
            console.info('请求正确');
            rep.write(data);
        }
        rep.end();
    });
});

service.listen(8081)