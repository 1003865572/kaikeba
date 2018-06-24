const http = require('http');
const common = require('./common')

let server = http.createServer((req, res) => {
    let arr = []

    res.setHeader('Access-Control-Allow-Origin', '*')

    req.on('data', data => arr.push(data));
    req.on('end', () => {
        res.write('over');














        let data = Buffer.concat(arr);
        // data 
        let str = req.headers['content-type'];
        if (str && str.indexOf('boundary') !== -1) {
            str = str.split('; ')[1];
            let boundary = `--${str.split('=')[1]}`;

            let resultArr = data.split(boundary);
            resultArr.shift();
            resultArr.pop()
            resultArr = resultArr.map(buffer => buffer.slice(2, buffer.length))
            resultArr.map(b => {
                console.log(b.toString());
            })
            // let resultArr1 = resultArr.map(item => {
            //     // item
            //     return item.split('Content-Disposition: form-data; ')[1]
            // })



            // let resultArr3 = {}
            // resultArr1.map(item => {
            //     console.log(item.toString())
            //     if (item.indexOf('Content-Type') !== -1) {
            //         // item.split(/\r\n/g).map(n => {
            //         //     console.log(n.toString());
            //         // })
            //         // resultArr3.push({
            //         //     name: '',
            //         //     filename: '',
            //         //     data: []
            //         // })
            //         // resultArr3
            //     } else {
            //         // resultArr3
            //     }
            // })
        }













        res.end();
    })
    
})

server.listen(8080);