var express = require('express');
var body = require('body-parser');
var multer = require('multer');


let server = express();
server.listen(8080);

server.use(body.urlencoded({extended : false}));

let multerObj = multer({dest : './update'});
server.use(multerObj.any());

server.use('/api',(req,rep)=>{
    console.log('请求进入' + req.headers['origin']);
    if(req.headers['origin'] == null || req.headers['origin'].startsWith('http://localhost')){
        rep.setHeader('Access-Control-Allow-Origin','*');
        console.log('跨域访问进来的');
    }

    rep.send('ok');

    console.log(req.body);
    console.log(req.files);
});

server.use(express.static('./www/'));