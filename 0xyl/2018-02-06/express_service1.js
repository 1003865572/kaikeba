var express = require('express');
var body = require('body-parser');
var multer = require('multer');


let server = express();
server.listen(8080);

server.use(body.urlencoded({extended : false}));

let multerObj = multer({dest : './update'});
server.use(multerObj.any());

server.post('/api',(req,rep)=>{
    if(req.headers['origin'] == null || req.headers['origin'].startsWith('http://localhost')){
        rep.setHeader('Access-Control-Allow-Origin','*');
    }

    rep.send('ok');

    console.log(req.body);
    console.log(req.files);
});

server.use(express.static('./www/'));