import Vue from "vue";
import VueRouter from "vue-router";
import routes from '@/router/routes'

Vue.use(VueRouter);

// * push函数本身还需要 resolve, reject 的回调作为另外两个参数，没有就会报错，所以二次封装
// 重写前备份原型上的 push
const oringinPush = VueRouter.prototype.push;
// 
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

const router = new VueRouter(routes);

export default router;
