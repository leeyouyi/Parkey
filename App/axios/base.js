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
  // params: {
  //   _mode: process.env.VUE_APP_DEV_MODE,
  //   _domain: process.env.VUE_APP_DEV_DOMAIN,
  //   _device: 'mobile',
  // },
  timeout: 20000,
});


api.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('請求中')
  store.dispatch(userLoading(true));
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
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



