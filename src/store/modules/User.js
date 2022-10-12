import { reqVerCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from "@/api";

export default {
  namespaced: true,
  actions: {
    // 获取验证码
    async getVerCode(_, phone) {
      let result = await reqVerCode(phone);
      if (result.code == 200) {
        return result.data;
      }
      return Promise.reject(new Error("faile"));
    },
    // 用户注册
    async userRegister(_, { phone, password, code }) {
      let result = await reqRegister(phone, password, code);
      if (result.code == 200) {
        return "ok";
      }
      return Promise.reject(new Error("faile"));
    },
    // 用户登录
    async userLogin(_, { phone, password }) {
      let result = await reqLogin(phone, password);
      if (result.code == 200) {
        // token数据页面不需要用，所以直接放进 localStorage 
        localStorage.setItem('sph_token', result.data.token);
        return 'ok';
      }
      return Promise.reject(new Error('faile'));
    },
    // 获取用户信息
    async getUserInfo({commit}) {
      let result = await reqUserInfo();
      if (result.code == 200) {
        commit('GETUSERINFO', result.data);
        return result
      }
      return Promise.reject(new Error('faile'))
    },
    // 退出登录
    async userLogout({commit}) {
     let result = await reqLogout();
     if (result.code == 200) {
      localStorage.sph_token = '';
      commit('CLEARUSERINFO')
      return 'ok';
     }
     return Promise.reject(new Error('faile'));
    }
  },
  mutations: {
    // 获取用户信息
    GETUSERINFO(state, data) {
      state.userInfo = data
    },
    // *退出登录，清空用户信息
    CLEARUSERINFO(state) {
      state.userInfo = {};
    }
  },
  state: {
    userInfo: {}
  },
  getters: {
    userName(state) {
      return state.userInfo.name
    }
  },
};
