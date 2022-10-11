// 初始配置
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;

// vue工具引入
import store from "@/store";
import router from "@/router";

// 全局组件引入
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// *全局组件注册
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

// *饿了么-ui
import { MessageBox, Button, Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 两种引入方式
Vue.component(Button.name, Button);
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
// 全局插件引入
// *vue-awesome-swiper依赖于swiper，所以不用引入swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
// 插件安装
Vue.use(VueAwesomeSwiper);

// *引入 mockSercer.js 并执行一次
import "@/mock/mockServer";
// 引入表单验证插件
import "@/plugins/validate";
// 引入所有 API
import * as API from "@/api";

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    (Vue.prototype.$bus = this),
      // 全局 API 总线
      (Vue.prototype.$API = API);
  },
}).$mount("#app");
