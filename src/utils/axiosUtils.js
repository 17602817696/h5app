import axios from 'axios';
import qs from 'qs';
axios.defaults.baseURL = `http://localhost:3000`;

// return 后面的值就是给后端的数据
axios.interceptors.request.use((req) => {
    // 统一为接口添加TOKEN 
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.token = token;
    }
    if (req.method === 'post') {
        req.data = qs.stringify(req.data);
    }
    // console.log(req);
    return req;
}, (err) => Promise.reject(err));

// 响应拦截器
axios.interceptors.response.use((res) => {
    // console.log('拦截器', res);
    // 只把前端需要的数据给前端
    switch (res.status) {
        case 200:
            return res.data.data;
        case 401:
            console.log('err', '该状态码表示发送的请求需要有认证')
            break;
        case 404:
            console.log('err', '无法找到指定位置的资源')
            break;
        case 500:
            console.log('err', '服务器遇到了意料不到的情况，不能完成客户的请求')
            break;
    }
    return res.data.data;
}, (err) => Promise.reject(err))