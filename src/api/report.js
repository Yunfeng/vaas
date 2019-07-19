import { WEBAPP_NAME, callService } from '../common/common.js'

export function searchRentalCarReport(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/report/rentalcar'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function searchVasReport(params, cbDone, cbAlways) {
  const url = WEBAPP_NAME + '/report/vas'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

