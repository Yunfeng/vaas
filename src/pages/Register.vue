<template>
  <div id="register" class="row  justify-content-center">

    <div class="col-12 col-lg-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">注册</li>
          </ol>
        </nav>

        <div class="block">
          <div class="block-header">
            <h6 class="text-uppercase mb-0">注册账号</h6>
          </div>
          <div class="block-body"> 
            <form>
              <div class="form-group">
                <input type="input" class="form-control" placeholder="姓名"  v-model="realname">
                <span class="text-muted small">必填, 联系人姓名</span>
              </div>
              <div class="form-group">
                <input type="input" class="form-control" placeholder="手机号"  v-model="mobileNo">
                <small class="text-muted small">必填，用于业务联系和找回密码</small>
              </div>
              <div class="form-group">
                <input type="input" class="form-control" placeholder="电子邮件"  v-model="email">
                <small class="text-muted small">电子邮件地址</small>
              </div>
              <div class="form-group">
                <input type="input" class="form-control" placeholder="地址"  v-model="address">
                <span class="text-muted small">联系地址</span>
              </div>
              <div class="form-group">
                <input type="input" class="form-control" placeholder="公司名"  v-model="company">
                <span class="text-muted small">公司名称</span>
              </div>
              <div class="form-group">
                <input type="input" class="form-control" placeholder="用户名"  v-model="username">
                <span class="text-muted small">必填, 登录系统时使用的用户名</span>
              </div>
              <div class="form-group">
                  <input type="input" class="form-control" placeholder="邀请码"  v-model="invitationCode">
                <small class="text-muted small">必填，可从业务人员处获取</small>
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
                <button type="button" class="btn btn-outline-dark" @click.stop="register()">
                  <i class="far fa-user mr-2"></i>注册                                
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
import { register } from '../api/user.js'

export default {
  data () {
    return {
      username: '',
      vcode: '',
      realname: '',
      mobileNo: '',
      invitationCode: '',
      email: '',
      company: '',
      address: ''
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
    register: function () {
      const params = {
        'user.username': this.username,
        'user.realname': this.realname,
        'user.mobileNo': this.mobileNo,
        'user.company': this.company,
        'user.address': this.address,
        'user.email': this.email,
        'invitationCode': this.invitationCode,
        'captchaValue': this.vcode
      }

      this.showLoading('注册中...')

      register(params, v => {
        if (v.status === 'OK') {
          this.showErrMsg('注册成功，稍后自动跳转到登录页面')
          this.waitForJump()
        } else {
          this.refreshKaptcha()
          if (v.errmsg !== null) {
            this.showErrMsg(v.errmsg)
          } else {
            this.showErrMsg('注册失败')
          }
        }
      }, () => {
        this.hideLoading()
      })      
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
