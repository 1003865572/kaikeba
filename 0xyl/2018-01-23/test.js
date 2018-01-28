const queryString = require('querystring');

let str = 'name=123&pass=123';
let obj = queryString.parse(str);

console.log(obj);