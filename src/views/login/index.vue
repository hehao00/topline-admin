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
// import axios from 'axios'
// 引入极验
import '@/vendor/gt'
import { saveUser } from '@/utils/auth'
// import initGeetest from '@/utils/init-geetest'
const initCodeTimeSeconds = 60
export default {
  name: 'AppLogin',

  data () {
    return {
      userform: { // 表单数据对象
        mobile: '',
        code: '',
        agree: ''
      },
      rules: { // 验证规则对象
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
      codeTimerSeconds: initCodeTimeSeconds // 倒计时时间
    }
  },

  methods: {
    // 登陆
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
      this.$http({
        method: 'POST',
        url: '/authorizations',
        data: this.userform
      }).then(res => {
        const userInfo = res.data.data
        // window.localStorage.setItem('user_info', JSON.stringify(userInfo))
        saveUser(userInfo)
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
    // async submitLogin () {
    //   try {
    //     const res = await this.$http({
    //       method: 'POST',
    //       url: '/authorizations',
    //       data: this.form
    //     })
    //     const userInfo = res.data.data
    //     // window.localStorage.setItem('user_info', JSON.stringify(userInfo))
    //     saveUser(userInfo)
    //     this.$message({
    //       message: '登录成功',
    //       type: 'success'
    //     })
    //     this.$router.push({
    //       name: 'home'
    //     })
    //   } catch (err) {
    //     this.$message.error('登录失败，手机号或验证码错误')
    //   }
    // },
    // 发送验证码
    handleSendCode () {
      // 验证手机号是否有效
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        // 验证通过，初始化显示验证码
        this.showGeetest()
      })
    },
    // 发送请求 人机交互验证
    showGeetest () {
      const { mobile } = this.userform
      this.$http({
        methods: 'GET',
        url: `/captchas/${mobile}`
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
            this.$http({
              method: 'GET',
              url: `/sms/codes/${mobile}`,
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
    // async showGeetest () {
    //   const { mobile } = this.userform
    //   const res = await this.$http({
    //     method: 'GET',
    //     url: `captchas/${mobile}`
    //   })
    //   const { data } = res.data
    //   const captchaObj = await initGeetest({
    //     // 以下配置参数来自服务端 SDK
    //     gt: data.gt,
    //     challenge: data.challenge,
    //     offline: !data.success,
    //     new_captcha: data.new_captcha,
    //     product: 'bind' // 隐藏，直接弹出式
    //   })
    //   captchaObj.onReady(() => {
    //     // 验证码ready之后才能调用verify方法显示验证码
    //     captchaObj.verify() // 弹出验证码内容框
    //   }).onSuccess(async () => {
    //     // your code
    //     const {
    //       geetest_challenge: challenge,
    //       geetest_seccode: seccode,
    //       geetest_validate: validate } =
    //     captchaObj.getValidate()
    //     // 发送短信
    //     await this.$http({
    //       method: 'GET',
    //       url: `/sms/codes/${mobile}`,
    //       params: {
    //         challenge,
    //         validate,
    //         seccode
    //       }
    //     })
    //     // 开始倒计时
    //     this.codeCountDown()
    //   })
    // },
    // 发送验证码倒计时
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
               color:rgb(64,158,255)
              }
            }
        }
    }
</style>
