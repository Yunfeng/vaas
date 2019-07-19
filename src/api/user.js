import { WEBAPP_NAME, callService } from '../common/common.js'

export function checkIn(cbDone) {
  const url = WEBAPP_NAME + '/user/checkIn'
  callService(url, {
    cbDone: cbDone
  })  
}

export function generateSecretKey(cbDone) {
  const url = WEBAPP_NAME + '/user/api/secretKey'
  callService(url, {
    cbDone: cbDone
  })  
}

export function saveApiParams(params, cbDone) {
  const url = WEBAPP_NAME + '/user/api/params'
  callService(url, {
    data: params,
    cbDone: cbDone
  })  
}

export function getApiParams(cbDone) {
  const url = WEBAPP_NAME + '/user/api/params'
  callService(url, {
    type: 'get',
    cbDone: cbDone
  })  
}

export function login(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/ajaxLogin.do'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })  
}

export function register(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/register'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })  
}

// 采购登录
export function buyerLogin(params, cbDone) {
  const url = WEBAPP_NAME + '/buyerLogin'
  callService(url, {
    data: params,
    cbDone: cbDone
  })  
}

export function checkLoginStatus(cbDone) {
  const url = WEBAPP_NAME + '/checkLoginStatus'
  callService(url, {
    cbDone: cbDone
  })  
}


export function logout(cbDone) {
  const url = WEBAPP_NAME + '/logout.do'
  callService(url, {
    cbDone: cbDone
  })  
}

export function searchBalance(cbDone) {
  const url = WEBAPP_NAME + '/searchEntBalance.do'
  callService(url, {
    cbDone: cbDone
  })  
}


export function searchAmountHistory(cbDone) {
  const url = WEBAPP_NAME + '/searchTransactionHistory.do'
  callService(url, {
    cbDone: cbDone
  })  
}

export function searchCustomerDetails(params, cbDone) {
  const url = WEBAPP_NAME + '/customer-details'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function createCustomer(params, cbDone) {
  const url = WEBAPP_NAME + '/customer'
  callService(url, {
    contentType: 'application/json',
    data: params,
    cbDone: cbDone
  })
}

export function processPnrDetail(params, cbDone) {
  const url = WEBAPP_NAME + '/processPnrDetail.do'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function updatePassword(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/updatePassword'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}


export function resetPassword(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/resetPassword'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}
