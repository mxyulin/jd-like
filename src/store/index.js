import vue from "vue";
import Vuex from "vuex";

// 引入vuex组件模块
import Home from "@/store/Home";
import Search from "@/store/Search";
import Detail from "@/store/Detail";
import User from "@/store/User";
import ShopCart from "@/store/ShopCart";
import Trade from "@/store/Trade";

vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Home,
    Search,
    Detail,
    User,
    ShopCart,
    Trade
  },
});
