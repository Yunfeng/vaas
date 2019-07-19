import { APP_FLIGHT_PATH, callService } from '../common/common.js'


export function searchSms(params, cbDone) {
  const url = APP_FLIGHT_PATH + '/sms/'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function sendFlightOrderSms(id, params, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/flight/' + id + '/sms'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function getFlightOrderSmsContent(id, params, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/flight/' + id + '/smsContent'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function sendFlightOrderApprovalSms(id, params, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/flight/' + id + '/sendApprovalSms'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}

export function getFlightOrderApprovalSmsContent(id, cbDone) {
  const url = APP_FLIGHT_PATH + '/order/flight/' + id + '/approvalSmsContent'
  callService(url, {
    cbDone: cbDone
  })
}