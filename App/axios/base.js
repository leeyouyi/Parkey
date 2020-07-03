import axios from 'axios';
import store from '../src/store';
import {userLoading} from '../src/action';

export const api = axios.create({
  baseURL: 'https://webserv-dot-eparking-20191006.appspot.com/CarP/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 10000,
});

// axios.defaults.timeout = 10000;           //超时时间
// axios.defaults.retry = 10;                 //请求次数
// axios.defaults.retryDelay = 1000;       

api.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('請求中')
  store.dispatch(userLoading(true));
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
  //  // 请求超时， 重新请求
  //  var config = err.config;
  //  // If config does not exist or the retry option is not set, reject
  //  if(!config || !config.retry) return Promise.reject(err);
   
  //  // Set the variable for keeping track of the retry count
  //  config.__retryCount = config.__retryCount || 0;
   
  //  // Check if we've maxed out the total number of retries
  //  if(config.__retryCount >= config.retry) {
  //      // Reject with the error
  //      return Promise.reject(err);
  //  }
   
  //  // Increase the retry count
  //  config.__retryCount += 1;
   
  //  // Create new promise to handle exponential backoff
  //  var backoff = new Promise(function(resolve) {
  //      setTimeout(function() {
  //          resolve();
  //      }, config.retryDelay || 1);
  //  });
   
  //  // Return the promise in which recalls axios to retry the request
  //  return backoff.then(function() {
  //      return axios(config);
  //  });

});

//返回拦截处理
api.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('請求結束')
  store.dispatch(userLoading(false));
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



