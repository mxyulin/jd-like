/* API模块，统一管理所有API */
import requests from "./requests";
// 引入 mock 请求拦截器
import mockRequests from "./mockRequests";

// 三级联动的接口
export const reqCategoryList = () =>
  requests({
    method: "get",
    url: "/product/getBaseCategoryList",
  });

// *轮播图 banner的接口
export const reqBannerList = () =>
  mockRequests({
    method: "get",
    url: "/getBannerList",
  });

// 中间层 floor 的接口
export const reqFloorList = () =>
  mockRequests({
    method: "get",
    url: "/getFloorList",
  });

// 商品列表的接口，带请求参数 searchParams
export const reqGoodsList = (searchParams) =>
  requests({
    method: "post",
    url: "/list",
    data: searchParams,
  });

// 详情列表接口
export const reqGoodsDetail = (skuId) =>
  requests({
    method: "get",
    url: `/item/${skuId}`,
  });

// 加入购物车/更新加购数量
export const addToCart = (skuId, skuNum) =>
  requests({
    method: "post",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });

// 获取购物车列表
export const reqCartList = () =>
  requests({
    method: "get",
    url: `/cart/cartList`,
  });

// 切换商品选中状态
export const updateIsChecked = (skuId, isChecked) =>
  requests({
    method: "get",
    url: `/cart/checkCart/${skuId}/${isChecked}`,
  });

// 切换商品选中状态
export const deleteCartGoods = ( skuId ) =>
  requests({
    method: "delete",
    url: `/cart/deleteCart/${skuId}`,
  });

// 获取注册验证码
export const reqVerCode = ( phone ) =>
  requests({
    method: "get",
    url: `/user/passport/sendCode/${phone}`,
  });

// 用户注册
export const reqRegister = ( phone, password, code ) =>
  requests({
    method: "post",
    url: `/user/passport/register`,
    data: {
      phone,
      password,
      code
    }
  });

// 用户注册
export const reqLogin = ( phone, password ) =>
  requests({
    method: "post",
    url: `/user/passport/login`,
    data: {
      phone,
      password,
    }
  });

// 携带 token 获取用户信息
export const reqUserInfo = () =>
  requests({
    method: "get",
    url: `/user/passport/auth/getUserInfo`,
  });

// 退出登录
export const reqLogout = () =>
  requests({
    method: "get",
    url: `/user/passport/logout`,
  });

// 请求地址列表
export const reqAddressList = () =>
  requests({
    method: "get",
    url: `/user/userAddress/auth/findUserAddressList`,
  });

// 请求交易页信息
export const reqTradeinfo = () =>
  requests({
    method: "get",
    url: `/order/auth/trade`,
  });
  
// 提交订单
export const submitTradeNo = ( tradeNo, data ) =>
requests({
  method: "post",
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data
});

// 获取订单支付信息
export const reqOrderInfo = ( orderId ) =>
  requests({
    method: "get",
    url: `/payment/weixin/createNative/${orderId}`,
  });

// 查询支付订单状态
export const reqPayStatus= ( orderId ) =>
requests({
  method: "get",
  url: `/payment/weixin/queryPayStatus/${orderId}`,
});

// 获取我的订单列表
export const reqOrderList = ( page, limit ) =>
  requests({
    method: "get",
    url: `/order/auth/${page}/${limit}`,
  });
