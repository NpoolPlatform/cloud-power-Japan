import { api } from "src/boot/axios";
import { success, fail, waiting } from "../notify/notify";
import sha256 from "crypto-js/sha256";
import { useI18n } from "vue-i18n";

export function sendCode(email) {
  if (email === "") {
    fail(undefined, "email is null", null);
  }
  const { t } = useI18n({ useScope: "global" });
  const notif = waiting(t("Notify.SendCode.WaitSend"));
  var failToSend = t("Notify.SendCode.Fail");
  api
    .post("/verification-door/v1/send/email", {
      Email: email,
    })
    .then(function (resp) {
      const msg =
        t("Notify.SendCode.SendTo") +
        email +
        ", " +
        t("Notify.SendCode.CheckEmail");
      success(notif, msg);
    })
    .catch(function (error) {
      fail(notif, failToSend, error);
    });
}

export function gaVerify(code) {
  const fail1 = $t("Notify.GaVerify.CantNull");
  const fail2 = $t("Notify.GaVerify.Fail");
  const successMsg = $t("Notify.GaVerify.Success");
  if (code === "") {
    fail(undefined, fail1, "");
    return false;
  }

  api
    .post("/verification-door/v1/verify/google/auth", {
      Code: code,
    })
    .then((resp) => {
      success(undefined, successMsg);
      return true;
    })
    .catch((error) => {
      fail(undefined, fail2, error);
      return false;
    });
  return false;
}

export function timestampToDate(timestamp) {
  var date = new Date(timestamp * 1000);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate();
  return Y + M + D;
}

export function sha256Password(password) {
  return sha256(password).toString();
}

export function parsePassword(password) {
  if (password === "" || password === " ") {
    return false;
  }

  if (password.length > 16 || password.length < 8) {
    return false;
  }

  if (password.indexOf(" ") !== -1) {
    return false;
  }

  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(password)) {
    return false;
  }

  reg = /^[a-zA-Z]+$/;
  if (reg.test(password)) {
    return false;
  }

  return true;
}

export function parseUsername(username) {
  if (username === "" || username === " ") {
    return false;
  }

  if (username.length > 32 || username.length < 4) {
    return false;
  }

  if (username.indexOf(" ") !== -1) {
    return false;
  }

  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(username)) {
    return false;
  }
  return true;
}

export function parseEmail(email) {
  if (email == null || email == "") {
    return false;
  }
  var regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (!regExp.test(email)) {
    return false;
  }
  return true;
}

export function parsePhone(phone) {
  if (phone == null || phone == "") {
    return false;
  }

  if (phone.length > 11) {
    return false;
  }
  var regExp = /^\d+$/;
  if (!regExp.test(phone)) {
    return false;
  }

  return true;
}

export function failCodeError(notif, error, reason, reason1, reason2) {
  if (error.response.data.message.indexOf("redis: nil") !== -1) {
    fail(notif, reason1, reason2);
  } else {
    fail(notif, reason, error.response.data.message);
  }
}
