<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 | 事件委托 -->
      <div @mouseleave="laeveHandler" @mouseenter="showList">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡类名是 name!!! -->
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <!-- 事件委派 | 事件委托 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, idx) of baseCategoryList"
                :key="c1.categoryId"
                @mouseenter="showColor(idx)"
                :class="{ cur: currentIdx === idx }"
              >
                <h3>
                  <a
                    :data-Cname="c1.categoryName"
                    :data-Clevel1="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix" v-show="currentIdx === idx">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 of c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-Cname="c2.categoryName"
                          :data-Clevel2="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 of c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-Cname="c3.categoryName"
                            :data-CLevel3="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">进品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { debounce } from "lodash";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIdx: -1,
      isShow: this.$route.meta.showList,
    };
  },
  computed: {
    ...mapState("Home", ["baseCategoryList"]),
  },
  methods: {
    // *函数防抖
    showColor: debounce(function (idx) {
      this.currentIdx = idx;
      // !时间不要设置太大了，不然反应效果慢，还以为不起作用
    }, 10),
    // 路由切换
    goSearch(e) {
      // *利用自定义属性的有无判定是否 <a> 元素触发的点击事件。
      if (!e.target.dataset.cname) return;
      // *通过 e.target.dataset 拿到自定义属性
      // !请注意DOM自定义属性会被 dataset 转换为小写
      const { cname, clevel1, clevel2, clevel3 } = e.target.dataset;
      // const query = { cname }
      // 数据分类（老师写法已废除）
      // if (clevel1) {
      //   query.clevel1 = clevel1;
      // } else if (clevel2) {
      //   query.clevel2 = clevel2;
      // } else {
      //   query.clevel3 = clevel3;
      // }
      const location = {
        name: "search",
        query: {
          categoryName: cname,
          category1Id: clevel1,
          category2Id: clevel2,
          category3Id: clevel3,
        },
      };
      this.$router.push(location);
    },
    // 以下路由组件，展示整个分类列表
    showList() {
      switch (this.$route.name) {
        case "search":
          this.isShow = true;
          break;
        case "detail":
          this.isShow = true;
          break;
      }
    },
    // *鼠标移除事件做了两个任务
    laeveHandler() {
      // 鼠标移除，currentIdx 初始化
      this.currentIdx = -1;
      // 以下路由组件，鼠标移除隐藏整个分类列表
      switch (this.$route.name) {
        case "search":
          this.isShow = false;
          break;
        case "detail":
          this.isShow = false;
          break;
      }
    },
  },
};
</script>

<style lang="less" scope>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        user-select: none;
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // 二三级分类列表
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }

          // 简单的 CSS 写法，但不能满足鼠标移到兄弟元素 h2 上时，仍然保持选中状态的需求（呵呵）
          // &:hover {
          //   background-color: skyblue;
          // }
        }
        // 麻烦的鼠标事件控制样式
        .cur {
          background-color: skyblue;
          cursor: pointer;
        }
      }
    }

    .sort-enter {
      height: 200px;
    }
    .sort-enter-active {
      transition: all 0.1s linear;
    }
    .sort-enter-to {
      height: 461px;
    }
  }
}
</style>
