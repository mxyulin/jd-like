import vue from "vue";
import Vuex from "vuex";

// 引入vuex组件模块
import Home from "@/store/modules/Home";
import Search from "@/store/modules/Search";
import Detail from "@/store/modules/Detail";
import User from "@/store/modules/User";
import ShopCart from "@/store/modules/ShopCart";
import Trade from "@/store/modules/Trade";
import Center from "@/store/modules/Center";

vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Home,
    Search,
    Detail,
    User,
    ShopCart,
    Trade,
    Center
  },
});
