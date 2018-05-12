const mysql=require('mysql');

//连接池
let db=mysql.createPool({host: 'localhost', user: 'root', password: '', port: 3309, database: '20180127'});

db.query(`INSERT INTO student_table (ID, name, gender, chinese, math, english) VALUES(0, '小明', '男', 98, 5, 3);`, (err, data)=>{
  if(err){
    console.log('错了', err);
  }else{
    console.log(data);
  }
});
