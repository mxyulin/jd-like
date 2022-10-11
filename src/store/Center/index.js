import { reqOrderList } from "@/api"

export default {
  namespaced: true,
  actions: {
    async getMyOrderList({commit}, {page, limit}) {
      let result = await reqOrderList(page, limit);
      if (result.code == 200) {
        commit('GETMYORDERLIST', result.data);
        return 'ok'
      }
      return Promise.reject(new Error('faile'))
    }
  },
  mutations: {
    GETMYORDERLIST(state, data) {
      state.myOrderList = data.records || [];
      state.myOrderFullInfo = data || {};
    }
  },
  state: {
    myOrderList: [],
    // 懒得改了，重复接收一次数据。
    myOrderFullInfo: {}
  },
  getters: {}
}