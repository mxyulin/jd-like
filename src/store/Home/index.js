// *把API交给vuex模块管理，谁要发请求请 dsipatch 到 actions。
import {reqCategoryList, reqBannerList, reqFloorList} from '@/api'

export default {
  // *温馨提醒：开启命名空间的目的，是让其他组件或路由通过名字访问 vuex 模块。
  // *比如 this.$tore.dispatch('Home/callback', data)
  namespaced: true,
  actions: {
    // 因为这个 actoin 是请求资源，所以需要异步执行
    async getCategoryList({commit}) {
      // *我的请求写法，模仿 fetch API
      //#region 
      // reqCategoryList()
      // .then(res => {
      //   store.commit('Test', res.data)
      // })
      // .catch(err => console.log(err));
      //#endregion

      // *老师的写法，利用 async 和 await
      // *这两个关键字的用法参考 https://www.cnblogs.com/mxyulin/diary/2022/06/24/16409143.html#async-%E5%92%8C-await
      let result = await reqCategoryList();
      // console.log(await reqCategoryList());
      if (result.code == 200) {
        commit('GETCATEGORYLIST', result.data)
      }
    },
    async getBannerList({ commit }) {
      let result = await reqBannerList();
      if (result.code == 200) {
        commit("GETBANNERLIST", result.data);
      }
    },
    async getFloorList({commit}) {
      let result = await reqFloorList();
      if (result.code === 200) {
        commit('GETFLOORLIST', result.data);
      }
    }
  },
  mutations: {
    GETCATEGORYLIST(store, data) {
      store.baseCategoryList = data
      // console.log('mutations---GETCATEGORYLIST', data)
    },
    GETBANNERLIST(state, data) {
      state.bannerList = data;
      // console.log('mutations---GETBANNERLIST', data)
    },
    GETFLOORLIST(state, data) {
      state.floorList = data;
      // console.log('mutations---GETFLOORLIST', data)
    }
  },
  state: {
    // 初始值根据服务器返回值类型而定
    baseCategoryList: [],
    bannerList: [],
    floorList: []
  },
  getters: {

  }
}
