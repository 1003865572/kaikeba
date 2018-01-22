#### 生成器 求输出结果
```
//生成器
let generator = function *gen(a) {
  console.log(a)
  let b = yield;
  console.log(b)
}
let g = generator('aa')
let next = {}
next = g.next(1)
while(next.done) {
  g.next(1)
}
aa
```
#### 生成器 求输出结果
```
let generator = function *gen(a) {
  for (let i= 0; i < 3; i++) {
    let a = yield i;
  }
}
let g = generator()
let next = g.next(1)
while(!next.done) {
  next = g.next('50')
  console.log(next)
}
//{value: 1, done: false}
//{value: 2, done: false}
//{value: undefined, done: true}
```
