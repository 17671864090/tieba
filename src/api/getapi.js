/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// 创建axios实例
var instance = axios.create({    timeout: 1000 * 12});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'development':
    axios.defaults.baseURL = "http://127.0.0.1:9966";
    break;
  case 'production':
    axios.defaults.baseURL = "http://60.205.178.222:7001";
    break;
}


axios.interceptors.request.use(
    config=>{
        let token = localStorage.getItem("UserInfoTokenn");
        if(token){
            token && (config.headers.Authorization = token);
        }
        return config;
    },
    error => Promise.error(error)
);
axios.interceptors.response.use(
    response => {
        //拦截响应，做统一处理
        if (response.data.status) {
            switch (response.data.status) {
                case 501:
                  alert(response.data.message)
                  // localStorage.removeItem('UserInfoTokenn')
                  break;
              case 502:
                alert(response.data.message)
                break;
            }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)
    })
  });}
export default post;
