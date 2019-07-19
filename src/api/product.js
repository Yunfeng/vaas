import { WEBAPP_NAME, callService } from '../common/common.js'

export function createProduct(params, cbDone, fail, cbAlways) {
  const url = WEBAPP_NAME + '/product'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}


export function searchProducts(params, done, fail, always) {
  callService(WEBAPP_NAME + '/products', {
    data: params,
    cbDone: done,
    cbAlways: always
  })
}

export function deleteInsurance(id, cbDone, fail, cbAlways) {
  const url = WEBAPP_NAME + '/product/' + id + '/delete'
  callService(url, {
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function getServiceProduct(id, cbDone) {
  const url = WEBAPP_NAME + '/product/' + id
  callService(url, {
    cbDone: cbDone
  })
}

export function createInsurance(params, done, fail, always) {
  $.ajax({
    type: 'post',
    url: WEBAPP_NAME + '/p/insurance/create',
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

export function searchInsurances(params, done, fail, always) {
  $.ajax({
    type: 'post',
    url: WEBAPP_NAME + '/p/insurances',
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
