import { Notify } from "quasar";

export const waiting = function (msg) {
  return Notify.create({
    type: "ongoing",
    message: msg,
  });
};

export const success = function (notif, msg) {
  if (notif == undefined) {
    Notify.create({
      type: "positive",
      message: msg,
    });
    return;
  }

  notif({
    type: "positive",
    message: msg,
  });
};

export const fail = function (notif, msg, error) {
  var data = error;

  if (error == "") {
    Notify.create({
      type: "negative",
      message: msg,
    });
    return;
  }

  if (error.response != undefined) {
    data = error.response.data;
  }

  if (notif == undefined) {
    Notify.create({
      type: "negative",
      message: msg + ": " + error,
      caption: JSON.stringify(data),
    });
    return;
  }

  notif({
    type: "negative",
    message: msg + ": " + error,
    caption: JSON.stringify(data),
  });
};

export const hint = function (notif, msg) {
  if (notif == undefined) {
    Notify.create({
      type: "warning",
      message: msg,
    });
    return;
  }

  notif({
    type: "warning",
    message: msg,
  });
};

export default (success, fail, waiting, hint);
