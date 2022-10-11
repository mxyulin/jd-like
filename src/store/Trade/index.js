import { reqAddressList, reqTradeinfo } from '@/api'

export default {
  namespaced: true,
  actions: {
    async getAddressList({commit}) {
      let result = await reqAddressList();
      if (result.code == 200) {
        commit('GETADDRESSLIST', result.data);
        return 'ok'
      }
      return Promise.reject(new Error('faile'))
    },
    async getTradeinfo({commit}) {
      let result = await reqTradeinfo();
      if (result.code == 200) {
        commit('GETTRADEINFO', result.data);
        return 'ok'
      }
      return Promise.reject(new Error('faile'))
    },
    // 废弃，采用全局 API 总线
    //#region 
    // async submitTradeNo(_, {tradeNo, data}) {
    //   let result = await submitTradeNo(tradeNo, data);
    //   if (result.code == 200) {
    //     return Promise.resolve(result.data);
    //   }
    //   return Promise.reject(result.message);
    // },
    //#endregion
  },
  mutations: {
    GETADDRESSLIST(state, data) {
      state.addressList = data;
    },
    GETTRADEINFO(state, data) {
      state.tradeInfo = data;
    }
  },
  state: {
    addressList: [],
    tradeInfo: {}
  },
  getters: {
    detailArrayList(state) {
      return state.tradeInfo.detailArrayList
    }
  }
}
