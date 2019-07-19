import { WEBAPP_NAME, callService } from '../common/common.js'

export function queryRentalCarPrice(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/rentalCar/price'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function submitRentalCarOrder(params, cbDone) {
  const url = WEBAPP_NAME + '/rentalCar/order'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function cancelRentalCarOrder(id, cbDone) {
  const url = WEBAPP_NAME + '/rentalCar/orders/' + id + '/cancel'
  callService(url, {
    cbDone: cbDone
  })
}

export function searchRentalCarOrders(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/rentalCar/orders'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function searchRentalCarOrder(id, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/rentalCar/orders/' + id
  callService(url, {
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}


export function searchRentalOrderHistory(id, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/rentalCar/orders/' + id + '/history'
  callService(url, {
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function showOrderStatusDesc (status) {
  var desc = ''
  switch (status) {
    case 0: desc = '未提交'; break
    case 1: desc = '待处理'; break
    case 2: desc = '处理中'; break
    case 4: desc = '已取消'; break
    case 8: desc = '已完成'; break
    default:
      desc = status
  }
  return desc
}

export function showUseTypeDesc (status) {
  var desc = ''
  switch (status) {
    case 1: desc = '接机'; break
    case 2: desc = '送机'; break
    default:
      desc = status
  }
  return desc
}