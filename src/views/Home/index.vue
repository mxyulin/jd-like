<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor of floorList" :key="floor.id" :floor="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer'
import TodayRecommend from '@/views/Home/TodayRecommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'

import { mapState } from "vuex";

export default {
  name: 'Home',
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState("Home", ["floorList"]),
  },
  mounted() {
    // 获取三级分类列表
    this.$store.dispatch("Home/getFloorList");
    // （弃用）退出登陆后（token清空）登录home都页（会请求用户数据）进不去
    // this.$store.dispatch("User/getUserInfo");
  },
}
</script>

<style>

</style>
