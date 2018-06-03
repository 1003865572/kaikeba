
Buffer.prototype.split = Buffer.prototype.split || function (b) {
    let arr = [];
    let cur = 0;
    let n = 0;
    while ((n = this.indexOf(b, cur)) !== -1) {
        arr.push( this.slice(cur, n) );
        cur = n + b.length;
    }
    arr.push(this.slice(cur));
    return arr
}

/*
    查找
    截取
    切分
console.log(b.indexOf('-=-', 7));
console.log(
    b.slice(
        b.indexOf('-=-', 7),
        b.indexOf('-=-', 7) + '-=-'.length + 1
    ).toString()
)

let arr = b.split('-=-');
console.log(
    arr.map(buffer => buffer.toString())
);
 */