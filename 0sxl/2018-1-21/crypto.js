const crypto = require('crypto');

// const obj = crypto.createHash('md5'); 
// obj.update('123456')
// console.log(
//     obj.digest('hax')
// )


const md5 = (str) => {
    let res = ''
    const cr = crypto.createHash('md5');
    cr.update(str);
    res = cr.digest('hax');
    return res;
}

console.log(md5(md5('123456')));

// const obj = crypto.createHash('sha1');
// obj.update('123456')
// console.log(
//     obj.digest('hax')
// )