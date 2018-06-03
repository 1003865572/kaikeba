var http = require('http');

let service = http.createServer((req,res)=>{
    console.log('index');
});
service.listen(3000);