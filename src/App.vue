<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <!-- 利用路由 meta 属性决定组件得隐藏 -->
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// 引入全局组件动画库
import "animate.css";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  // *放这里的原因：仅请求一次数据
  mounted() {
    // 获取商品列表
    this.$store.dispatch("Home/getCategoryList");
    // (弃用)获取用户信息，写这里的原因是，页面一刷新导致用户信息数据被清空，所以得重新请求用户信息数据
    // this.$store.dispatch("User/getUserInfo")
  },
};
</script>

<style scope>
</style>
