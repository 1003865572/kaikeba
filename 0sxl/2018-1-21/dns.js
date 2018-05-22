const dns = require('dns');

dns.resolve('ond6.com', (err, res) => {
     if (err) {
        console.log(err);
     } else {
         console.log(res);
     }
})