<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>闪购欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 登录成功展示用户信息 -->
          <p v-else>
            <span>{{ userName }}</span>
            <a class="logout" @click="logout" to="/home">退出登录</a>
          </p>
        </div>
        <!-- 头部右侧 -->
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a>我的闪购</a>
          <!-- <a >闪购会员</a>
          <a >企业采购</a>
          <a >关注闪购</a>
          <a >合作招商</a> -->
          <!-- <a >商家后台</a> -->
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="闪购" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            @keydown.enter="goSearch(keyword)"
          />
          <button
            @click="goSearch(keyword)"
            class="sui-btn btn-xlarge btn-danger"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapGetters("User", ["userName"]),
  },
  methods: {
    // !空串处理
    goSearch(keyword) {
      const location = {
        name: "search",
        query: { ...this.$route.query },
        params: { keyword },
      };
      this.$router.push(location);
    },
    // *用户退出
    logout() {
      this.$store.dispatch("User/userLogout")
      .then(() =>
        this.$router.push({
          path: "home",
        })
      )
      .catch(err => {
        console.log(err.message)
      });
    },
  },
  mounted() {
    // 清空输入框
    this.$bus.$on("clearInput", () => {
      this.keyword = "";
    });
    console.log(this.userName);
  },
  // 解绑自定义事件
  beforeDestroy() {
    this.$bus.$off("clearInput");
  },
};
</script>

<style lang="less" scope>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
          .logout {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 120px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
