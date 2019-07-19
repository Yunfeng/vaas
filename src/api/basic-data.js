import { APP_FLIGHT_PATH, callService } from '../common/common.js'

export function saveSupplier(params, cbDone, cbAlways) {
  const url = APP_FLIGHT_PATH + '/supplier/create'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function searchSuppliers(params, cbDone, cbAlways) {
  const url = APP_FLIGHT_PATH + '/suppliers'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function searchCityInfos(params, cbDone, cbAlways) {
  const url = APP_FLIGHT_PATH + '/cityInfos'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function saveCityInfo(params, cbDone, cbAlways) {
  const url = APP_FLIGHT_PATH + '/cityInfo'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function searchVehicleGroupInfos(params, cbDone, cbAlways) {
  const url = APP_FLIGHT_PATH + '/vehicleGroups'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function saveVehicleGroupInfo(params, cbDone, cbAlways) {
  const url = APP_FLIGHT_PATH + '/vehicleGroup'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function saveCityMapping(params, cbDone, cbAlways) {
  const url = APP_FLIGHT_PATH + '/cityMapping'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}

export function saveVehicleGroupMapping(params, cbDone, cbAlways) {
  const url = APP_FLIGHT_PATH + '/vehicleGroupMapping'
  callService(url, {
    data: params,
    cbDone: cbDone,
    cbAlways: cbAlways
  })
}
