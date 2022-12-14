// 初始配置
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;

// vue工具库引入
import router from "@/router";
import store from "@/store";

// 全局组件引入
import Carousel from "@/components/Carousel";
import TypeNav from "@/components/TypeNav";
// *全局组件注册
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);

// *饿了么-ui
import { Button, Message, MessageBox, Pagination } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 两种引入方式
// Vue.component(Button.name, Button);
Vue.use(Button);
Vue.use(Pagination);
Vue.prototype.$MessageBox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;


// 全局插件引入
// *vue-awesome-swiper依赖于swiper，所以不用引入swiper
import "swiper/css/swiper.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);
// 引入懒加载图片
import loading from '@/assets/images/giphy.gif';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: loading,
})

// *引入 mockSercer.js 并执行一次
import "@/mock/mockServer";
// 引入表单验证插件
import "@/plugins/validate";
// 引入所有 API
import * as API from "@/api";

export default new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 全局 API 总线
    Vue.prototype.$API = API;
  },
  mounted() {
    // console.log(this);
  }
}).$mount("#app");
