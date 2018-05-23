function ajax (options) {
    // url, type="GET", data={}, success, error
    options = options || {};
    options.type = options.type || 'get';
    options.dataType = options.dataType || 'text';
    options.data = options.data || {};
    
    var xhr = new XMLHttpRequest();

    // 数据组装
    let arr = []
    for (let name in options.data) {
        arr.push(`${name}=${options.data[name]}`);
    }
    let str = arr.join('&');

    switch (options.type.toUpperCase()) {
        case "GET": 
            options.url+=`?${str}`;
            xhr.open(options.type.toUpperCase(), options.url, true);
            xhr.send();
        break;
        case "POST": 
            xhr.open(options.type.toUpperCase(), options.url, true);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(str);
        break;
    }
    // 接收
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                var data = xhr.responseText
                if (options.dataType === 'json') {
                    if (window.JSON && JSON.parse) {
                        data = JSON.parse(data);
                    } else {
                        data = eval('('+str+')');
                    }
                }
                options.success && options.success(data)
            } else {
                options.error && options.error(xhr.responseText)
            }
        }
    }
}