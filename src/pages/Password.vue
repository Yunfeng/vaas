<template>
  <div id="find-password" class="row  justify-content-center">
    <div class="col-12 col-lg-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">找回密码</li>
          </ol>
        </nav>
        <div class="block">
          <div class="block-header">
            <h6 class="text-uppercase mb-0">找回密码</h6>
          </div>
          <div class="block-body"> 
            <form>
              <div class="form-group">
                <input type="input" class="form-control" placeholder="手机号"  v-model="mobile">
                <small class="text-muted small">注册时填写的手机号</small>
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
                <button type="button" class="btn btn-outline-dark" @click.stop="findPassword()">
                  <i class="far fa-user mr-2"></i>找回密码                                
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import { WEBAPP_NAME } from '../common/common.js'
import { resetPassword } from '../api/user.js'

export default {
  data () {
    return {
      vcode: '',
      mobile: ''
    }
  },
  mounted: function () {
    this.refreshKaptcha()
  },
  methods: {
    showLoading: function (loadingText) {
      this.$store.commit('showLoading', { 'loading': true, 'loadingText': loadingText })
    },
    hideLoading: function () {
      this.$store.commit('showLoading', { 'loading': false })
    },
    showErrMsg: function (msg, msgType) {
      this.$store.dispatch('showAlertMsg', { 'errMsg': msg, 'errMsgType': msgType })
    },        
    findPassword: function () {
      const params = {
        'mobile': this.mobile,
        'captchaValue': this.vcode
      }

      this.showLoading('找回中...')

      resetPassword(params, v => {
        if (v.status === 'OK') {
          this.showErrMsg('成功，' + v.desc)
          this.waitForJump()
        } else {
          this.refreshKaptcha()
          if (v.errmsg !== null) {
            this.showErrMsg(v.errmsg)
          } else {
            this.showErrMsg('失败')
          }
        }

      }, () => {
        this.hideLoading()
      })
    },
    showErrMsg: function (msg) {
      this.$store.dispatch('showAlertMsg', { 'errMsg': msg })
    },
    waitForJump: function () {
      setTimeout(() => this.$router.push('/login'), 1500)
    },
    refreshKaptcha: function () {
      $('#kaptchaImage').attr('src',
        WEBAPP_NAME + '/captcha.do?' + Math.floor(Math.random() * 100)).fadeIn()
    }
  }
}
</script>
