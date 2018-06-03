this.onmessage = function (ev) {
    let {a, b} = ev.data;
    this.postMessage(a + b)
}