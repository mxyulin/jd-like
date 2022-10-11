<template>
  <!-- 动态分页器 -->
  <div class="pagination" @click="changePageNo">
    <!-- 遗忘功能：是否禁用按钮，是的话`disabled: true` -->
    <button :disabled="pageInfo.pageNo == 1" :data-pageId="prevId">
      上一页
    </button>
    <!-- 起始页大于1才显示 -->
    <button
      v-if="bothEnd.start > 1"
      :class="{ active: pageInfo.pageNo == 1 }"
      :data-pageId="1"
    >
      1
    </button>
    <!-- 起始页大于2才显示 -->
    <button v-if="bothEnd.start > 2" disabled>···</button>

    <!-- 中间部分 -->
    <button
      v-for="(centerPage, idx) of centerPageArr"
      :key="idx"
      :class="{ active: pageInfo.pageNo == centerPage }"
      :data-pageId="centerPage"
    >
      {{ centerPage }}
    </button>

    <!-- 尾页小于倒数第二页时显示 -->
    <button v-if="bothEnd.end < pagesTotal - 1" disabled>···</button>
    <!-- 尾页小于总页数减显示 -->
    <button
      v-if="bothEnd.end < pagesTotal"
      :class="{ active: pageInfo.pageNo == pagesTotal }"
      :data-pageId="pagesTotal"
    >
      {{ pagesTotal }}
    </button>
    <button :disabled="pageInfo.pageNo == pagesTotal" :data-pageId="nextId">
      下一页
    </button>
    <button style="margin-left: 30px" disabled>
      总数 {{ pageInfo.total }}
    </button>
    <!-- <h1>分页器测试{{centerPageArr}} -- 当前页码{{pageInfo.pageNo}}</h1> -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageInfo"],
  computed: {
    // *总页数
    pagesTotal() {
      return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize);
    },
    // *难点：起始页、结尾页逻辑处理
    bothEnd() {
      // *妙啊，解构赋值直接拿到组件身上的数据
      const {
        pagesTotal,
        pageInfo: { pageNo, continues },
      } = this;
      let start = 0,
        end = 0;

      // *特殊情况：总页数 < 分页器时
      if (pagesTotal < continues) {
        start = 1;
        end = pagesTotal;
      }
      // 正常情况
      else {
        // 计算第一个分页器页数
        start = pageNo - Math.trunc(continues / 2);
        // 计算最后一个分页器页数
        end = pageNo + Math.trunc(continues / 2);

        // *特殊情况修正处理
        // 起始页小于 1 会得到意外结果
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 结束页大于总页数，比如 { "start": 29, "end": 33 } -- pagesTotal: 31 pageSize: 3 total: 91 pageNo: 2
        if (end > pagesTotal) {
          (end = pagesTotal), (start = pagesTotal - continues + 1);
        }
      }
      return { start, end };
    },
    // 分页器中间层专用数组
    centerPageArr() {
      const { start, end } = this.bothEnd;
      const arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
    // 上一页的 data-pageId
    prevId() {
      // 已经是第一页，没法再上一页了
      if (this.pageInfo.pageNo == 1) return;
      return this.pageInfo.pageNo - 1;
    },
    // 下一页的 data-pageId
    nextId() {
      // 已经是最后一页没法再下一页了
      if (this.pageInfo.pageNo == this.pagesTotal) return;
      return this.pageInfo.pageNo + 1;
    },
  },
  methods: {
    // *分页器更新路由
    changePageNo(e) {
      // 通过自定义属性拿分页数值
      if (e.target.dataset.pageid) {
        let pageNo = e.target.dataset.pageid;
        this.$router.push({
          name: "search",
          query: { ...this.$route.query, pageNo },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
