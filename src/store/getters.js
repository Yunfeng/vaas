// import { searchPrivileges } from '../api/user.js'

export const getters = {
  hasPrivileges: state => (resContent) => {
    let aa = state.privileges.find(info => info.content === resContent)
    let b = state.systemAdmin || state.roles.indexOf('ROLE_ADMIN') >= 0 || aa !== undefined
    return b;
  },
  isAdmin: state => {
    return state.roles.indexOf('ROLE_ADMIN') >= 0 || state.roles.indexOf('ROLE_SUPERVISOR') >= 0
  }
}
