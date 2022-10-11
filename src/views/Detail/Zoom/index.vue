<template>
  <div class="spec-preview">
    <img :src="currentImg.imgUrl" />
    <!-- 触发鼠标移动事件的隐藏层 -->
    <div class="event" @mousemove="zoom"></div>
    <div class="big">
      <img :src="currentImg.imgUrl" ref="big" />
    </div>
    <!-- 遮盖（遮罩）层，就是放大镜绿块  -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      // 初始化索引，初始图片
      currentIdx: 0,
    };
  },
  computed: {
    currentImg() {
      // 根据索引值，切换图片
      return this.skuImageList[this.currentIdx] || {};
    },
  },
  methods: {
    // 放大镜逻辑
    zoom(e) {
      // console.log(this.$refs.mask);
      let mask = this.$refs.mask;
      let big = this.$refs.big;

      // *第一步：计算遮罩层与父容器边缘间距
      // 计算左间距
      let left = e.offsetX - mask.offsetWidth / 2;
      // 计算上间距
      let top = e.offsetY - mask.offsetHeight / 2;

      // *第二步：限制遮罩层不超出容器
      if (left < 0) left = 0;
      // 如果你的 left 大于一个遮罩层宽度，就要限制最大为遮罩层宽度
      if (left > mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      // 与 left 同理
      if (top > mask.offsetHeight) top = mask.offsetHeight;

      // *第三步：修改遮罩层与父元素边缘的 左间距（left）与上间距（top）
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // *第四步设置放大镜偏移量
      // !放大镜图片的上间距与下间距是遮罩层的负两倍，负号意味着遮罩层和放大图片移动方向相反
      big.style.left = -(2 * left) + "px";
      big.style.top = -(2 * top) + "px";
    },
  },
  mounted() {
    this.$bus.$on("switchPreview", (idx) => {
      // 更新索引，切换图片
      this.currentIdx = idx;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }
  // 事件层样式
  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
    cursor: move;
  }
  // 遮罩层样式
  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }
  // 放大镜样式
  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    // 放大图片
    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  // *鼠标一移动到事件层上，就显示遮罩层和放大镜
  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
