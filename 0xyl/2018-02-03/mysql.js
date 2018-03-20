const mysql = require('mysql');

let db = mysql.createPool({host:'127.0.0.1', prot : '3306', user :'root',password:'',database:'test'});
