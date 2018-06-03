const http = require('http');
const common = require('./common')

let server = http.createServer((req, res) => {
    let arr = []
    req.on('data', data => arr.push(data));
    req.on('end', () => {
        let data = Buffer.concat(arr);
        // data
        let str = req.headers['content-type'];
        if (str && str.indexOf('boundary') !== -1) {
            str = str.split('; ')[1];
            console.log(str)
        }
        // let str = req.headers['content-type'].split('; ')[1]
        // if (str) {
        //     console.log(str);
        // }
    })
    
    res.end();
})

server.listen(8080);