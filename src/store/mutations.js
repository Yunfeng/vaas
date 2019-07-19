export const mutations = {
  readCookies (state) {
    const workMode = $.cookie('workMode')
    if (workMode !== undefined) {
      state.workMode = workMode
    }

    const username = $.cookie('username')
    if (username !== undefined) {
      state.username = username
      state.logined = true
    }

    const openid = $.cookie('openid')
    if (openid !== undefined) {
      state.wxInfo.openid = openid

      const nickname = $.cookie('nickname')
      if (nickname !== undefined) {
        state.wxInfo.nickname = nickname
      }
      
      const headimgurl = $.cookie('headimgurl')
      if (headimgurl !== undefined) {
        state.wxInfo.headimgurl = headimgurl
      }
    }
  },
  jumpToLogin (state, router) {
    state.historyStep = -1;
    state.username = "",
    state.logined = false;
  },
  logout(state)  {
    state.historyStep = -1;
    state.username = ""
    state.logined = false;
    state.privileges.splice(0)
    state.roles.splice(0)

    $.removeCookie('username', { path: '/' }); 
    $.removeCookie('token', { path: '/' }); 
  },
  setUsername (state, payload) {
    state.username = payload.username
    state.fullname = payload.fullname
    state.logined = payload.logined
    state.isRoot = payload.enterpriseId === payload.userId

    console.log('payload.token: ' + payload.token)
    if (payload.token !== null && payload.token !== undefined) {
      console.log('payload.token: ' + payload.token)
      $.cookie('token', payload.token, { expires: 30, path: '/' })  
    }    
    $.cookie('username', payload.username, { expires: 30, path: '/' })
    $.cookie('fullname', payload.fullname, { expires: 30, path: '/' })
  },
  setUserInfo(state, payload) {
    state.userInfo.freeBalance = payload.balance;
    state.userInfo.cashBalance = payload.cashBalanceYuan;
    state.userInfo.frozenBalance = payload.frozenBalanceYuan;
    state.userInfo.creditLimit = payload.creditLimitYuan;
  },
  setPnrDetail(state, payload) {
    state.pnrDetail = payload;
  },
  hideBottomTabBar(state) {
    state.bottomTabBarShowed = false
  },
  showBottomTabBar(state) {
    state.bottomTabBarShowed = true
  },
  addPrivilege(state, payload) {
    // console.log(payload)
    state.privileges.push({
      type: payload.resType,
      content: payload.resContent
    })

    if (state.roles.indexOf(payload.role) === -1) {
      state.roles.push(payload.role)  
    }
  },
  setPrintMode(state, p) {
    state.printMode = p
  },
  setWorkMode(state, p) {
    state.workMode = p
    $.cookie('workMode', p, { expires: 30, path: '/' })
  },
  showLoading(state, payload) {
    if (payload === undefined) {
      state.loading = true
    } else if (typeof payload === 'string') {
      state.loading = true
      state.loadingText = payload
    } else {
      state.loading = payload.loading
      if (payload.loadingText === undefined) {
        state.loadingText = '数据加载中...'
      } else {
        state.loadingText = payload.loadingText  
      }  
    }
  },
  hideLoading(state) {
    state.loading = false
    state.loadingText = '数据加载中...'
  }
}
