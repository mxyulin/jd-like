import axios from "axios";
// *引入进度条插件
import nprogress from "nprogress";
// *引入进度条样式
import "nprogress/nprogress.css";
// *引入 Detail 库，为了拿到 uuid_token
import Detail from "@/store/Detail";// 注意是默认暴露
// todo: 引入路由器用于 token 过期，跳转登录页
import router from "@/router"
import User from "@/store/User"

// *利用 create 方法创建一个新的 axios 实例
const requests = axios.create({
  // 配置基础路径，发请求时路径前面会带上 /api
  baseURL: "/api",
  // 请求超时的时间限制 5 秒
  timeout: 5000,
  // headers: headers
});

// *请求拦截器
requests.interceptors.request.use((config) => {
  // *config 配置对象里面有一个属性会用到，而且很重要，就是 headers 请求头
  // *启动进度条动画
  nprogress.start();
  // ! 重点内容--游客身份验证
  // console.log('Detail---uuid_toke: ', Detail.state.uuid_token);
  // ! userTemId 字段是由后端主导约定的一个游客身份验证标识，一定要写正确单词
  config.headers.userTempId = Detail.state.uuid_token;
  // *携带 token 为了获取用户信息
  if (localStorage.getItem('sph_token')) {
    config.headers.token = localStorage.getItem('sph_token');
  }
  return config;
});

// *响应拦截器
requests.interceptors.response.use(
  (res) => {
    console.log()
    // todo: 拦截器里判定 token ，如果返回 401等过期 code 就提示用户，并跳转至登录页。
    if (res.data.code == 401) {
      // 仅仅清空用户信息
      User.mutations.CLEARUSERINFO();
      // 提示用户
      alert('登录信息已过期，请重新登录')
      // 重新登录
      router.push({
        path: '/login'
      })
    }
    // 完成进度条动画
    nprogress.done();
    // 响应成功的回调
    return res.data;
  },
  () => {
    // 响应失败的回调
    return Promise.reject(new Error("faile"));
  }
);

export default requests;
