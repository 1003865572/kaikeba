const fs = require('fs');
const http = require('http');



// fs.readFile(`file/1.txt`, 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })



let server = http.createServer((req, res) => {
  console.log(
    `file${req.url}`
  )
  // fs.readFile(`file${req.url}`, 'utf-8', (err, data) => {
  fs.readFile(`file${req.url}`, 'utf-8', (err, data) => {
    if (err) {
      res.write(404)
    } else {
      res.write(data)
    }
    res.end()
  })
})

  server.listen(8080);
