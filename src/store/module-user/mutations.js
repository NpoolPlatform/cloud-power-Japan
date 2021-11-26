export function updateUserInfo (state, user) {
  state.user = user
}

export function updateUserLoginVerify (state, val) {
  state.user.info.UserAppInfo.UserApplicationInfo.GALogin = val
}