let a = new Buffer('123=-4567=-890');

function split (a,b){
    let arr=[];

    //从第 cur 位开始检索
    let cur = 0;
    //检索到的位置
    let n = 0;
    n = a.indexOf(b,cur);
    while((n=a.indexOf(b,cur)) != -1){
        arr.push(a.slice(cur,n));
        cur = n + b.length;
    }
    arr.push(a.slice(cur,a.length));
    return arr;
}
let arr = split(a,'=-');

console.log(arr.map(buf=>buf.toString()));