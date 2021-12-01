import { api } from "src/boot/axios";
import { success, fail, waiting } from "../notify/notify";
import sha256 from "crypto-js/sha256";

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
  var D = date.getDate() + " ";
  return Y + M + D;
}

export function sha256Password(password) {
  return sha256(password).toString();
}
