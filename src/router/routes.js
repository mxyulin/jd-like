/* 路由信息专属配置文件 */
import Home from "@/views/Home";
import Search from "@/views/Search";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Detail from "@/views/Detail";
import AddCartSuccess from "@/views/AddCartSuccess";
import ShopCart from "@/views/ShopCart";
import Trade from "@/views/Trade";
import Pay from "@/views/Pay";
import PaySuccess from "@/views/PaySuccess";
import Center from "@/views/Center";
import MyOrder from "@/views/Center/MyOrder";
import GroupOrder from "@/views/Center/GroupOrder";

export default [
  // *重定向：设置页面在第一次打开或者其他未注册路由时永远导航到 Home 组件。
  {
    path: "*",
    // path: '/',
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    meta: { showFooter: true, showList: true },
  },
  {
    name: "search",
    // !加问号可传可不传，注意占位符必须和params参数里的键名一样
    path: "/search/:keyword?",
    component: Search,
    meta: { showFooter: true, showList: false },
  },
  {
    path: "/login",
    component: Login,
    meta: { showFooter: false },
    beforeEnter: (to, from, next) => {
      // 如果登录
      if (localStorage.getItem('sph_token')) {
        // 访问 login 重定向到首页
        next('/');
      } 
      // 如果没登陆
      else {
        // 放行
        next()
      }
    }
  },
  {
    path: "/register",
    component: Register,
    meta: { showFooter: false },
  },
  {
    name: "detail",
    path: "/detail/:skuId?",
    component: Detail,
    meta: { showFooter: true, showList: false },
    scrollBehavior() {
      return { y: 0 };
    },
  },
  {
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: { showFooter: true },
  },
  {
    name: "shopcart",
    path: "/shopcart",
    component: ShopCart,
    meta: { showFooter: true },
  },
  {
    name: "trade",
    path: "/trade",
    component: Trade,
    meta: { showFooter: true },
  },
  {
    path: "/pay/:orderId",
    component: Pay,
    meta: { showFooter: false },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { showFooter: false },
  },
  {
    path: "/center",
    component: Center,
    meta: { showFooter: false },
    children: [
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "/center",
        redirect: "myorder",
        component: MyOrder,
      },
    ],
  },
];
