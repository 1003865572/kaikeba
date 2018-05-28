

function ajax ({ data, url, success, error, dataType, type }) {
    data = data || {}
    dataType = dataType || 'json'
    type = type || 'GET'

    let strDate = '';
    let strArr = [];
    for (let name in data) {
        strArr.push(`${name}=${data[name]}`);
    }
    strDate = strArr.join('&');
    // 整理数据
    let xhr = new XMLHttpRequest();

    if (type.toUpperCase() === 'GET') {
        xhr.open(type, `${url}?${strDate}`);
        xhr.send();
    } else {
        xhr.open(type, url);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(strDate);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                success && success(xhr.responseText)
            } else {
                error && error(xhr.responseText);
            }
        }
    }
}