let http = require('http');
let https = require('https');
let fs = require('fs');

let getHtml = (url) => {
    let req = https.request(url, res => {
        console.log('成了');
        if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode === 304) {
            let arr = [];
            res.on('data', data => arr.push(data));
            fs.writeFile('11.txt', arr, err => console.log(err));
        } else {
            console.log(res.statusCode);
        }
    })
    
    req.on('error', err => {
        console.log('错了，', err);
    })
    
    req.write('');
    req.end();
}

// let path = 'https://www.baidu.com';
let path = 'https://www.pornhub.com/';
getHtml(path);