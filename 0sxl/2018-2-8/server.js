const express = require('express');
const bodyPasser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './upload' })


let server = express();

server.listen(8080);

server.use(bodyPasser.urlencoded({ extended: false }));
server.use(upload.any());

server.use('/api', (req, res) => {
    console.log(req.method, req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.files);
    
    res.end('ok');
})

server.use(express.static('./www'));