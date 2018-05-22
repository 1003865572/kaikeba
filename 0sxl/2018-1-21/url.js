const urllib = require('url');

let res = urllib.parse('http:www.baidu.com:888/s?a=1&b=2', true);
console.log(res);