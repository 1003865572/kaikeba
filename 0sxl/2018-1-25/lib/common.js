Buffer.prototype.split = Buffer.prototype.split || function (b) {
  let arr = [];

  let curr = 0;
  let n = 0;
  while ((n = this.indexOf(b, curr)) !== -1) {
    arr.push(this.slice(curr, n));
    curr = n + b.length;
  }
  arr.push(this.slice(curr));
  return arr;
}
