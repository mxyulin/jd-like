<template>
  <swiper :options="swiperOptions" class="swiper-container" >
      <swiper-slide
        class="swiper-slide"
        v-for="(slide, idx) of skuImageList"
        :key="slide.id"
      >
        <img :src="slide.imgUrl" :class="{active: currentIdx == idx}" @click="activeSlide(idx)"/>
      </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      // *轮播图配置
      swiperOptions: {
        // direction: 'vertical',
        // ! loop: true, 此项禁用，和绑定事件冲突
        grabCursor: true,// 开启小手光标
        slidesPerView: 3,// 一行显示3个幻灯片
        slidesPerGroup: 3,// 1个一组进行切换
        // 赋予按钮样式
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 赋予分页器样式
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // 切换速度
        speed: 300,
      },
      currentIdx: 0,
    };
  },
  methods: {
    activeSlide(idx) {
      // alert('activeSlide')
      this.currentIdx = idx;
      // 切换预览图
      this.$bus.$emit('switchPreview', idx)
    }
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
