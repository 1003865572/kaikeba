const http = require('http');
const queryString = require('querystring');

let server = http.createServer((req, res) => {

    let str = ''
    let arr = []
    req.on('data', (data) => {
        str += data
        arr.push(data)
    })
    req.on('end', () => {
        console.log(queryString.parse(str))
        console.log(arr)
    })
    res.end();
})
server.listen(8080)