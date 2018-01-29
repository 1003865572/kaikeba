const http = require('http');
const os = require('os');
const cluster = require('cluster');
const process = require('process');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  console.log('执行主进程')
} else {
  let server = http.createServer((req, res) => {
    console.log(process.pid);
    res.write('abc');
    res.end()
  }).listen(3000);
  console.log('子进程监听 3000 端口')
}
