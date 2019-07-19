import { WEBAPP_NAME, callService } from '../common/common.js'


export function searchUsers(cbDone) {
  const url = WEBAPP_NAME + '/admin/users'
  callService(url, {
    cbDone: cbDone
  })
}

export function createUser(params, cbDone) {
  const url = WEBAPP_NAME + '/admin/user'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function searchAirports(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/airports'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function createAirport(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/admin/airportEnabled'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function deleteAirport(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/admin/airportEnabled/delete'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function searchEntBalances(params, cbDone) {
  const url = WEBAPP_NAME + '/admin/buyers/balance'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function saveEntCreditLimit(params, cbDone) {
  const url = WEBAPP_NAME + '/saveEntCreditLimit.do'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function saveEntCashBalance(params, cbDone) {
  const url = WEBAPP_NAME + '/updateEntCashBalance.do'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

// 修改企业会员折扣
export function updateEntMemberDiscount(buyerId, params, cbDone) {
  const url = WEBAPP_NAME + '/admin/buyer/' + buyerId + '/memberDiscount'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

// 查询某客户的交易记录
export function searchCustomerTrans(id, cbDone) {
  const url = WEBAPP_NAME + '/customer/' + id + '/trans'
  callService(url, {
    cbDone: cbDone
  })
}

export function searchBuyerOrders(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/admin/orders'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function getBuyerOrder(id, cbDone) {
  const url = WEBAPP_NAME + '/admin/order/' + id
  callService(url, {
    cbDone: cbDone
  })
}

// 开始处理订单
export function processBuyerOrder(id, cbDone) {
  const url = WEBAPP_NAME + '/admin/order/' + id + '/status/processing'
  callService(url, {
    cbDone: cbDone
  })
}

// 订单处理完毕
export function finishBuyerOrder(id, params, cbDone) {
  const url = WEBAPP_NAME + '/admin/order/' + id + '/status/finished'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

// 取消订单
export function cancelBuyerOrder(id, params, cbDone) {
  const url = WEBAPP_NAME + '/admin/order/' + id + '/status/canceled'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

// 修改订单的折扣
export function updateBuyerOrderDiscount(id, params, cbDone) {
  const url = WEBAPP_NAME + '/order/vas/' + id + '/discount'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

// 修改订单备注
export function updateBuyerOrderRemark(id, params, cbDone) {
  const url = WEBAPP_NAME + '/order/vas/' + id + '/remark'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}


// 与客户联系后的备注
export function updateBuyerOrderContactRemark(id, params, cbDone) {
  const url = WEBAPP_NAME + '/order/vas/' + id + '/contactRemark'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

// 修改取货地址
export function updateBuyerOrderAddress(id, params, cbDone) {
  const url = WEBAPP_NAME + '/order/vas/' + id + '/pickUpAddress'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}


// 修改订单中乘机人的座位号
export function updateBuyerOrderSeatNo(id, params, cbDone) {
  const url = WEBAPP_NAME + '/admin/order/vas/psg/' + id + '/seatNo'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

// 修订订单中乘机人的手机号
export function updateBuyerOrderMobile(id, params, cbDone) {
  const url = WEBAPP_NAME + '/admin/order/vas/psg/' + id + '/mobile'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function searchBuyerOrderHistory(id, cbDone) {
  const url = WEBAPP_NAME + '/admin/order/' + id + '/history'
  callService(url, {
    cbDone: cbDone
  })
}


export function searchSubscribers(params, done, fail, always) {
  $.ajax({
    type: 'post',
    url: '/Flight/weixin/subscribers',
    dataType: 'json',
    data: params
  }).done(function (jsonResult) {
    done(jsonResult)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // fail(jqXHR.status, jqXHR.statusText)
  }).always(function () {
    if (always !== undefined && always !== null) {
      always()  
    }    
  })
}

export function searchTemplates(params, done, fail, always) {
  $.ajax({
    type: 'post',
    url: '/Flight/weixin/templates',
    // dataType: 'json',
    data: params
  }).done(function (jsonResult) {
    done(jsonResult)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // fail(jqXHR.status, jqXHR.statusText)
  }).always(function () {
    always()
  })
}

export function searchCustomMenus(done, fail, always) {
  $.ajax({
    type: 'post',
    url: '/Flight/weixin/menus',
    dataType: 'json'
  }).done(function (jsonResult) {
    done(jsonResult)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // fail(jqXHR.status, jqXHR.statusText)
  }).always(function () {
    always()
  })
}

export function deleteCustomMenu(id, done, fail, always) {
  $.ajax({
    type: 'post',
    url: '/Flight/weixin/menu/' + id + '/delete',
    dataType: 'json'
  }).done(function (jsonResult) {
    done(jsonResult)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // fail(jqXHR.status, jqXHR.statusText)
  }).always(function () {
    always()
  })
}

export function createCustomMenu(params, done, fail, always) {
  $.ajax({
    type: 'post',
    url: '/Flight/weixin/menu/create',
    dataType: 'json',
    data: params
  }).done(function (jsonResult) {
    done(jsonResult)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // fail(jqXHR.status, jqXHR.statusText)
  }).always(function () {
    always()
  })
}

export function searchEntConfig(done, fail, always) {
  $.ajax({
    type: 'post',
    url: WEBAPP_NAME + '/user/searchEntConfig',
    dataType: 'json',
  }).done(function (jsonResult) {
    done(jsonResult)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // fail(jqXHR.status, jqXHR.statusText)
  }).always(function () {
    always()
  })
}

export function saveEntConfig(params, done, fail, always) {
  $.ajax({
    type: 'post',
    url: WEBAPP_NAME + '/user/updateEntConfig',
    dataType: 'json',
    data: params
  }).done(function (jsonResult) {
    done(jsonResult)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // fail(jqXHR.status, jqXHR.statusText)
  }).always(function () {
    always()
  })
}

export function searchHistoryRav(params, done, fail, always) {
  $.ajax({
    type: 'post',
    url: WEBAPP_NAME + '/flights/rav/history',
    dataType: 'json',
    data: params
  }).done(function (jsonResult) {
    done(jsonResult)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // fail(jqXHR.status, jqXHR.statusText)
  }).always(function () {
    always()
  })
}
