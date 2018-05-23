const http = require('http');

let service = http.createServer((req,rep)=>{
    let path = req.url;
    let {pathname ,query} = url.parse(req.url,true);
    let {userName , pass} =query;

    if(path == 'login'){
        let {user ,pass} = query;
        if(user != '' && pass != null){
            rep.write('success');
        }
    }

}).listen(8080);