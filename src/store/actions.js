import { checkLoginStatus } from '../api/user.js'

export const actions = {
  init (context, cb) {
    // 仅初始化一次
    if (context.state.initialized) return    

    context.state.initialized = true

    // checkLoginStatus(v => {
    //     if (v.status === 'OK') {
    //       this.$store.commit('setUsername', { 'username': v.username, 'fullname': v.fullName, 'logined': true })
    //       this.$router.push("/home")
    //     } else {
    //       if (this.logined) {
    //         this.$store.commit('logout')
    //       }
    //       this.refreshKaptcha()
    //     }
    //   })
    checkLoginStatus(v => {
      // console.log(jsonResult)
      if (v.status === 'OK') {
        // 初始化，读取cookie中的数据
        // context.commit('readCookies')        
        // cb(false)

        const u = {
          'username': v.username,
          'logined': true,
          'fullname': v.fullname,
          'token': v.token,
          'enterpriseId': v.enterpriseId,
          'userId': v.userId
        }
        context.dispatch('setLoginInfo', u)
      } else {
        console.log('logout')
        context.commit('logout')
        // context.dispatch('showAlertMsg', {errMsg: '您需要重新登录!'})
        // cb(true)
      }
    })   
  },
  setLoginInfo (context, payload) {
    context.commit('setUsername', payload)
    // context.dispatch('searchPrivileges')
  },
  showAlertMsg(context, payload) {
    if (payload.errMsgType === undefined) {
      context.state.errMsgType = 'warning'
    } else {
      context.state.errMsgType = payload.errMsgType
    }

    context.state.errMsg = payload.errMsg
    context.state.errAlert = true

    var timeout = payload.timeout
    if (timeout === undefined || timeout === null) {
      if (payload.errMsgType === 'danger') {
        timeout = 5000
      } else {
        timeout = 2500  
      }      
    }

    setTimeout(() => { context.state.errAlert = false }, timeout)
  },
  showLoading(context, payload) {
    context.state.loading = true
    if (payload === undefined || payload.loadingText === undefined) {
      context.state.loadingText = '数据加载中...'
    } else {
      context.state.loadingText = payload.loadingText  
    }
  },    
  hideLoading(context) {
    context.state.loading = false
  },
  searchPrivileges(context) {
    searchPrivileges((privileges) => {
      // console.log(privileges)
      for ( let info of privileges) {
        context.commit('addPrivilege', info)
      }
    })
  },
  getWorkWxUserId(context, payload) {
    return new Promise((resolve, reject) => {
      const params = {
        'code': payload.code,
        'state': payload.state
      }
      authWorkWeixinUser(params, v => {
        context.dispatch('setWorkWxUserid', v)
        resolve()
      })
    })
  }, 
  setWorkWxUserid(context, payload) {
    context.state.wxInfo.userid = payload.userid
    $.cookie('userid', payload.userid, { expires: 30, path: '/' })
  },
  addFlight(context, payload) {
    context.state.order.flights.push(payload);
    if (context.state.order.psgs.length === 0) {
      context.dispatch('addPsg')
    }
  },
  addPsg(context, p) {
    if (p === undefined || p === null) {
      p = {
        'selected': true,
        'psgName': '',
        'idNo': '',
        'idType': 1,
        'psgType': 0,
        'mobile': '',
        'ffpNo': ''
      };
    }

    context.state.order.psgs.push(p);
  },
  deletePsg(context, index) {
    context.state.order.psgs.splice(index, 1);
    if (context.state.order.psgs.length === 0) {
      context.dispatch('addPsg');
    }
  }
}
