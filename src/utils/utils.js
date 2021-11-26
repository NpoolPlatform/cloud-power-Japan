import { api } from "src/boot/axios";
import { success, fail, waiting } from '../notify/notify'

export function sendCode(email) {
  if (email === "") {
    fail(undefined, "email is null", null);
  }
  const notif = waiting("send code successfully");
  var failToSend = "fail to send code";
  api
    .post("/verification-door/v1/send/email", {
      Email: email,
    })
    .then(function (resp) {
      const msg =
        "code has been sent" +
        email +
        ", " +
        "please check your email";
      success(notif, msg);
    })
    .catch(function (error) {
      fail(notif, failToSend, error);
    });
}

export function gaVerify(code) {
  if (code === '') {
    fail(undefined, "verify code can't be null", "")
    return false
  }

  api.post('/verification-door/v1/verify/google/auth', {
    Code: code,
  }).then(resp => {
    success(undefined, "successfully verify google authentication")
    return true
  }).catch(error => {
    fail(undefined, "fail to verify google authentication", error)
    return false
  })
  return false
}
