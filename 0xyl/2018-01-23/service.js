const http = require('http');
const queryString = require('querystring');
const fs = require('fs');
const url = require('url');

const users=[];
let service = http.createServer((req,rep)=>{
    

    // userName : 'name',
    // pass : 'pass'

    //GET 参数
    let {pathname ,query} = url.parse(req.url,true);
    let {userName , pass} =query;

    let str = '';
    req.on('data',data=>{
        str += data;
    });
    req.on('end',error=>{
        //POST 参数
        let {userName , pass} = query;
        let obj = query;
        console.log(obj);
        switch(pathname){
            case '/reg' : 
            console.log(`进入 reg 方法`);
            let {userName,pass} = obj;
                let user = {
                    'userName' :  userName,
                    'pass' : pass
                }
                users.push(user);
                console.log('users : '+users.length);
                rep.write(`in enter ${pathname}`);
                rep.end();
                break;
            case '/login' : {
                    let {userName,pass} = queryString.parse(str);
                    let postUser = users[0];
                    if(userName && pass){
                        if(postUser.userName == userName && postUser.pass == pass){
                            rep.write(`in enter ${pathname}  success `);
                        }else{
                            rep.write(`in enter ${pathname}  error `);
                        }
                    }else{
                        rep.write(`in enter ${pathname}  error `);
                    }
                    rep.end();
                    break;
                }
            case '/getfrom' : 
                fs.readFile('www/getfrom.html',(err,data)=>{
                    if(err){
                        fs.readFile("www/404.html",(error,data)=>{
                            if(error){
                                rep.writeHead(404);
                                rep.write(error);
                            }else{
                                rep.write(data);
                            }
                            rep.end();
                        });
                    }else{
                        rep.write(data);
                    }
                    rep.end();
                });
                break;
            case '/postfrom' : 
                fs.readFile('www/postfrom.html',(err,data)=>{
                    if(err){
                        fs.readFile("www/404.html",(error,data)=>{
                            if(error){
                                rep.writeHead(404);
                                rep.write(error);
                            }else{
                                rep.write(data);
                            }
                            rep.end();
                        });
                    }else{
                        rep.write(data);
                    }
                    rep.end();
                });
                break;
            default :
                fs.readFile("www/404.html",(error,data)=>{
                    if(error){
                        rep.writeHead(404);
                        rep.write(error);
                    }else{
                        rep.write(data);
                    }
                    rep.end();
                });
                console.log(`default 模块`);
        }
    });
});

service.listen(8081);