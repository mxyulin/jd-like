<template>
  <div class="clearfix selector">
    <!-- 品牌商标栏 -->
    <div class="type-wrap logo">
      <div class="fl key">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <!-- 商标列表 -->
          <li
            v-for="trademark of slectorInfo.trademarkList"
            :key="trademark.tmId"
            @click="sendTmInfo(trademark)"
          >
            {{ trademark.tmName }}
          </li>
          <!-- 废弃的品牌商标 -->
          <!-- <li><img src="./images/phone06.png" /></li>
          <li><img src="./images/phone07.png" /></li>
          <li><img src="./images/phone08.png" /></li>
          <li><img src="./images/phone09.png" /></li>
          <li><img src="./images/phone10.png" /></li>
          <li><img src="./images/phone11.png" /></li>
          <li><img src="./images/phone12.png" /></li>
          <li><img src="./images/phone12.png" /></li>
          <li><img src="./images/phone14.png" /></li>
          <li><img src="./images/phone01.png" /></li>
          <li><img src="./images/phone06.png" /></li>
          <li><img src="./images/phone07.png" /></li>
          <li><img src="./images/phone02.png" /></li> -->
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 商品属性筛选列表 -->
    <div
      class="type-wrap"
      v-for="attrs of slectorInfo.attrsList"
      :key="attrs.attrId"
    >
      <div class="fl key">{{ attrs.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li
            v-for="(attrValue, idx) of attrs.attrValueList"
            :key="idx"
            @click="sendAttr(attrs.attrId, attrValue, attrs.attrName)"
          >
            <a>{{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchSelector",
  props: ["slectorInfo"],
  methods: {
    // 发送商标数据
    sendTmInfo(trademark) {
      this.$emit("getTmInfo", trademark);
    },
    // 发送商品售卖属性
    sendAttr(id, attrVal, attrName) {
      // console.log(id, attrVal, attrName)
      this.$emit("getAttr", id, attrVal, attrName);
    }
  },
};
</script>

<style lang="less" scope>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;
  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;
    .key {
      padding-bottom: 87px !important;
    }
  }
  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;
    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }
    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;
      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;
          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }
      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;
          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }
    .ext {
      position: absolute;
      top: 10px;
      right: 10px;
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
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }
      a {
        color: #666;
      }
    }
  }
}
</style>
