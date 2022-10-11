<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑展示 -->
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeBread('categoryName')">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeBread('keyword')">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeBread('trademark')">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, idx) of searchParams.props"
              :key="idx"
            >
              {{ attr.split(":")[1]
              }}<i @click="removeBread('props', idx)">×</i>
            </li>
          </ul>
        </div>
        <!-- SearchSelector  -->
        <SearchSelector
          :slectorInfo="{
            attrsList,
            trademarkList,
          }"
          @getTmInfo="getTmInfoHandler"
          @getAttr="getAttrHandler"
        />
        <!--details-->
        <div class="details clearfix">
          <!-- 排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: order }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="order"
                      :class="`iconfont icon-long-arrow-${towards}`"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: !order }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="!order"
                      :class="`iconfont icon-long-arrow-${towards}`"
                    ></span
                  ></a>
                </li>
                <!-- <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li> -->
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods of goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link
                      :to="`/detail/${goods.id}`"
                      :title="goods.title"
                      >{{ goods.title }}</router-link
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <!-- 收藏或加入购物车 -->
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器组件 -->
          <Pagination :pageInfo="{ pageNo, pageSize, total, continues: 5 }" />
        </div>
        <!-- hot sale -->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "@/views/Search/SearchSelector";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";

export default {
  name: "Search",
  components: {
    SearchSelector,
    Pagination
  },
  data() {
    return {
      // *初始搜索参数对象，能存放面包屑
      searchParams: {
        categoryName: undefined,
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        keyword: undefined,
        props: [],
        trademark: undefined,
        order: "1:desc",
        pageNo: 1,
        pageSize: 20,
        total: undefined,
      },
    };
  },
  computed: {
    ...mapGetters("Search", [
      "goodsList",
      "attrsList",
      "trademarkList",
      "pageNo",
      "total",
      "pageSize",
    ]),
    // 计算排序属性值
    order: {
      get() {
        return this.searchParams.order.indexOf("1") != -1;
      },
      set(newVal) {
        // 激活按钮，不是 1 就是 2
        this.searchParams.order = this.searchParams.order.replace("1", newVal);
        this.searchParams.order = this.searchParams.order.replace("2", newVal);
      },
    },
    // 排序方向
    towards: {
      get() {
        return this.searchParams.order.indexOf("desc") != -1 ? "down" : "up";
      },
      set(newVal) {
        // 控制升序降序
        this.searchParams.order = this.searchParams.order.replace(
          "desc",
          newVal
        );
        this.searchParams.order = this.searchParams.order.replace(
          "asc",
          newVal
        );
      },
    },
  },
  watch: {
    // *监听路由更新（第一次进入和刷新页面时）
    $route: {
      immediate: true,
      // deep: true,
      handler() {
        // 写入面包屑
        // !并且一定要用浅复制进行数据缓存，因为直接引用 this.$route 的路由信息
        // !写入时，实质上修改的是 this.$route
        this.searchParams = Object.assign(this.searchParams, {
          ...this.$route.query,
          ...this.$route.params,
        });
        // 开捞
        this.getGoodsList();
      },
    },
  },
  methods: {
    // *及时更新路由，防止页面刷新时重置路由丢失面包屑数据(只有清理面包屑和排序用得到)
    updateRoute(query, params) {
      this.$router.replace({
        name: "search",
        query,
        params,
      });
      // console.log('路由已更新')
    },
    // *捞商品列表数据
    getGoodsList() {
      this.$store.dispatch("Search/getGoodsList", {
        ...this.searchParams,
      });
    },
    // *清理指定的面包屑
    removeBread(breadName) {
      // *移除被选中的不需要的面包屑
      switch (breadName) {
        case "categoryName":
          this.searchParams.categoryName = undefined;
          this.searchParams.category1Id = undefined;
          this.searchParams.category2Id = undefined;
          this.searchParams.category3Id = undefined;
          this.getGoodsList();
          // 还要同步清理路由中的参数，让路由参数同步面包屑
          this.updateRoute(
            {
              categoryName: undefined,
              category1Id: undefined,
              category2Id: undefined,
              category3Id: undefined,
            },
            { ...this.$route.paramss }
          );
          break;
        case "keyword":
          this.searchParams.keyword = undefined;
          this.$bus.$emit("clearInput");
          // 还要同步清理路由中的参数，让路由参数同步面包屑
          this.getGoodsList();
          this.updateRoute(
            {
              ...this.$route.query,
            },
            { keyword: undefined }
          );
          break;
        case "trademark":
          this.searchParams.trademark = undefined;
          this.getGoodsList();
          break;
        case "props":
          // *利用 arguments 对象得到第二个参数，也就是 props 元素的索引值
          this.searchParams.props.splice(arguments[1], 1);
          this.getGoodsList();
          break;
      }
    },
    // *增加一个商标面包屑，并捞到过滤后的数据
    getTmInfoHandler(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getGoodsList();
    },
    // *增加一个售卖属性面包屑，并捞到过滤后的数据
    getAttrHandler(id, attrVal, attrName) {
      // console.log(id, attrVal, attrName)
      if (this.searchParams.props.indexOf(`${id}:${attrVal}:${attrName}`) == -1)
        this.searchParams.props.push(`${id}:${attrVal}:${attrName}`);
      this.getGoodsList();
    },
    // *商品列表排序
    changeOrder(num) {
      // 升降序和按钮激活判断不一样，升降序
      let oringinTowards = this.searchParams.order.split(":")[0];
      if (num == oringinTowards) {
        // 如果点击的是激活的按钮，排序取反
        this.towards = this.towards == "down" ? "asc" : "desc";
      } else {
        // 如果点击的是未激活的按钮，则激活此按钮且默认降序
        this.order = num;
        this.towards = "desc";
      }
      // 最后不要忘了请求排序后的新数据
      this.getGoodsList();
    },
  },
  // beforeCreate() {
  //   console.log("重新初始化", this.$route);
  // },
};
</script>

<style lang="less" scope>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  // i {
                  //   margin-left: -5px;
                  // }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  // i {
                  //   margin-left: -5px;
                  // }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
