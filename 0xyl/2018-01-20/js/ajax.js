function ajax(options) {

    options || options == {};

    options.type = options.type || 'get';
    options.dataType = options.dataType || 'text';
    options.data = options.data || {};

    var dataStr = [];
    for(var name in options.data){
        dataStr.push(`${name}=${options.data[name]}`);
    }
    var strDate = dataStr.join("&");


    if(window.XMLHttpRequest != null){
        var xhr = new XMLHttpRequest();
    }else{
        var xhr = new ActiveXObject('Microsoft.XMLHttp');
    }

    if(options.type == 'get'){

        xhr.open('get',`${options.url}?${strDate}`,true);
        xhr.send();

    }else if(options.type == 'post'){
        xhr.open('POST', options.url);
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(strDate);
    }

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if((xhr.status <= 200 && xhr.status > 300) || xhr.status === 304 ){
                alert('成功' + xhr.responseText);
                options.success(xhr.responseText);
            }else{
                // 失败
                options.error(xhr.responseText);
            }
            
        }
    }
}