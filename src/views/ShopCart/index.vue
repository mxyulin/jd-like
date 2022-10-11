<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <!-- 列表头 -->
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <!-- 购物车列表 -->
      <div class="cart-body">
        <ul class="cart-list" v-for="goods of cartList" :key="goods.id">
          <!-- 单选框 -->
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="goods.isChecked"
              @click="checkORnot(goods.skuId)"
            />
          </li>
          <!-- 商品 -->
          <li class="cart-list-con2">
            <img :src="goods.imgUrl" />
            <div class="item-msg">{{ goods.skuName }}</div>
          </li>
          <!-- 单价 -->
          <li class="cart-list-con4">
            <span class="price">{{ goods.skuPrice }}</span>
          </li>
          <!-- 数量 -->
          <li class="cart-list-con5">
            <a class="mins" @click="updateSkuNum(goods.skuId, goods.skuNum, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="goods.skuNum"
              @change="
                updateSkuNum(goods.skuId, goods.skuNum, $event.target.value)
              "
            />
            <a class="plus" @click="updateSkuNum(goods.skuId, goods.skuNum, 1)"
              >+</a
            >
          </li>
          <!-- 小计 -->
          <li class="cart-list-con6">
            <span class="sum">{{ goods.skuPrice * goods.skuNum }}</span>
          </li>
          <!-- 操作 -->
          <li class="cart-list-con7">
            <a class="sindelet" @click="removeGoods(goods.skuId)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <!-- 全选 -->
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckAll && cartList.length"
          @click="checkAllORnot"
        />
        <span>全选</span>
      </div>
      <!-- 微操 -->
      <div class="option">
        <a href="#none" @click="deleteSeleced">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <!-- 算账 -->
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ alreadySeleced }}</span> 件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <el-button
            class="jiesuan"
            @click="$router.replace('/trade')"
            :disabled="cartList.length == 0"
            >结算</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "lodash";

export default {
  name: "ShopCart",
  computed: {
    ...mapState("ShopCart", ["cartList"]),
    // 结算总价
    totalPrice() {
      let total = 0;
      // *数组统计，使用场景：数组内部的值做运算得到最终结果
      total = this.cartList.reduce((prev, goods) => {
        // *选中才会加入总价计算，否则没门儿
        if (goods.isChecked == 1) {
          return (prev += goods.skuNum * goods.skuPrice);
        }
        // 没选中加 0 返回
        return (prev += 0);
      }, total);
      return total;
    },
    // 是否全选
    isCheckAll() {
      // *用的少的  every 方法，做全选判定贼好用
      return this.cartList.every((goods) => {
        return goods.isChecked == 1;
      });
    },
    // 已选几件商品
    alreadySeleced() {
      return this.cartList.reduce((prev, goods) => {
        if (goods.isChecked == 1) {
          return (prev += goods.skuNum);
        }
        return (prev += 0);
      }, 0);
    },
  },
  methods: {
    // *同步加购数量，根据状态码 diff 判断操作，skuNum 是原有加购数。
    updateSkuNum: throttle(function (skuId, skuNum, diff) {
      // 根据状态码判断如何操作
      switch (diff) {
        // 如果是1直接跳出判定
        case 1:
          break;
        case -1:
          // 如果原有加购数小于减一后小于1，则说明原有加购数小于等于1，不能再减少了
          if (skuNum - 1 < 1) {
            // 并且不会增减加购数
            diff = 0;
          }
          break;
        // 其余情况：输入负数、正数（包括1）、非法输入
        default:
          // 如果用户输入非法则重置为 skuNum，意味着加购数不变
          if (isNaN(diff) || diff === "") {
            diff = 0;
          } else if (diff < 1) {
            diff = 0;
          } else {
            // 用户输入合法，就更新加购数。并计算差值
            diff = diff - skuNum;
          }
          break;
      }
      // !接口设计得跟屎一样，两个 id 类字段，孩他妈长得很像。
      // 拿到上面的计算过的差值 diff 发请求告诉服务器同步加购数
      //
      this.$store
        .dispatch("Detail/addToCart", {
          skuId,
          skuNum: diff,
        })
        // !别忘了再次拿新数据，一定要在请求成功的 onResolved 回调中发请求
        .then(() => this.$store.dispatch("ShopCart/getCartList"))
        .catch((err) => err.message);
    }, 1000),
    // checkORnot
    checkORnot(skuId) {
      this.cartList.forEach((goods) => {
        if (goods.skuId == skuId) {
          let isChecked = -1;
          goods.isChecked == 1 ? (isChecked = 0) : (isChecked = 1);
          this.$store
            .dispatch("ShopCart/changeIsChecked", {
              skuId,
              isChecked,
            })
            .then(() => {
              // !别忘了再次拿新数据，一定要在请求成功的 onResolved 回调中发请求
              this.$store.dispatch("ShopCart/getCartList");
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      });
    },
    // *全选或者全不选，和删除商品选中的商品同理：派发一个actions发多个请求，通过promise.all知晓结果
    checkAllORnot() {
      this.$store
        .dispatch("ShopCart/checkAllORnot", this.isCheckAll)
        .then(() => this.$store.dispatch("ShopCart/getCartList"))
        .catch((err) => console.log(err.message));
    },
    // 删除商品
    removeGoods(skuId) {
      if (confirm("确定删除此商品？")) {
        this.$store
          .dispatch("ShopCart/deleteCartGoods", skuId)
          .then(() => {
            this.$store.dispatch("ShopCart/getCartList");
          })
          .catch((err) => {
            alert("删除失败", err.message);
          });
      }
    },
    // *删除商品选中的商品
    deleteSeleced() {
      if (confirm("是否删除所选商品？")) {
        this.$store
          .dispatch("ShopCart/deleteSeleced")
          .then(() => this.$store.dispatch("ShopCart/getCartList"))
          .catch((err) => console.log(err.message));
      }
    },
  },
  mounted() {
    // console.log(throttle)
    this.$store.dispatch("ShopCart/getCartList");
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 17%;
        }

        .cart-list-con2 {
          width: 33%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 9.6%;
        }

        .cart-list-con5 {
          width: 16.2%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 11.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
            &:hover {
              background-color: #ea4a36;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        .jiesuan {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
        .el-button.is-disabled,
        .el-button.is-disabled:focus,
        .el-button.is-disabled:hover {
          color: #c0c4cc;
          cursor: not-allowed;
          background-image: none;
          background-color: #fff;
          border-color: #cbd1e0;
        }
      }
    }
  }
}
</style>
