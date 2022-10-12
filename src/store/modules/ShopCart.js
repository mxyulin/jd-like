import { reqCartList, updateIsChecked, deleteCartGoods } from "@/api";

export default {
  namespaced: true,
  actions: {
    // 获取购物车列表
    async getCartList({ commit }) {
      // 请求购物车列表
      let result = await reqCartList();
      if (result.code == 200) {
        commit("GETCARLIST", result.data);
      }
    },
    // 同步商品选中状态，返回非空字符串
    async changeIsChecked(_, { skuId, isChecked }) {
      let result = await updateIsChecked(skuId, isChecked);
      if (result.code == 200) {
        return 'ok'
      }
      return Promise.reject(new Error('faile'));
    },
    // 删除商品
    async deleteCartGoods(_, skuId) {
      let result = await deleteCartGoods(skuId);
      if (result.code == 200) {
        return 'ok';
      }
      return Promise.reject(new Error('faile'));
    },
    // *利用小仓库【context】单次派发，多次请求
    async deleteSeleced ({dispatch, state}) {
      // 拿到购物车数据
      let cartList = state.cartList;
      // 遍历购物车每一个商品，被勾选的 dispatch('Shopcart/deleteCartGoods', skuId)
      const promiseAll = [];
      cartList.forEach(goods => {
        // 勾选发请求删除，否则跳过
        let promise =  goods.isChecked == 1 ? dispatch('deleteCartGoods', goods.skuId) : '';
        // console.log(promise)
        // 把所有请求的 promise 放进数组
        promiseAll.push(promise)

      });
      return await Promise.all(promiseAll)
      .then(() => Promise.resolve('ok'))
      .catch(() => Promise.reject('faile'));
    },
    // *全选 & 全不选
    async checkAllORnot({dispatch, state}, isCheckAll) {
      const promiseAll = [];
      let cartList = state.cartList, isChecked = -1;
      // 通过组件传来的计算属性 isCheckAll 判断是否全选
      isChecked = isCheckAll ? 0 : 1;
      // 获取一个 promise 数组
      cartList.forEach(goods => {
        // *注意action回调第二个参数是对象
        let promise = dispatch('changeIsChecked', {skuId: goods.skuId, isChecked: isChecked});
        promiseAll.push(promise);
      })
      // console.log(isCheckAll, isChecked)
      // *返回最终的 promise 结果
      return await Promise.all(promiseAll)
      .then(() => Promise.resolve('ok'))
      .then(() => new Error('faile'));
    }
  },
  mutations: {
    GETCARLIST(state, data) {
      if (!data[0]) {
        state.cartList = [];
        return;
      }
      state.cartList = data[0].cartInfoList;
    },
  },
  state: {
    cartList: [],
  },
  getters: {},
};
