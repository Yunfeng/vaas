import { WEBAPP_NAME, callService } from '../common/common.js'

export function authWorkWeixinUser(params, cbDone) {
  const url = WEBAPP_NAME + '/qyweixin/getUserDetailByCode'
  callService(url, {
    data: params,
    cbDone: cbDone
  })
}