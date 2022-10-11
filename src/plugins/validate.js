import vue from 'vue'
import veeValidate from "vee-validate";
// 引入中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'

vue.use(veeValidate);

// 本地汉化提示信息
veeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: field => `${field}密码必须相同`
  },
  attributes: {
    phone: '手机',
    password: '密码',
    twicePassword: '确认密码',
    isChecked: '协议'
  }
})

// 自定义规则
veeValidate.Validator.extend('agree', {
  validate: val => val,
  getMessage: field => `${field}必须同意`
})



