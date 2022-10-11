<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          minlength="11"
          maxlength="11"
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" :value="code" disabled />
        <button class="getVerificationCode" @click="getCode">获取验证码</button>
        <span class="error-msg" v-show="code == 'err'">验证码获取失败</span>
        <span class="error-msg" v-show="!code">请获取验证码</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          minlength="6"
          maxlength="20"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          minlength="6"
          maxlength="20"
          type="password"
          placeholder="请输入确认密码"
          name="twicePassword"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('twicePassword') }"
        />
        <span class="error-msg">{{ errors.first('twicePassword') }}</span>
      </div>
      <div class="controls">
        <input
          type="checkbox"
          :checked="isChecked"
          @click="isChecked = !isChecked"
          name="isChecked"
          v-validate="{ required: true, agree }"
          :class="{ invalid: errors.has('isChecked') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('isChecked') }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      isChecked: true,
    };
  },
  computed: {
    // 校验手机号 自己写的
    checkPhone() {
      const regex = new RegExp(
        /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      );
      return regex.test(this.phone);
    },
  },
  methods: {
    // *验证码获取
    getCode() {
      if (this.checkPhone) {
        this.$store
          .dispatch("User/getVerCode", this.phone)
          .then((res) => {
            this.code = res;
          })
          .catch((err) => {
            this.code == "err";
            console.log(err.message);
          });
      }
    },
    // *用户注册
    async register() {
      const { phone, password, code } = this;
      // *表单全部验证完毕，成功
      const success = await this.$validator.validateAll();
      console.log(success);

      // 
      if (success) {
        this.$store
          .dispatch("User/userRegister", { phone, password, code })
          .then(() => {
            alert("注册成功！");
            this.$router.replace({
              path: "/login",
            });
          })
          .catch((err) => {
            console.log(err.message);
            alert("注册失败！");
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      button {
        background-color: #ea4a36;
        border: none;
        color: white;
        padding: 9px 20px;
        margin-left: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
