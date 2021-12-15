import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import user from "./module-user";
import router from "./module-router";
import goods from "./module-goods";
import orders from "./module-order";
import lang from "./module-lang";
import verify from "./module-verify";
import style from "./module-style";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      user,
      router,
      goods,
      orders,
      lang,
      verify,
      style,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
