# SPH-项目正式开发

- [静态组件开发]：
  1. 别忘了加上图片等静态资源（如果是拆分静态页面不加引入的资源编译会报错）。
  2. 别忘了用`reset.css`清理浏览器默认样式，在`index.html`中引入即可。
  3. 碰见拆分的组件样式是`.less`格式，则需要`npm install --save less less-loader@5`(需要安装老版本 5.x 才可兼容 vue2.x)安装`less`的编译插件，这样才能编译成浏览器认识的`css`代码。
- [路由组件开发]：

  1. 配置路由：新建`routers`文件夹，里面新建`index.js`写入路由配置。并且注意设置初始`/`或`*`路由的重定向。
  2. 安装路由：然后别忘了在`main.js`里面安装路由配置。
  3. 使用路由：在`App.vue`里面引入并使用路由组件。
  4. 易犯错误：在`App.vue`里面安装路由的时候下面的代码是**错误写法**：

  ```js
  import vueRouter from "@/router";
  // 正确👉 import router from '@/router'

  new Vue({
    render: (h) => h(App),
    vueRouter, // 正确👉 router
  }).$mount("#app");
  ```

- [路由组件的显示与隐藏]:
  - `Footer`组件在登录注册时要被隐藏。
  - 思路：给每个路由组件设置`meta`原信息并且使用指令`v-show`对`Footer`组件进行隐藏。
- 路由传参**坑点**：使用对象传参数
  - 传`query`对象时，路由不用命名直接通过`props()`函数发给下一个路由组件。
  - 传`params`对象时，路由不但要设置**占位符**而且还要**命名**才行。然后通过`props: true`发给下一个路由组件。
- [路由传参相关面试题]:
  1. 路由传递参数(对象写法)`path`属性是否可以结合`params`参数对象一起使用?---不能
  2. 如何指定`params`参数可传可不传?
     1. 指定了占位符要传`params`，如果不传，地址栏会**吞掉路由**。解决办法：占位符后面加上一个`?`即可。加`?`的原理是正则表达式中`?`后面的字符出现 0 次或 1 次。
  3. `params`参数可以传递也可以不传递，但是如果传递是空串，如何解决?
     1. 指定了占位符要传`params`，如果传入**空串**，地址栏也会**吞掉路由**。解决办法：`params: { ''||undefined}`在要传入的参数后面加上**或运算符**和`undefined`。
  4. 路由组件能不能传递`props`数据?---能，三种写法：布尔值、对象、函数。
  5. [提示]: **实际开发**中路由组件接收参数都是用的`$route.params`或`$route.query`。像上面提到的`props`三种方法很少使用。
- [重新封装]`$route.push`和`$route.replace`
  - 目的：解决编程式路由导航，多次执行路由跳转会**报错**的行为。
  - 原因：`$route.push()`和`$route.replace()`返回的是一个`promise`对象，而我们在使用`push`和`replace`方法时并没有传入余下的`resolve`和`reject`参数，所以会报错。
  - 解决方法：重新封装---详情见`@/router/index.js`里面的重写`push/replace`。

## Home 模块开发

- 三级联动组件是 Home, Search, Details 共用的组件，所以要拆分为**全局组件**。
- 全局组件在`main.js`中进行注册。后面在其他组件中使用无需再引入。
- 搬砖：Home 模块的其他子组件按照拆分组件的流程进行，最后会得到整个**静态组件**。
- [提醒]: 全局组件请务必放在**components**文件夹下。

## 二次封装 axios

- 为何要二次封装`axios`？
  - 将`axios`二次封装成**请求拦截器**，可以在发送请求前处理一些业务。
  - 将`axios`二次封装成**响应拦截器**，可以在得到响应后处理一些业务。
  - 最终目的是为 API 统一管理服务，也就是会被引入`api/index.js`
  - [提示]: 具体封装代码见`@/api/request.js`。

## API 的统一管理

- 利用二次封装的`axios`创建`api/index.js`模块，对所有接口进行统一管理。
- 模块设计：把每个接口写成函数，然后再暴露。这样不论哪个组件像使用这个接口发请求直接，引入此模块再调用此接口函数即可。
- [建议]:开发中小的项目建议直接利用**钩子函数**`mounted`发请求，不用做 API 统一管理。而大的项目必须写 API 管理模块，才能有效管理成百的接口。

## 解决跨域问题

- 利用脚手架**代理服务器**：`vue.config.js`配置项`devServer`，详情看文件代码。
- 其他方法：jsonp, cros
- [易犯错误]:配置了`vue.config.js`代理服务器，但未重新`npm run serve`。

## 开发进度条

- 安装：进度条使用一个插件库`nprogress`，先`npm i nprogress`下载。
- 使用：在`@/api/request.js`的拦截器里使用。先引入`nprogress`插件，再引入`nprogress.css`。然后在请求拦截器中调用`nprogress.start()`让进度条动起来，再在响应拦截器中响应成功时调用`nprogress.done()`，完成进度条动画。
- [提醒]: 若不满意样式可以修改`nprogress.css`。

## vuex 状态管理器

- 安装：`npm i vuex@3`安装 3.x 版本是为了兼容 vue2.x。
- 配置：参考张天禹教程的`README.md`中`vuex`配置流程。
- 使用：大项目必定 vuex 模块化开发，中小项目视情况可非模块开发，微小项目可不用 vuex。

## 完善分类列表

### 开发一级分类列表的选中背景色

- 第一种方式：伪类选择器`hover`添加样式。
- 第二种方式：化简为繁，绑定鼠标事件`mouseenter`, `mouseleave`。
  - 原理：利用 事件委派 | 事件委托 添加一个父元素`<div>`，给父元素盒子分派事件
  - 然后给一级分类列表元素绑定一个`:class="{cur: currentIdx === idx}"`利用添加类名来展示样式。
- 开发二三级分类列表中的显示与隐藏：
  - 原理：同上原理
  - 不同的时二三级分类列表元素绑定的是`:style="{ display: currentIdx === idx ? 'block' : 'none' }`
- [我的博客园-用事件委托优化性能的好处](https://www.cnblogs.com/mxyulin/diary/2022/08/04/16551507.html#%E7%94%A8%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98%E4%BC%98%E5%8C%96%E6%80%A7%E8%83%BD)

### 浏览器的卡顿现象[使用频率高，面试也会问]

- 问题：用户输入过快，浏览器接收用户输入不完整（俗称反应不过来），类似的有鼠标瞬间划过菜单或列表，但被触发的只有几个选项。
- 卡顿现象原理：
  - 正常:事件触发非常频繁，而且每一次的触发，回调函数都要去执行(如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿)
  - 解决办法：
    - [防抖]在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发。
      - [方法]使用`lodash`插件提供的`_.debounce(func, [wait=0], [options=])`方法。自己也可以封装，但得深刻理解闭包和延迟器。
    - [节流]前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发只会执行一次。比如轮播图，为了防止用户连续点击切换过快，可以通过防抖设置 0.1 秒内只能触发一次切换。
      - [方法]使用`lodash`插件提供的`_.throttle(func, [wait=0], [options=])`方法。自己也可以封装，但得深刻理解闭包和延迟器。
- [实际解决一级分类列表卡顿现象]`node_modules`里已经有库依赖过`lodash`，所以不需要重复下载了，直接引用即可。
- 按需引入，优化项目打包体积`import { debounce } from "lodash"`
- [注意点]: 时间不要设置太大了，不然反应效果慢，还以为不起作用。

### 三级分类列表组件的路由和传参

- [使用 router-link 做路由跳转]，可以完成路由跳转和传参的业务，但是！
  - [缺点1]: 不能做路由上的业务逻辑（包括路由组件两个独有钩子、3个路由守卫、2个组件内路由守卫内的业务处理）
  - [缺点2]: 其实`router-link`本质是组件，如果数据循环出的列表有1000+个分类，那就会有1000+个迷你组件，搞死你的计算机不是问题。
- [使用编程式路由导航做路由跳转]，可以完成路由跳转和传参的业务以及其他业务逻辑。
  - [方法 1]利用编程式路由导航 + 事件委派，可以给父元素只绑定一个事件，利用事件冒泡让所有子元素可以触发此事件。
    - [存在的小问题]：我们的需求是，用户点击三级分类列表`<a>`标签才冒泡，但是其他子节点`<h3>`, `<dt>`, `<dl>`, `<em>`也会触发冒泡
    - [解决小问题]：给`<a>`标签添加自定义属性`:dataCName="c1.CategoryName"`和`:dataCLevel="c1.categoryId"`，二三级以此类推。原理相当于服务器得知道你是“几年级，什么名字”，才能返回对应的详情页数据。

### 三级分类列表的显示与隐藏

- 给`<h2>`绑定鼠标移入移出事件，利用路由`meta`和路由路径判断分类列表的一开始是显示还是隐藏。
- [警告]: 做过渡动画的类名是`name=xxx`而不是`class=xxx`。
- [警告]: 不要把绑定的响应式数据名字写错了！！！，不要钻牛角尖，先检查拼写错误再检查逻辑错误。不然后还以为碰到了不得了的bug！！！

### 合并参数

- [需求或目的]类似淘宝分类列表和搜索的关系，点击搜索会携带分类列表的数据帮助**数据筛选**。
- 解决方法：利用`$route`获取分类列表的数据，然后在切换路由前添加至请求的`location`对象。

### 知识点总结

- 知识点和思路

  1. [解决跨域问题]代理服务器, cros, jsonp, 图片探测。
  2. [浏览器卡顿问题]回调函数的防抖与节流。
  3. [路由跳转的两个方式]:声明式导航(router-link) 、编程式导航。
  4. [事件委派+自定义属性]解决三级分类列表编程式导航跳转问题。
  5. [二次封装 axios]请求拦截器、响应拦截器。

- 面试高频问题
  1. 路由传参相关面试题 👆
  2. [面试频率很高]回调函数的防抖与节流。
  3. [解决跨域问题]代理服务器, cros, jsonp, 图片探测。

## 开发 ListContainer 组件（Floor 组件同理）

### 使用 mock

- **mockjs**拦截`ajax`请求，生成随机数据，响应这些生成的模拟数据（[mockjs 文档](http://mockjs.com/0.1/)）。
- 大概用法：
  1. npm 下载依赖。
  2. 新建`@/mock`文件夹，把要返回的静态数据写成`json`文件放进去。
  3. 把静态资源（图片等等）放进`public/images`文件下，因为`public/`相当于项目根目录。
  4. 配置`mockServer.js`：先引入`mockjs`工具库，再引入第 1 步的静态数据，然后写`Mock.mock('mock/banner', {code: 200, data: banner});`配置`mockServer`响应。
  5. [提醒]: 这一步很关键：mockServer.js必须在脚本入口main.js引入执行一次才能拦截ajax请求！！！（mock原理是重写底层xhr）
  6. [警告]: mockServer.js里的拦截路径一定要写/mock而不是mock，不然mock拦截不到请求
  7. 配置`mockRequests.js`：把`requests.js`代码复制进来，然后**修改**这个配置：`baseURL: "/mock"`。相当于`mock`版本的二次封装`axios`。
  8. 把`mockRequests.js`引入`api/index.js`，然后请求`mock`数据就得`export const reqBanner = () => mockRequests({ method: 'get', url: '/banner',})`。其他`mock`请求以此类推。

### 使用 swiper

- 下载依赖`npm i swiper@5.2.0`和`npm i vue-awesome-swiper@4.1.1`，这俩插件必须下载指定的版本，因为`swiper`是个怪东西，大版本更新后语法变化得比较多，再加之中文文档内容不够全，所以**坑很多**。若是下载`swiper@5.x`到`vue@2.x`脚手架多半会报错。
- 全局配置：先在`main.js`中全局引入并安装`vue-awesome-swiper`，还要引入`swiper/css/swiper`样式
- [轮播图按钮消失之谜]: 原来是没给两个`swiper-button-xxx`指定`slot`插槽属性。
- 轮播图+左右按钮+分页按钮参考路由组件`ListContainer`内的代码。
- [swiper轮播图关键点]: 必须保证先有数据生成得结构，swiper才能用结构生成轮播图。如果光有数据，没有结构，那swiper就废了。
- [$nextTick 解决]`$nextTick`类似于（胜过）生命钩子`updated`只不过操作 DOM 也可以使用它，并且它比`updated`更自由。
- 基本用法建议参考[基于 vue2 使用 vue-awesome-swiper 轮播图（踩坑记录）](https://www.136.la/nginx/show-244014.html)

## 开发 Search 组件

- 发请求时用`Object.assign()`对请求对象进行浅复制，目的是按服务器需求补全整理好所有请求参数，请求参数可设置为`undefined`。
- [面包屑结构]: 开发思路有
  - 面包屑容器：~~`Search`组件`data`配置项内写一个`bread: {}`。~~
  - 缓存面包屑：只要路由一更新发起新的请求，就立刻更新面包屑缓存。因为此时的路由必然是更新过的，并且`bread`缓存路由的数据必须使用**浅复制**，因为后面会修改`bred`，但路由的数据只读。
  - 展示面包屑：使用`v-if`判定面包屑的是否存在来展示某条面包屑。
  - 移除面包屑：绑定事件，给回调传入要删除的面包屑名字。
  - 回调逻辑：先封装一个编程时路由导航`push`的函数，用于写入新的路由信息。接下来用`switch`判断包屑名字来清理不需要的面包屑。
  - [面包屑本质]: 是请求参数，目的是为了告诉服务器需要哪些数据，让服务器在后端筛选好了返回给前端，而面包屑展示的就是用户筛选的条件标签。(面包屑类型：数据种类、搜索关键词、数据属性词条等等)
- [开发排序]
  - 按钮激活状态靠的是初始参数`order: '1:desc'`，通过计算属性`this.initParams.order.indexOf('1') != -1;`来判断哪个被按钮激活。
  - 箭头`v-show="order"`显示隐藏，矢量图去[阿里图标库](https://www.iconfont.cn/)找。然后在`index.html`CDN 在线引入。箭头方向也是利用类名的改变去改变朝向。
  - 写按钮逻辑：通过是否有`class="active"`控制按钮是否激活。切换按钮时，被激活的另一个按钮默认降序。被激活的按钮再次点击则改变排序。[代码](src\views\Search\index.vue)
  - 最后别忘了合并初始请求参数和新的面包屑数据，得到新的`query`参数然后更新路由发起新的请求。

### 开发 Search 组件的分页器（重点功能）

- [分析页码器需要的组件数据]由于一个企业项目可能数据有上万条甚至更多，所以不需要前端一次性拿完所有数据再分页展示。而是通过分页器按需请求一页一页的数据进行展示。一个分页器至少需要三个关键数据：页码`pageNo`（当前所在页）、数据总数`total`、一页展示数据的条数`pageSize`。
  - [需要前端计算的一个数据]页码总数`pageTotal`。**总页数 = 数据总数 / 一页展示数据的条数**。
  - [分页器设计的特点]分页器一般连续的页码（页码小方块）是奇数个`continues`：5 或者 7。因为奇数对称，美观。
  - 总结一共需要这些数据：页码`pageNo`, 数据总数`total`, 一页展示数据的条数`pageSize`, 页码总数`pageTotal`(计算出的), 连续的页码个数`continues`。
- [分页器开发思路]
  - 开发前期不需要用分页器数据和服务器通信，只需要用假数据本地一步一步调试成功即可。
  - [分页特殊情况处理]如果是 5 个分页器（中括号标记当前页）：
    - 起始页溢出
      - 当前页`pageNo = 1`，那么分页器：-1 0 [1] 2 3，修正为 [1] 2 3 4 5
      - 当前页`pageNo = 2`，那么分页器：0 1 [2] 3 4 修正为 1 [2] 3 4 5
      - 解决办法：判断起始页如果小于 1，就修正页码器。
    - 结尾页溢出
      - 结尾页`end = 33`，总页数`paegTotal = 31`那么分页器：29 30 [31] 32 33，修正为 27 28 [29] 30 31
      - 解决办法：结束页大于总页数，就修正页码器。
  - 分页器动态展示（分为上中下）
    - 中间部分需要`vbfor`遍历数字，建议单独写一个数组在`computed`里用于遍历，而不是老师那种`v-for`和`v-if`一起使用。
    - 页码按钮动态样式通过当前页码`pageNo`，是否等于页码按钮的值来确定。
    - 绑定页码点击事件，给回调传递一个自定义属性`:data-pageId="按钮页码值"`
    - 通过回调更新路由发请求，拿对应页面商品数据。
    - 上一页、下一页按钮通过`pageNo - 1`, ` pageNo ```js + 1 `来处理，具体逻辑看代码[全局页码组件](src\components\Pagination\index.vue)
    - 遗忘了个小功能：是否禁用上一页、下一页按钮，是的话`disabled: true`。

## 开发 Detail 组件

- 先注册`/detail`路由，然后别忘了写占位符，后面页面跳转传商品 ID 会用到。
- [遇到问题]: `a`标签改为`router-link`标签，会导致商品图片和商品title渲染不出来
  - 解决办法：原来是把`:to`写成`:go`，我是 SB
- 滚动行为控制：通过路由器配置`scrollBehavior`控制跳转此路由时网页的纵向、横向位置。

  ```js
  scrollBehavior (to, from, savedPosition) {
    // savedPosition 意思是维持上个  页面位置
    return savedPosition || { x: 0, y: 0 }
  }
  ```

- 商品详情页轮播图小组件中，轮播图配置`loop: true`不能和点击事件共用。因为`loop: true`配置项会波坏数组结构，让被循环出的元素无法绑定点击事件。
- [放大镜图片定位器]: 利用鼠标定位`offsetX,offsetY`以及绝对定位`left,top`来计算遮罩层和放大图片的偏移量、偏移方向。
  - [遮罩层间距就按原理](public\images\QQ截图20221006155551.png)
    - 只读属性`offsetX`规定了事件对象与目标节点的内填充边（padding edge）在 X 轴方向上的偏移量。
  - [放大镜图片原理](src\views\Detail\Zoom\index.vue)请看代码和注释。
- [处理非法输入]针对加购数量做输入验证：

  - 当用户输入非法字符`NaN`重置为 1。
  - 当用户输入小于零（负数）的时候取反再`parseInt()`取整。
  - 其他正常输入（就算输入小数）`parseInt()`则取整。
  - 自己写的仿京东输入限制代码：

    ```js
    //绑定 keyup 事件
    changekuNum(e) {
      // 非法和空串重置 1
      let val = e.target.value;
      if (isNaN(val) || val == "") return (this.skuNum = 1);
      // 负数取正整
      if (val < -1) return (this.skuNum = parseInt(-val));
      // 正数取整
      this.skuNum = parseInt(val);
    },
    ```

- 加入购物车成功组件的数据需要会话存储，也就是`sessionStorage`

- 面试高频问题
  - [本地存储和会话存储]
    - 本地存储`localStorage`持久存储
    - 会话存储`sessionStorage`非持久存储

## 开发购物车组件（重点）

- [功能和数据决定项目结构]购物车组件不用新建状态库，因为`Detail`库的商品详情数据和游客临时`id`，在点击加入购物车时，购物车组件也会访问商品详情数据。
- [身份验证]`uuid`，一个好用的唯一`id`生成库。
- [项目工具]: `utils`文件夹一个专属于项目的**功能工具模块**，常放置身份验证、正则表达式、临时身份等功能性脚本模块。
- [封装游客身份模块]新建一个`uuid_token.js`用于`$store`的`ShopCart`模块做身份验证。
- [单例模式-游客身份]设计思路：工具模块中引入`import { v4 as uuidv4 } from 'uuid'`，先去`localStorage`拿游客身份`id`没有就新生成一个，再`setItem()`写入`localStorage`长期保存。**最后别忘**`return uuid_token`。
- [关键步骤]: 不管是仓库(store)还是工具(utils)的脚本都是可以对外暴露，在其他组件或脚本中引入并使用。
  - [请求拦截器设置请求头]: 在拦截器中引入`Detail`库，然后拿到它保存的`uuid_token`。然后给请求头设置`config.headers.userTempId=uuid_token`字段即可。
  - [usertempid]: 是和后端开发人员主导约定的请求头必带字段，用于确定唯一游客身份（请注意约定头部字段的单词要写正确）。
- ~~第一次听说的 API: `Array.prototype.every()`~~
- [加购数量的增减]：三个 DOM 绑定同一个事件，派发同一个`action`。逻辑小繁琐，我用了`switch`判定其中一个变量来确定触发的哪个事件。这个需求是**限制用户输入**的同时还要拿到输入框**之前的值**，以及输入框新的值（或**新旧之差**），再计算出差值用于派发请求更新商品加购数量。[代码详情](src\views\ShopCart\index.vue)
- [promise的坑]: 状态库写入了新数据，而页面没有第一时间渲染新数据？
  - 一定要在请求成功（返回的`promise`）中的`onResolved`回调中**再发拿数据的请求**，因为？？？
  - 这种任务，`actions`里的回调请求成功，一定要返回非空字符串和请求失败抛出一个错误。这样组件才能通过`.then()`和`.catch()`知道任务成功没，成功马上捞数据渲染到页面上。
  - [代码详情](src\views\ShopCart\index.vue)
- 删除选中功能稍微有点麻烦，是因为只有删除一个商品的接口。解决思路：派发一个`action`，然后调用 N 次单删接口删除所选商品。
  - [解决办法]: 小仓库---context，能够访问自己的actions,mutations,state，利用小仓库单次派发，多次请求。
- [总结]购物车组件和搜索组件的内容写得不错，值得细细品味。

## 注册登录组件开发（重点）

- 登录注册模块合并为`User`，参考依据：数据相似度高。
- [登录验证码]，前端只管发请求拿验证码，让用户输入。提交表单给服务器的时候带上就行。
- [表单验证]统一处理
- [token]令牌验证：
  - 相当于服务器分配给用户客户端的一个`uuid`
  - 客户端需要通过`token`验证，才能拿服务器数据。
  - `vuex`仓库数据非持久化，一刷新或者路由跳转就没有了。`token`需要长期存在，所以必须存储在`localStorage`里
  - 用户登陆后的操作请求携都会携带`token`，如果过期用户操作请求会失败并跳转至登录页让用户重新登录获取新的`token`。
- [携带 token]拦截器`config.hearders.token = localStorage.sph_token`给请求头设置`token`。
  - 用户登录成功并跳转至`Home`页，`Home`页一挂载就可以请求用户信息，并把用户信息保存到`User`库，这样所有组件都可以访问到用户信息了。
  - [token放在哪？]: 如果是公司内部后台项目（限制在内网中使用），那么`localStorage`即可。
  - 如果 token 过期肯定是后台返回过期的状态码,然后判断状态码去清除本地存储 token,让用户重新登录。
  - [token 过期]使用`Token`方式调用 OCR 服务返回 401 状态码，表示`Token`已经过期。
  - 有 token 就一定登录了？
- [退出登录]退出登录必须发请求告诉服务器**销毁 token**，然后清空本地`token`和仓库的用户信息。
- [路由守卫]:
  - 用户登录后，不能再往登录页跳转了。`login`路由独享守卫，进行限制。
  - [全局路由守卫的用处]针对`token`检查三件事：有没有`token`、`token`是否过期、还要判断没有用户信息？
- [next]: 一定要调用该方法来`resolve`这个钩子。
  - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  - next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
  - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
  - next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
- [统一表单验证]：

  - 安装`vee-validate`插件(plugins 独立安装)
  - 配置方法:

    ```js
    import vue from "vue";
    import veeValidate from "vee-validate";
    // 引入中文
    import zh_CN from "vee-validate/dist/locale/zh_CN";
    vue.use(veeValidate);

    veeValidate.Validator.localize("zh_CN", {
      messages: {
        ...zh_CN.messages, // 提示信息设置为中文
        is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，确认密码相同。
      },
      // 通过组件中的输入元素 name 属性去绑定以下属性。比如 name="phone"
      attributes: {
        // 设置输入框提示的字段名字为中文
        phone: "手机号",
        code: "验证码",
        password: "密码",
        twicePassword: "确认密码",
        isChecked: "协议",
      },
    });
    ```

  - 组件中使用：

  ```html
  <input
    type="text"
    placeholder="请输入你的手机号"
    v-model="phone"
    name="phone"
    v-validate="{ required: true, regex: /^1\d{10}$/ }"
    :class="{ invalid: errors.has('phone') }"
  />
  <span class="error-msg">{{ errors.first("phone") }}</span>
  ```

  - 用到的正则：手机号`/^1\d{10}$/`、密码`/^[0-9A-Za-z]{8,20}$/`、

## 登录业务逻辑核心---全局路由守卫判定登录与否后的一系列操作

  ```js
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
  ```

## 支付模块开发（重点）

- [element-UI]按需引入：
  - 按需引入需要[插件](babel-plugin-component)`npm install babel-plugin-component -D`，并在[文件](main.js)中写入`element-ui`官方给的配置项。别忘将`es2015`修改成`@babel/preset-env`修改过后重新启动就可以了。
  - [按需引入参考](https://juejin.cn/post/7033926741362114574)
  - 两种组件注册方式：`vue.use(Message, Button)`, `Vue.prototype.$message = Message;`。
  - 不要忘了引入`import "element-ui/lib/theme-chalk/index.css"`UI样式库。
- 支付的业务逻辑与交互逻辑。
  - 业务逻辑：
    1. 点击购物车**结算**按钮，跳转至**提交订单**页。
    2. 如果购物车**为空**则结算按钮为不可选。
    3. 用户选择地址和支付方式后，点击**提交订单**跳转至**支付页面**
    4. 然后在支付页面完成付钱。
  - 交互逻辑：
    1. 点击支付后弹出二维码，让用户支付。
    2. 如果支付成功则自动跳转至支付成功页面，并弹出---成功提示信息。
    3. 如果支付失败则弹出---失败提示信息。
    4. 如果支付过程中用户无法点击点击---已支付，但可以点击---支付遇到问题。

## 图片懒加载和路由懒加载

- 该功能由插件`vue-lazyload`提供
- 路由懒加载其实就是**路由按需引入**
  - 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
  - 语法`{path: xxx, component: () => import('@/views/xxx') }`

## 完结撒花

- 项目打包中的[.map](开发用的错误提示工具)可以消除掉，通过设置
