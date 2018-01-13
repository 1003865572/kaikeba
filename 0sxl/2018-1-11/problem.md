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
