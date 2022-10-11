<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="carousel of carouselList" :key="carousel.id">
      <img :src="carousel.imgUrl" />
    </swiper-slide>
    <!-- 分页器 -->
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- 前进后退按钮 -->
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      // *轮播图配置
      swiperOptions: {
        // direction: 'vertical',
        loop: true,
        grabCursor: true,// 开启小手光标
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
        // 自动播放延迟
        autoplay: {
          delay: 3000,
        },
      },
    };
  },
  props: ["carouselList"],
};
</script>

<style></style>
