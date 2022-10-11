import axios from "axios";
// *引入进度条插件
import nprogress from "nprogress";
// *引入进度条样式
import "nprogress/nprogress.css";

// *利用 create 方法创建一个新的 axios 实例
const requests = axios.create({
  // 配置基础路径，发请求时路径前面会带上 /api
  baseURL: "/mock",
  // 请求超时的时间限制 5 秒
  timeout: 5000,
  // headers: headers
});

// *请求拦截器
requests.interceptors.request.use((config) => {
  // config 是一个配置对象
  
  // *config 配置对象里面有一个属性会用到，而且很重要，就是 headers 请求头
  // console.log(config.headers)

  // 启动进度条动画
  nprogress.start();
  return config;
});

// *响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 完成进度条动画
    nprogress.done();
    // 响应成功的回调
    return res.data;
  },
  () => {
    // 响应失败的回调
    console.log('响应失败')
    return Promise.reject(new Error("faile"));
  }
);

export default requests;
