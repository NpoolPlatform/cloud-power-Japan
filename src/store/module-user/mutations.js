export function updateUserInfo(state, user) {
  state.user = user;
}

export function updateUserBasicInfo(state, val) {
  state.user.info.UserBasicInfo = val;
}

export function updateUserLoginVerify(state, val) {
  state.user.info.UserAppInfo.UserApplicationInfo.GALogin = val;
}

export function updateFirstname(state, val) {
  state.user.info.UserBasicInfo.FirstName = val;
}

export function updateLastname(state, val) {
  state.user.info.UserBasicInfo.LastName = val;
}

export function updateStreet1(state, val) {
  state.user.info.UserBasicInfo.StreetAddress1 = val;
}

export function updateStreet2(state, val) {
  state.user.info.UserBasicInfo.StreetAddress2 = val;
}

export function updateCity(state, val) {
  state.user.info.UserBasicInfo.City = val;
}

export function updateProvince(state, val) {
  state.user.info.UserBasicInfo.Province = val;
}

export function updateCountry(state, val) {
  state.user.info.UserBasicInfo.Country = val;
}

export function updatePostalCode(state, val) {
  state.user.info.UserBasicInfo.PostalCode = val;
}

export function updateGA(state, val) {
  state.user.info.UserAppInfo.UserApplicationInfo.GAVerify = val;
}

export function updateUsername(state, val) {
  state.user.info.UserBasicInfo.Username = val;
}

export function updateGender(state, val) {
  state.user.info.UserBasicInfo.Gender = val;
}

export function updateUserLogined(state, val) {
  state.user.logined = val;
}

export function updateUserEmail(state, val) {
  state.user.info.UserBasicInfo.EmailAddress = val;
}

export function updateUserPhone(state, val) {
  state.user.info.UserBasicInfo.PhoneNumber = val;
}
