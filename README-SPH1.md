# SPH项目开发前的准备

## 搭建脚手架vue-cli

1. 准备 node + cnpm(有梯子无需国内cdn) + webpack(vue-cli) 的开发环境。
    1. vue-cli2及以下版本: `npm install vue-cli`
    2. vue-cli3/cli4及以上版本: `npm install -g @vue/cli@4.5.13`(4.5.13版本完美支持vue2.x)
2. 初始化项目
    1. vue-cli2创建项目:`vue init webpack app`(`app`是项目名称)
    2. vue-cli3/cli4创建项目:`vue create app`。
3. 启动项目(启动不了是因为你没`cd app`懂？)
    1. vue-cli2启动项目:`npm run dev`(`pakage.json`中可修改)。
    2. vue-cli3/cli4启动项目`npm run serve`。

## 项目文件夹介绍

- [build](index.js是`webpack`配置文件)几乎不动这个文件夹。
- [node_modules](项目依赖的模块)几乎不动这个文件夹。
- [public](用于存放`ico`图标、入口HTML文件、reset.css)`public`文件夹里面经常放置一些**静态资源**，而且在项目打包的时候`webpack`**不会编译**这个文件夹，会被原封不动的打包到`dist`文件夹里面。
- [src](开发文件夹)真正的工作区。
  - [api]封装了请求相关的接口。
  - [assets]里面放置些**静态资源**(一般**共享**的)，放在`aseets`文件夹里面静态资源，在`webpack`打包的时候，会进行**编译**。
  - [components]一般放置**非路由组件**和**全局组件**。
  - [mock](数据来源的文件夹)模拟一些假的数据由`mockjs`实现的。但实际开发的时候，利用的是真实接口数据。所以该文件夹仅用于**测试项目**。
  - [icons]放置`svg`矢量图等格式的**图标**。
  - [layout]放置一些**组件与混入**，混入写的`ResizeHandler.js`大概写的是根据设备响应式调整页面大小。组件部分都是。
  - [router]配置**路由**。
  - [store]**vuex**业务逻辑与响应式数据的管理，其中`getters.js`不参与模块化得原因是：`getters`配置项是在其他所有模块中起相同作用，可以理解为**公共模块**，所以单独拿出来。
  - [style]与**样式**相关的文件。
  - [utils]共享工具脚本库。
  - [views]放置的是**路由组件**，也可以命名为`pages`，但建议`views`。
  - App.vue: 项目根组件。
  - main.js: 项目入口文件，程序最先执行的文件。
  - permission.js: 导航守卫配置文件。
  - settings: 项目配置项文件。
- babel.config.js: `babel`的配置文件。
- package.json: 缓存项目所需依赖信息，配置`"serve": "vue-cli-service serve --open"`可以运行项目的时候直接在浏览器里打开。
- package-lock.json: 缓存脚手架所需依赖的信息。

## 项目初始化配置(https://cli.vuejs.org/zh/config/)

- 根目录创建`vue.config.js`文件
  - [jsconfig.json](https://juejin.cn/post/6930549887402672135)目录中存在文件表明该目录是 JavaScript 项目的**根目录**。该jsconfig.json文件指定了 JavaScript 语言服务**提供的的根文件和选项**。说通俗一点就是改善 JavaScript 开发体验的一个配置文件。
  - 配置`lintOnSave: false`(是否在开发环境下通过`eslint-loader`在每次保存时`lint`代码。)可关闭语**严格语法校验**。
  - 配置`devServer`开发环境用到的代理服务（为了用上接口，同域无需设置）。
- 根目录创建`jsconfig.json`文件，配置`src/`路径的别名`@/*`（详情参见`jsconfig.json`文件）。

## 项目开发流程

- 通过UI原型图，先**拆分组件**，组件命名不能与`html`标签名冲突。
- 一个一个组件的开发。
- 将拆分出的组件进行**路由分析**
  - 页面布局中，发生变化的往往被拆成路由组件，观察地址栏路由与中上下结构对应的关系。
  - 路由组件有：`Home`, `Search`(搜索结果展示), `Login`, `Register`。
  - 全局组件有：`Header`（搜索页、主页、登录、注册都有）, `Footer`（登录注册页面没有）。
- **搭建路由组件**根据路由分析的结果，新建`views/pages`文件夹，在内部新建前面分析的四个路由组件。
  - 编程式路导航由与跳转路由导航的本质区别，编程式路由导航在切换路由前，可以进行业务逻辑操作。而跳转路由导航仅仅只能切换路由，不能干别的。
- 测试完一级路由组件切换没毛病后，着手路由组件实际的开发
- 获取服务器数据进行响应式呈现，组件共用数据用`vuex`管理，组件自用数据则放在自身组件。
- 从绑定事件开始写，然后逐步完成业务逻辑。
