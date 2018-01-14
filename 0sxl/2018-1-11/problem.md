#### 结构能解开字符串么
```
  let show =  (...params) => {
    let [a,b,c] = params[0]
    console.log(c,b,a)
  }
  show('abc') // cba
```

#### 两个函数能相等么
```
  let fn1 = function () {}
  let fn2 = () => {}
  alert(fn1 === fn2) // ? false
  alert(fn1 + fn2) // ? function () {}() => {}
  alert(fn1 - fn2) // ? NaN
```
#### 字符串模板：输出结果是啥
```
  console.log(`aa \` a  ${1+3}: b`)  //aa ` a  4: b
  console.log(`aa \\` a  ${1+3}: b`) //missing ) after argument list
  console.log(`aa \\\` a  ${1+3}: b`)//aa \` a  4: b
  console.log(`aa /` a  ${1+3}: b`)  //missing ) after argument list
  console.log(`aa `\ a  ${1+3}: b`)  //Invalid or unexpected token
```
#### Array reduce ：输出结果是啥
```
let arr2 = [18, 67, 98, 12];
console.log(
  arr2.reduce((item, i) => {
    console.log(item, i)
    return item+1
  })
)
18 67
19 98
20 12
21
```
#### Array reduce ：输出结果是啥
```
let arr3 = [12,5,88,37,21,91,17,24]
console.log(
  arr3.filter(item => {
    return !item%2
  })
)
// []
```
