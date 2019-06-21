<template>
  <div class="login-wrap">
      <div class="login-form">
          <div class="login-img">
          <img src="./logo_index.png" alt="黑马头条号">
          </div>
      <el-form class="form-content" ref="form" :model="userform">
        <el-form-item>
          <el-input v-model="userform.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
            <!-- el-col 栅格系统  一共24列  :span 用来指定占用的大小  :offset 偏移量-->
          <el-col :span="15">
            <el-input v-model="userform.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="8">
            <el-button @click="handleSendCode">获取验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
       </div>
  </div>
</template>

<script>
import axios from 'axios'
// 引入极验
import '@/vendor/gt'
export default {
  name: 'AppLogin',

  data () {
    return {
      userform: {
        mobile: '',
        code: ''
      }
    }
  },

  methods: {
    handleLogin () {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.userform
      }).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      }).catch((e) => {
        this.$message.error('登录失败，手机号或验证码错误')
      })
    },
    handleSendCode () {
      const { mobile } = this.userform
      axios({
        methods: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        }, function (captchaObj) {
          // captchaObj.appendTo('#captchaBox') // 将验证按钮插入到宿主页面中captchaBox元素内
          captchaObj.onReady(function () {
            captchaObj.verify() // 弹出验证内容框
            // your code
          }).onSuccess(function () {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } = captchaObj.getValidate()
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              console.log(res.data)
            })
          }).onError(function () {
            // your code
          })
        }
        )
      })
    }
  }
}
</script>

<style  lang="less" scoped>
    .login-wrap{
        height: 100% ;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url(./login_bg.jpg);
        .login-form{
            width:600px;
            background-color: #fff;
            padding:20px;
            .login-img{
               display: flex;
                justify-content: center;
                align-items: center;
               margin-bottom:20px;
            }
            .btn-login{
                width:100%;
            }
        }
    }
</style>
