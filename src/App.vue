<template>
  <div class="main-body">
    <router-view />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "./boot/axios";
import { fail } from "./notify/notify";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "App",
  setup() {
    const q = useQuasar();
    const $store = useStore();
    const { locale } = useI18n({ useScope: "global" });
    var lang = q.lang.getLocale();
    if (lang.indexOf("en") > -1) {
      locale.value = "en-US";
    } else {
      locale.value = "ja-JP";
    }

    const user = computed({
      get: () => $store.state.user.user,
      set: (val) => {
        $store.commit("user/updateUserInfo", val);
      },
    });

    const getUserInvitationCode = () => {
      var userid = q.cookies.get("UserID");
      var appid = q.cookies.get("AppID");
      api
        .post(
          "/cloud-hashing-inspire/v1/get/user/invitation/code/by/app/user",
          {
            AppID: appid,
            UserID: userid,
          }
        )
        .then((resp) => {
          if (resp.data.Info === null) {
            $store.commit("verify/setHasInvitationCode", false);
            return;
          }
          $store.commit("verify/setHasInvitationCode", true);
        });
    };

    const open = computed({
      get: () => $store.state.router.router.open,
      set: (val) => {
        $store.commit("router/setOpenSide", val);
      },
    });
    const router = useRouter();
    const path = computed({
      get: () => router.currentRoute.value.path,
    });

    const loginVerify = computed({
      get: () => $store.state.verify.loginVerify,
      set: (val) => {
        $store.commit("verify/updateLoginVerify", val);
      },
    });

    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
      set: (val) => {
        $store.commit("verify/updateVerifyCode", val);
      },
    });

    const oldVerifyCode = computed({
      get: () => $store.state.verify.oldVerifyCode,
      set: (val) => {
        $store.commit("verify/updateOldVerifyCode", val);
      },
    });

    return {
      q,
      user,
      path,
      open,
      locale,
      loginVerify,
      oldVerifyCode,
      verifyCode,
      getUserInvitationCode,
    };
  },

  watch: {
    path: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        if (
          n === "/wallet" ||
          n === "/account" ||
          n === "/order" ||
          n === "/invitation"
        ) {
          this.open = true;
        } else {
          this.open = false;
        }

        if (n !== o) {
          this.verifyCode = "";
          this.oldVerifyCode = "";
        }
      },
    },
  },

  created: function () {
    var appID = "ff2c5d50-be56-413e-aba5-9c7ad888a769";
    this.q.cookies.set("AppID", appID);
    var hasLang = this.q.cookies.has("lang");
    if (hasLang) {
      var lang = this.q.cookies.get("lang");
      switch (lang) {
        case "en-US":
          this.locale = lang;
          break;
        case "ja-JP":
          this.locale = lang;
          break;
        default:
          this.locale = "ja-JP";
          break;
      }
    }

    if (this.q.cookies.has("UserID")) {
      this.loginVerify = true;
    }
  },

  mounted: function () {
    var session = this.q.cookies.get("AppSession");
    var userid = this.q.cookies.get("UserID");
    var sessionCondition =
      session === "" || session === null || session === undefined;
    var useridCondition =
      userid === "" || userid === null || userid === undefined;
    if (sessionCondition || useridCondition) {
      if (
        this.path === "/order" ||
        this.path === "/wallet" ||
        this.path === "/account" ||
        this.path === "/invitation"
      ) {
        this.$router.push("/");
      }
      return;
    }

    if (!this.user.logined && this.loginVerify) {
      this.getUserInfo();
      return;
    }

    this.getUserInvitationCode();
  },

  methods: {
    getUserInfo: function () {
      let self = this;
      var appid = this.q.cookies.get("AppID");
      var userid = this.q.cookies.get("UserID");
      var failToGetUserinfo = this.$t("Notify.User.Fail");
      api
        .post("/user-management/v1/get/user/details", {
          AppID: appid,
          UserID: userid,
        })
        .then((resp) => {
          self.user = {
            logined: true,
            info: resp.data.Info,
          };
        })
        .catch((error) => {
          fail(undefined, failToGetUserinfo, error);
          self.$router.push("/");
        });
    },
  },
});
</script>

<style scoped>
.main-body {
  background-image: url("./assets/procyon-logo-opacity0.025.svg");
  background-position: 90% -360px;
  background-repeat: no-repeat;
  background-size: 800px;
  display: block;
  top: 100;
  right: 0;
  height: auto;
  width: 100%;
}
</style>
