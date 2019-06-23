<template>
  <div class="login-wrap">
      <div class="login-form">
          <div class="login-img">
          <img src="./logo_index.png" alt="黑马头条号">
          </div>
      <el-form class="form-content" ref="form" :model="userform" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="userform.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <!-- el-col 栅格系统  一共24列  :span 用来指定占用的大小  :offset 偏移量-->
          <el-col :span="15" class="input-t">
            <el-input v-model="userform.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="8" class="input-t">
            <el-button @click=" handleSendCode" :disabled="!!codeTimer">{{ codeTimer ? `剩余${codeTimerSeconds}秒` : '获取验证码' }}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox class="agree-checkbox" v-model="userform.agree">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></el-checkbox>
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
const initCodeTimeSeconds = 10
export default {
  name: 'AppLogin',

  data () {
    return {
      userform: {
        mobile: '',
        code: '',
        agree: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /\d{11}/, message: '请输入有效的手机号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /\d{6}/, message: '请输入有效的验证码', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议' },
          { pattern: /true/, message: '请同意用户协议' }
        ]
      },
      codeTimer: null, // 倒计时定时器
      codeTimerSeconds: initCodeTimeSeconds // 倒计时事件
    }
  },

  methods: {
    handleLogin () {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        // 表单验证通过，提交登录请求
        this.submitLogin()
      })
    },
    submitLogin () {
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
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        // 验证通过，初始化显示验证码
        this.showGeetest()
      })
    },
    showGeetest () {
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
        }, captchaObj => {
          captchaObj.onReady(() => {
            captchaObj.verify() // 弹出验证内容框
            // your code
          }).onSuccess(() => {
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
              // console.log(res.data)
              this.codeCountDown()
            })
          }).onError(function () {
            // your code
          })
        }
        )
      })
    },
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeTimerSeconds--
        if (this.codeTimerSeconds <= 0) {
          // 清除定时器
          window.clearInterval(this.codeTimer)
          // 倒计时回到初始状态
          this.codeTimerSeconds = initCodeTimeSeconds
          // 将存储定时器的变量重新赋值为null
          this.codeTimer = null
        }
      }, 1000)
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
            width:500px;
            background-color: #fff;
            padding:30px;
            .login-img{
               display: flex;
                justify-content: center;
                align-items: center;
               margin-bottom:20px;
            }
            .btn-login{
                width:100%;
            }
            .agree-checkbox{
              a{
                text-decoration: none;
              }
            }
        }
    }
</style>
