import { APP_FLIGHT_PATH, callService } from '../common/common.js'


export function searchVasOrders(params, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/vasOrders'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function searchInsuranceOrders(params, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/insurance'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function createVasOrder(params, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/vas/new'
  callService(url, {
    contentType: 'application/json',
    data: params,
    cbDone: cbDone
  })
}

// 取消订单
export function cancelVasOrder(id, params, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/vas/' + id + '/status/canceled'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function searchVasOrderDetail(id, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/vas/' + id
  callService(url, {
    cbDone: cbDone
  })
}

export function searchVasOrderHistory(id, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/vas/' + id + '/history'
  callService(url, {
    cbDone: cbDone
  })
}


export function sendSms(id, params, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/vas/' + id + '/sms'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}