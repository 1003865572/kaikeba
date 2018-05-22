// const https = require('https');
// const fs = require('fs');

// let options = {
//     hostname: 'npmjs.com',
//     path: 'package/axios',
//     method: 'GET',
//     headers: {
//         'Content-Type': 'text/html; charset=UTF-8'
//     }
// }

// const req = https.request(options, res => {
//     console.log('statusCode', res.statusCode);
//     console.log('handers: ', res.headers);
//     let arr = [];
//     res.on('data', data => arr.push(data));
//     fs.writeFile('res.txt', arr, (err) => {
//         console.log(err);
//     });

// })
// req.on('error', err => console.log(err));
// req.end();



/*
    1. 拿到资源
    2. 5个为一个数组
    3. 组装页面
    4. 记录组装页面后的地址
    5. 把url读到文本中
[
    `https://cv.phncdn.com/videos/201706/22/121433541/480P_600K_121433541.mp4?a5dcae8e1adc0bdaed975f0d60fb5e050d523df0cca6435032db1bab0a4b451d8a412585437d61ae6f91c707b28a31b587402358f3cf9b33d38d4b26b96a3310e8ae41c37972a9589fdc947231b10d317cb71c1de99f0dedc0ac58e7d98cd1dce0a4956190ae4b9bb91c8027f41e9363bdef66a1df6ce8f48b4b50`,
    `https://cv.phncdn.com/videos/201710/09/136118082/720P_1500K_136118082.mp4?a5dcae8e1adc0bdaed975f0d67fb5e0527c20903c5bb57a6cad7e6cb50bc41fbb1152c24e90ee0008b707fa083a48c04b41c44c87193aac3b7acd537aad6c6e92d81070759489536a21ddf001d7e66230a378709ec50f6e36d3477031ce416ce1e237607cbeb887ec1a05ff76a71bd45e2a2d30ebdb6da71923035cd`,
    `https://cv.phncdn.com/videos/201805/11/165648801/480P_600K_165648801.mp4?a5dcae8e1adc0bdaed975f0d61fb5e05756dc4acc488d2f9e61ef33953093512602c6cb1feb473ca09d93ff0f73c0823b5b14bf839065a6839b2ee771832e65e18c36fd38acacb35ed8cd6225bd2d261cd805fadb9a21fe5f953e6c1739340c9dcb7c94e8090a410ed802b81de389a65a7c359d0b2004aeb1503`,
    `https://cv.phncdn.com/videos/201805/11/165650391/480P_600K_165650391.mp4?a5dcae8e1adc0bdaed975f0d61fb5e05756dc4acc488d2f9e61ef33953093512602c6cb1feb473ca09d93ff0f73c0823b5b043f330065a686c0741b076ba34f4dcf06ca53dd0d07cdc806ecdc1606f4415ee8068491d8ee6b4da13ac442bd73ae24b863ac6d609f81022581cca40f79a4b8164ca9d128b4066eb`,
    `https://cv.phncdn.com/videos/201805/11/165647301/480P_600K_165647301.mp4?a5dcae8e1adc0bdaed975f0d61fb5e05756dc4acc488d2f9e61ef33953093512602c6cb1feb473ca09d93ff0f73c0823b5b144f339065a680b1e6918e0f6a1c29ae3eaf88352063842cab7db63ca2985ad1531d6dc53d04cc681c23f31af2273672efd5d8c5fa187022909d58ef630756e6aa42050c27b7b1c1d`
]
[
    `https://dv1.phncdn.com/videos/201805/10/165521971/480P_600K_165521971.mp4?ttl=1526830222&ri=1638400&rs=464&clientip=45.77.100.134&hash=e2ac9e262ecee1828484ba451b3f7473`,
    `https://cv.phncdn.com/videos/201805/14/166088191/480P_600K_166088191.mp4?a5dcae8e1adc0bdaed975f0d61fb5e05756dc4acc488d2f9e61ef33953093512602c6cb1feb473ca09d93ff5f73c0820805fe7eeab6b2024445abb7e0d6fe3307ed893fba9f3c4f6895df8594761d41856067bb510673eab2849e5ef5284aaa37e305f77880d1113b2c16b97ca37abfb59d0e258faeb29de8162`,
    `https://cv.phncdn.com/videos/201708/21/129367601/720P_1500K_129367601.mp4?a5dcae8e1adc0bdaed975f0d60fb5e050d523df0cca6435032db1bab0a4b451d8a412585437d61ae6191c704b28a31bd24f8e0ccd1b5d0c5a99133cd2ed0705d990712aafc2f080961a230c88e16ef99ee797db96bb5595ab3cf4408fd2ebdb7d9e6c22f35253bbcb4fa2ecefadfa2df85f0fb50cc8c8a239aa067`,
    `https://cv.phncdn.com/videos/201708/21/129407611/480P_600K_129407611.mp4?a5dcae8e1adc0bdaed975f0d60fb5e050d523df0cca6435032db1bab0a4b451d8a412585437d61ae6191c704b28a31bd23fee0ccd0b5d0c6f9636369f8c9cd73c2296ef89c65ea8ae5399bfe1d865a877cf237421682a187b64ecdb2df5e0a89f6e0b09eaadabb1d1d89fdfea29e578424c118054cc4c7dae57e7a`,
    `https://cv.phncdn.com/videos/201712/24/146884142/480P_600K_146884142.mp4?a5dcae8e1adc0bdaed975f0d61fb5e05756dc4acc488d2f9e61ef33953093512602c6cb1feb47ccb32fd9acf23c755ba6d74d06af5c94b432bf3c26c189c578e27fabbb596237d0eb033c2894d29c721a40be434391bd9e25816ff278b5d72ae318ffb2b1b140127f9e3561c5f66b11afac69023075f1ea06c50`,
]


 */

const request = require('superagent');

request.get('https://www.pornhub.com/')
        .set('content-type', 'text/html; charset=UTF-8')
        .set('X-Frame-Options', 'SAMEORIGIN')
        .end(res => {
            console.log(res);
        })