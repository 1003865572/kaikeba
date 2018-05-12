const zlib = require('zlib');
const fs = require('fs');

let rs = fs.createReadStream('./www/jquery.js');
let ws = fs.createWriteStream('jquery.js.gz');

let gz = zlib.createGzip();

rs.pipe(gz).pipe(ws);

ws.on('finish',()=>{
    console.log(`完成`);
});