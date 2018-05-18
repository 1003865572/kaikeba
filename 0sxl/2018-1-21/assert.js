var assert = require('assert');

function sum (a, b) {

    assert(arguments.length === 2, "必须传入两个参数");
    assert(typeof a === 'number', '第一个参数必须是数字');
    assert(typeof b === 'number', '第二个参数必须是数字');

    return a + b;
}

try {
    console.log(sum(10, 5));
} catch (error) {
    console.log(error)
}
try {
    console.log(sum(10));
} catch (error) {
    console.log(error);
}
try {
    console.log(sum(10, '5'));
} catch (error) {
    console.log(error);
}