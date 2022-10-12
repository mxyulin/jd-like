import { reqGoodsDetail, addToCart } from "@/api";
// import { getUUID } from '@/utils/uuid_token'; 弃用

export default {
  namespaced: true,
  actions: {
    // 获取商品详情
    async getGoodsDetail({ commit }, skuId) {
      let result = await reqGoodsDetail(skuId);
      if (result.code == 200) {
        commit("GETGOODSDETAIL", result.data);
        return result;
      }
      return Promise.reject(new Error('faile'))
    },
    // 此商品加入购物车，失败需要提醒用户
    async addToCart(_, { skuId, skuNum }) {
      let result = await addToCart(skuId, skuNum);
      if (result.code == 200) {
        return "ok";
      }
      return Promise.reject(new Error("faile"));
    },
  },
  mutations: {
    GETGOODSDETAIL(state, data) {
      state.goodsDetail = data;
    },
    CHANGEISCHECKED(state, { saleAttrId, saleValId }) {
      // 嵌套循环访问到第二层售卖属性的数组
      state.goodsDetail.spuSaleAttrList.forEach((saleAttr) => {
        saleAttr.spuSaleAttrValueList.forEach((saleVal) => {
          // 重置当前售卖属性所有属性值的 isChecked
          if (saleAttr.id == saleAttrId) {
            saleVal.isChecked = 0;
          }
          // 被选中的售卖性值又重新 isChecked = 1.代表被选中的售卖属性被激活
          if (saleVal.id == saleValId) {
            saleVal.isChecked = 1;
          }
        });
      });
    },
  },
  state: {
    goodsDetail: {},
    // 拿到或新生成一个游客身份的临时id 弃用
    // uuid_token: getUUID(),
  },
  getters: {
    categoryView({ goodsDetail: { categoryView } }) {
      return categoryView || {};
    },
    skuInfo({ goodsDetail: { skuInfo } }) {
      return skuInfo || {};
    },
    spuSaleAttrList({ goodsDetail: { spuSaleAttrList } }) {
      return spuSaleAttrList || [];
    },
  },
};
