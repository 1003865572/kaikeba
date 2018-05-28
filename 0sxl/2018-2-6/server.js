const express = require('express');
const bodyPasser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './upload' })


let server = express();

server.listen(8080);

server.use(bodyPasser.urlencoded({ extended: false }));
server.use(upload.any());

server.post('/api', (req, res) => {
    console.log(req.body);
    console.log(req.files);
    this.body = '111';
})

server.use(express.static('./www'));