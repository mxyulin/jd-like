import { reqGoodsList } from "@/api";

export default {
  namespaced: true,
  actions: {
    async getGoodsList({ commit }, params) {
      let result = await reqGoodsList(params);
      if (result.code == 200) {
        commit("GETGOODSLIST", result.data);
      }
    },
  },
  mutations: {
    GETGOODSLIST(state, data) {
      state.goodsInfo = data;
      // console.log("mutations---GETGOODSLIST", data);
    },
  },
  state: {
    goodsInfo: {},
  },
  getters: {
    // *如果拿不到数据就返回一个空数组，不至于报错
    attrsList({ goodsInfo: { attrsList } }) {
      return attrsList || [];
    },
    goodsList({ goodsInfo: { goodsList } }) {
      return goodsList || [];
    },
    trademarkList({ goodsInfo: { trademarkList } }) {
      return trademarkList || [];
    },
    pageNo({ goodsInfo: { pageNo } }) {
      return pageNo || 1;
    },
    pageSize({ goodsInfo: { pageSize } }) {
      return pageSize || 30;
    },
    total({ goodsInfo: { total } }) {
      return total || 0;
    },
  },
};
