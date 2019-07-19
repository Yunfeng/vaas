<template>
  <div id="login" class="row justify-content-center">

      <div class="col-12 col-lg-5">
        <div class="block">
          <div class="block-header">
            <h6 class="text-uppercase mb-0">登录</h6>
          </div>
          <div class="block-body">
            <p class="lead">
              已经有账户
            </p>
            <p class="text-muted"></p>
            
            <hr>
            <form>
              <div class="form-group">
                <label for="email" class="form-label">用户名</label>
                <input id="email" type="text" class="form-control" v-model.trim="username">
              </div>
              <div class="form-group">
                <label for="password" class="form-label">密码</label>
                <input id="password" type="password" class="form-control" v-model.trim="password">
              </div>
              <div class="form-group">
                <label for="password" class="form-label">验证码</label>
                <div class="row px-0">
                  <div class="col-6 pr-0">
                      <input type="text" class="form-control" placeholder="验证码" v-model.trim="vcode" />
                  </div>
                  <div class="col-6 px-0 pl-1">
                     <img id="kaptchaImage" class="img-fluid" title="点击刷新" @click="refreshKaptcha()">
                     <span class="text-muted small" @click="refreshKaptcha()">刷新</span>
                  </div>
                </div>
              </div>
              <div class="form-group text-center">
                <button type="button" class="btn btn-outline-dark" @click.stop="login()"><i class="fa fa-sign-in-alt mr-2"></i> 登录</button>
              </div>
            </form>
          </div>
        </div>
        <div class="card border-0 bg-light">
          <div class="card-body">
            <span class="small text-muted">
              <router-link to="/findPassword" class="card-link text-primary">找回密码</router-link>
            </span>

            <span class="small text-muted float-right">
              还没有账号? 请点击
              <router-link to="/register" class="card-link text-danger">注册</router-link>
            </span>
            
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { buyerLogin, checkLoginStatus } from '../api/user.js'
import { WEBAPP_NAME } from '../common/common.js'

export default {
  data () {
    return {
      username: '',
      password: '',
      vcode: '',
      errMsg: '',
      errAlert: false,
      justLogout: false
    }
  },
  computed: {
    logined () { return this.$store.state.logined },
    sessionUsername () {
      return this.$store.state.username
    },
    fullname () { return this.$store.state.fullname },
    historyStep () { return this.$store.state.historyStep },
    userInfo () { return this.$store.state.userInfo },
    openid () {
      return this.$store.state.wxInfo.openid
    },
    nickname () {
      var nickname = this.$store.state.wxInfo.nickname
      return nickname
    },
    headimgurl () {
      var headimgurl = this.$store.state.wxInfo.headimgurl
      return headimgurl
    }
  },
  mounted: function () {
    this.checkLoginStatus()
  },
  updated: function () {
    if (this.logined === false && this.justLogout) {
      this.justLogout = false
      this.refreshKaptcha()

      var self = this
      $('#kaptchaImage').click(self.refreshKaptcha)
    }
  },
  methods: {
    showErrMsg: function (msg) {
      this.$store.dispatch('showAlertMsg', { 'errMsg': msg })
    },
    checkLoginStatus: function () {
      checkLoginStatus(v => {
        if (v.status === 'OK') {
          this.$store.commit('setUsername', { 'username': v.username, 'fullname': v.fullName, 'logined': true })
          this.$router.push("/home")
        } else {
          if (this.logined) {
            this.$store.commit('logout')
          }
          this.refreshKaptcha()
        }
      })
    },
    login: function () {
      const params = { 
        'username': this.username, 
        'password': this.password, 
        'captchaValue': this.vcode 
      }

      buyerLogin(params, v => {
        if (v.status === 'OK') {
          let u = {
            'username': v.username,
            'logined': true,
            'fullname': v.fullname,
            'token': v.token
          }
          this.$store.commit('setUsername', u)

          if (this.historyStep !== 0) {
            this.$router.go(this.historyStep)
          } else {
            this.$router.push("/home")
          }
        } else {
          this.refreshKaptcha()
          if (v.errMsg !== null) {
            this.showErrMsg(v.errMsg)
          } else {
            this.showErrMsg('登录失败')
          }
        }
      })
    },
    refreshKaptcha: function () {
      $('#kaptchaImage').attr('src',
        WEBAPP_NAME + '/captcha.do?' + Math.floor(Math.random() * 100)).fadeIn()
    }
  }
}
</script>
