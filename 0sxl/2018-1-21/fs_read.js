const fs = require('fs');

// 异步读取文件
// fs.readFile('note.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//         console.log(data.toString());
//     }
// })

// 同步读取文件
let buffer = fs.readFileSync('note.txt');
console.log(buffer)
console.log(buffer.toString());
