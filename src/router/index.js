import Vue from "vue";
import VueRouter from "vue-router";
import routes from '@/router/routes'
// 服务于全局路由守卫
import vm from '@/main'
// 服务于全局路由守卫
import store from '@/store/'

Vue.use(VueRouter);

// * push函数本身还需要 resolve, reject 的回调作为另外两个参数，没有就会报错，所以二次封装
// 重写前备份原型上的 push
const oringinPush = VueRouter.prototype.push;
// *重写 push，第一个参数是目标路由的路径
VueRouter.prototype.push = function(location, resolve, reject){
  // push被调用的上下文是组件实例
  // console.log(this)

  if (resolve && reject) {
    // !直接调用 oringinPush 会导致执行上下文是 window，所以这里需要 call 指定 this(vc实例)
    oringinPush.call(this, location, resolve, reject);
  } else {
    // *如果没有传入成功和失败的回调，就传两个空白的回调作为 promise 的”安慰“
    oringinPush.call(this, location, () => {}, () => {},);
  }
};

// *同理重写 replace 方法
const oringinRepalce = VueRouter.prototype.replace;
VueRouter.prototype.replace = function(location, resolve, reject){
  if (resolve && reject) {
    oringinRepalce.call(this, location, resolve, reject);
  } else {
    oringinRepalce.call(this, location, () => {}, () => {},);
  }
};


// const router = new VueRouter(routes);
// *保证每个路由跳转，页面不会滚动。
// console.log(routes)
const router = new VueRouter({
  // *配置路由，routes暴露的是一个数组
  routes,
  //设置滚动条的位置
  scrollBehavior() {
      return { y: 0 };
  }
});

// *前置全局守卫（登录业务逻辑核心）
router.beforeEach( (to, from, next) => {
  // *判断登录页以外的其他路由
  // 如果登录
  if (localStorage.getItem('sph_token')) {
    // 就可以跳转到除了登录页的所有页面
    // *别忘了发请求，拿用户数据（之前我写在app/home组件的作废，
    // *原因之前的逻辑，退出登陆后（token清空）登录home都页（会请求用户数据）进不去）
    store.dispatch('User/getUserInfo')
    .then(res => {
      // 成功获取到用户数据
      if (res.code == 200) {
        // 放行
       return next();
      }
      // 获取用户数据失败，提醒用户
      return vm.$message({
        message: '获取用户数据失败',
        type: 'error'
      })
    })
    .catch(err => console.log(err))
  }
  // *如果没登录，用户个人数据的页面无法跳转
  else {
    // 想去哪儿
    let wantToGo = to.path;
    // *包含这些 关键词 的禁地不能去
    let arr = ['trade', 'pay', 'center', 'shopcart']
    // *只要想去禁地，没门儿！
    if (arr.some(noWay => wantToGo.indexOf(noWay) != -1)) {
      // 提醒登录
      vm.$message({
        message: '用户未登录',
        type: 'error'
      })
      // *滚回去登录，成功后会重定向之前想去的地儿
      next(`/login?redirect=${wantToGo}`)
    } else {
      // *没去禁地放行
      next()
    }
  }
})

export default router;
