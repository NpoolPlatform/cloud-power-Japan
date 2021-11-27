import { api } from "src/boot/axios";
import { success, fail, waiting } from '../notify/notify'

export function sendCode(email) {
  if (email === "") {
    fail(undefined, "email is null", null);
  }
  const notif = waiting($t('Notify.SendCode.WaitSend'));
  var failToSend = $t('Notify.SendCode.Fail');
  api
    .post("/verification-door/v1/send/email", {
      Email: email,
    })
    .then(function (resp) {
      const msg =
        $t('Notify.SendCode.SendTo') +
        email +
        ", " +
        $t('Notify.SendCode.CheckEmail');
      success(notif, msg);
    })
    .catch(function (error) {
      fail(notif, failToSend, error);
    });
}

export function gaVerify(code) {
  if (code === '') {
    fail(undefined, $t('Notify.GaVerify.CantNull'), "")
    return false
  }

  api.post('/verification-door/v1/verify/google/auth', {
    Code: code,
  }).then(resp => {
    success(undefined, $t('Notify.GaVerify.Success'))
    return true
  }).catch(error => {
    fail(undefined, $t('Notify.GaVerify.Fail'), error)
    return false
  })
  return false
}
