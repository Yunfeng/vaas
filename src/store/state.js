export const state = {
  workMode: '',
  bottomTabBarShowed: true,
  initialized: false,
  isRoot: false,
  logined: false,
  username: '',
  fullname: '',
  userInfo: {
    freeBalance: 0,
    cashBalance: 0,
    frozenBalance: 0,
    creditLimit: 0
  },
  historyStep: 0,

  errAlert: false,
  errMsg: '',
  errMsgType: 'warning',
  
  loading: false,
  loadingText: '数据加载中',

  wxInfo: {
    code: '',
    state: '',
    openid: '',
    nickname: '',
    headimgurl: '',
    subscribe: 0
  },
  privileges: [],
  roles: [],

  printMode: 0
}


