<template>
  <div id="home" class="row">
    <template  v-if="logined">
      <div class="card col-12">
        <div class="media card-block border-0" v-if="openid.length === 0">
          <img class="d-flex align-self-center mr-3" :src="headimgurl" style="width: 5rem; height: 5rem">
          <div class="media-body">
            <h5 class="mt-0">{{fullname}}</h5>
            <small>当前用户：{{sessionUsername}}</small>
          </div>
        </div>
        <div class="media card-block border-0"  v-if="openid.length > 0">
          <img class="d-flex align-self-center mr-3" :src="headimgurl" style="width: 5rem; height: 5rem">
          <div class="media-body">
            <h5 class="mt-0">{{nickname}}</h5>
            <small>当前用户：{{sessionUsername}}</small>
          </div>
        </div>  
          
        <table class="table">
          <tr>
            <td colspan="3">
              <router-link to="/orders">服务订单</router-link>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <router-link to="/rentalcar/orders">租车订单</router-link>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <router-link to="/report/vas">服务报表</router-link>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <router-link to="/report/rentalcar">租车报表</router-link>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <router-link to="/password">修改密码</router-link>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <router-link to="/apiConfig">接口配置</router-link>
            </td>
          </tr>
          <tr>
            <td class="text-right">现金账户</td>
            <td>{{userInfo.cashBalance}} <small>元</small></td>
            <td><small><router-link to="/amount/history">交易记录</router-link></small></td>
          </tr>
          <tr>
            <td class="text-right">会员折扣</td>
            <td>{{userInfo.memberDiscount}} <small>%</small></td>
            <td></td>
          </tr>
        </table>
          
        <div class="card-footer">
          <button class="btn btn-danger btn-block" @click="logout()">退出</button>
        </div>         
      </div>      
    </template>
  </div>
</template>

<script>
import $ from 'jquery'
import { checkIn, logout, buyerLogin, searchBalance, checkLoginStatus } from '../api/user.js'

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
  methods: {
    showErrMsg: function (msg) {
      this.$store.dispatch('showAlertMsg', { 'errMsg': msg })
    },
    checkLoginStatus: function () {
      checkLoginStatus(v => {
        console.log(v)
        if (v.status !== 'OK') {
          this.$router.push("/login")
        } else {
          const u = {
            'username': v.username,
            'logined': true,
            'fullname': v.fullname
          }
          this.$store.commit('setUsername', u)

          this.searchBalance()
        }
      })
    },
    logout: function () {
      logout(v => {
        if (v.status === 'OK') {
          this.justLogout = true
          this.$store.commit('logout')
          this.$router.push("/login")
        }
      })
    },
    searchBalance: function () {
      searchBalance(v => {
        this.$store.commit('setUserInfo', v)
      })
    },
    checkIn: function () {
      checkIn((jsonResult) => {
        this.showErrMsg(jsonResult.desc)
        if (jsonResult.status === 'OK') {
          this.searchBalance()
        }
      })
    }
  }
}
</script>
