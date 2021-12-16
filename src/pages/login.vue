<template>
  <div class="main">
    <div class="content">
      <q-card class="register-card" v-if="showEmail">
        <q-card-section class="card-title">
          <span>{{ $t("Register.LoginTitle") }}</span>
          <a
            class="link"
            style="
              font-size: 16px;
              font-weight: 200;
              margin-right: 10px;
              cursor: pointer;
            "
            @click="
              showEmail = false;
              showPhone = true;
            "
            >{{ $t("Login.PhoneLogin") }}</a
          >
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <q-input
              ref="usernameRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.username"
              :label="$t('Login.LoginUsername')"
              lazy-rules
              :rules="usernameRule"
            ></q-input>

            <q-input
              ref="passRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.password"
              :label="$t('Register.Password')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="passwordRule"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-btn
              id="loginBtn"
              class="register-btn"
              style="margin: 25px 0 10px 0; width: 100%"
              @click="loginByUsername"
              >{{ $t("Register.Login") }}</q-btn
            >
            <div class="bottom-style">
              <router-link
                class="link-style"
                :to="{ path: '/forgetpassword/email' }"
                >{{ $t("Login.Forget") }}</router-link
              >
              <div>
                <span>{{ $t("Login.NoAccount") }}</span>
                <router-link
                  class="link-style"
                  :to="{ path: '/emailregister' }"
                  >{{ $t("Login.Register") }}</router-link
                >
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <q-card class="register-card" v-if="showPhone">
        <q-card-section class="card-title">
          <span>{{ $t("Register.LoginTitle") }}</span>
          <a
            style="
              font-size: 16px;
              font-weight: 200;
              margin-right: 10px;
              cursor: pointer;
            "
            class="link"
            @click="
              showEmail = true;
              showPhone = false;
            "
            >{{ $t("Login.EmailLogin") }}</a
          >
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <country-code></country-code>

            <q-input
              ref="passRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.password"
              :label="$t('Register.Password')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="passwordRule"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-btn
              id="loginBtn"
              class="register-btn"
              style="margin: 25px 0 10px 0; width: 100%"
              @click="loginByPhone"
              >{{ $t("Register.Login") }}</q-btn
            >
            <div class="bottom-style">
              <router-link
                class="link-style"
                :to="{ path: '/forgetpassword/phone' }"
                >{{ $t("Login.Forget") }}</router-link
              >
              <div>
                <span>{{ $t("Login.NoAccount") }}</span>
                <router-link
                  class="link-style"
                  :to="{ path: '/emailregister' }"
                  >{{ $t("Login.Register") }}</router-link
                >
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="gaDialog" persistent>
      <q-card style="color: #e1eeef; background: #23292b; padding: 24px">
        <q-card-section style="margin-left: 10px">
          <span class="card-title">{{ $t("GoogleVerify.Title") }}</span>
        </q-card-section>
        <q-card-section>
          <verifycode-input @callback="verifyCallback"></verifycode-input>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="emailDialog" persistent @hide="whenHide">
      <q-card
        style="
          width: 600px;
          height: auto;
          margin: 20px;
          color: #e1eeef;
          background: #23292b;
          padding: 24px;
        "
      >
        <q-card-section style="margin-left: 10px">
          <span class="card-title">{{ $t("Login.EmailVerifyTitle") }}</span>
        </q-card-section>

        <q-card-section class="google-content" style="color: #e1eeef">
          {{ $t("Notify.Login.EmailInputVerify1")
          }}{{ user.info.UserBasicInfo.EmailAddress }},
          {{ $t("Notify.Login.EmailInputVerify2")
          }}{{ $t("Notify.Login.EmailInputVerify3") }}
        </q-card-section>

        <q-card-section>
          <div class="row-center captcha_input_wrapper">
            <input
              v-for="(item, index) in captchas"
              :key="index"
              v-model="item.num"
              :id="'captcha' + index"
              @input="inputFinash(index)"
              @focus="adjust(index)"
              @keydown="inputDirection(index)"
              class="captcha_input_box row-center"
              type="tel"
              maxlength="1"
            />
          </div>

          <q-inner-loading
            :showing="visible"
            :label="$t('GoogleVerify.PleaseWait')"
            label-class="text-teal"
            label-style="font-size: 1.1em"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { api } from "src/boot/axios";
import { success, fail, waiting } from "../notify/notify";
import VerifycodeInput from "src/components/VerifycodeInput.vue";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { parseUsername, sha256Password, failCodeError } from "src/utils/utils";
import { throttle } from "quasar";
import CountryCode from "src/components/CountryCode.vue";

export default defineComponent({
  components: { VerifycodeInput, CountryCode },
  setup() {
    const { t, locale } = useI18n({ useScope: "global" });
    const q = useQuasar();
    const $store = useStore();

    const user = computed({
      get: () => $store.state.user.user,
      set: (val) => {
        $store.commit("user/updateUserInfo", val);
      },
    });

    const phone = computed({
      get: () => $store.state.verify.phone,
      set: (val) => {
        $store.commit("verify/updatePhone", val);
      },
    });

    const logined = computed({
      get: () => $store.state.user.user.logined,
      set: (val) => {
        $store.commit("user/updateUserLogined", val);
      },
    });

    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
      set: (val) => {
        $store.commit("verify/updateVerifyCode", val);
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

    const gResponse = ref("");

    const initGrecaptcha = () => {
      window.grecaptcha.ready(function () {
        var self = this;

        window.grecaptcha
          .execute("6LclwaIdAAAAAKVQTwz8FYinU0rP43_m6EedDv2S", {
            action: "login",
          })
          .then(function (token) {
            gResponse.value = token;
            console.log("token is", token);
          });
      });
    };

    onMounted(() => {
      verifyCode.value = "";
      if (q.cookies.has("UserID") && q.cookies.has("AppSession")) {
        q.cookies.remove("UserID");
        q.cookies.remove("AppSession");
        logined.value = false;
      }
      initGrecaptcha();
    });

    const emailVerifyInput = reactive({
      email: "",
      emailCode: "",
    });

    const usernameRef = ref(null);

    const passRef = ref(null);
    const usernameRule = ref([
      (val) => parseUsername(val) || t("Login.UsernameInputwarning"),
    ]);

    const passwordRule = ref([
      (val) => (val && val.length > 0) || t("Login.PasswordInputWarning"),
    ]);

    const loginVerify = computed({
      get: () => $store.state.verify.loginVerify,
      set: (val) => {
        $store.commit("verify/updateLoginVerify", val);
      },
    });

    return {
      isPwd: ref(true),
      usernameRule,
      user,
      usernameRef,
      passwordRule,
      passRef,
      emailDialog: ref(false),
      emailVerifyInput,
      q,
      verifyCode,
      loginVerify,
      locale,
      visible: ref(false),
      showEmail: ref(true),
      showPhone: ref(false),
      phone,
      logined,
      gResponse,
      initGrecaptcha,
      getUserInvitationCode,
    };
  },

  watch: {
    finish: {
      deep: true,
      immediate: true,
      handler: function (n, o) {},
    },
  },

  data() {
    return {
      siteKey: "6LdlXU4dAAAAAJz1WqVn2xkIwQrSH38x6tYRAD_m",
      gaVerifyCode: "",
      gaDialog: false,
      authCode: "",
      finish: "",
      loginInput: {
        username: "",
        password: "",
        response: "",
      },
      activeInput: 0,
      captchas: [
        { num: "" },
        { num: "" },
        { num: "" },
        { num: "" },
        { num: "" },
        { num: "" },
      ],
    };
  },

  created: function () {
    this.login = throttle(this.login, 1000);
  },

  computed: {
    getCode: function () {
      return this.count + "s";
    },
  },

  methods: {
    // 自动校准输入顺序
    adjust(index) {
      let dom = document.getElementById("captcha" + this.activeInput);
      if (index !== this.activeInput && dom) {
        dom.focus();
      }
    },
    // 控制前后方向
    inputDirection(index) {
      let val = this.captchas[index].num;
      // 回退键处理
      if (event.keyCode == 8 && val == "") {
        // 重新校准
        let dom = document.getElementById("captcha" + (index - 1));
        this.activeInput = index - 1;
        if (dom) dom.focus();
      }
      if (event.keyCode != 8 && val != "") {
        let dom = document.getElementById("captcha" + (index + 1));
        this.activeInput = index + 1;
        if (dom) dom.focus();
      }
    },
    // 输入框相互联动
    inputFinash(index) {
      let val = this.captchas[index].num;
      this.activeInput = val ? index + 1 : index - 1;
      let dom = document.getElementById("captcha" + this.activeInput);
      var self = this;
      if (dom) dom.focus();
      if (index == this.captchas.length - 1) {
        let code = this.captchas.map((x) => x.num).join("");
        if (code.length == 6) {
          self.onVerifyEmail(code);
          self.visible = true;
        }
      }
    },

    whenHide: function () {
      this.verifyCode = "";
    },

    sendCode: function () {
      var self = this;
      var notif = waiting(this.$t("Notify.SendCode.Email.WaitSend"));
      var msg =
        this.$t("Notify.SendCode.Send1") +
        " <" +
        this.user.info.UserBasicInfo.EmailAddress +
        ">, " +
        this.$t("Notify.SendCode.Send2") +
        this.$t("Notify.SendCode.Phone.Check");
      var failToSend = this.$t("Notify.SendCode.Fail");

      var username = "";
      if (this.locale === "en-US") {
        if (
          this.user.info.UserBasicInfo.FirstName !== "" &&
          this.user.info.UserBasicInfo.FirstName !== null &&
          this.user.info.UserBasicInfo.FirstName !== undefined
        ) {
          username = this.user.info.UserBasicInfo.FirstName;
        }
      } else {
        if (
          this.user.info.UserBasicInfo.LastName !== "" &&
          this.user.info.UserBasicInfo.LastName !== null &&
          this.user.info.UserBasicInfo.LastName !== undefined
        ) {
          username = this.user.info.UserBasicInfo.LastName;
        }
      }

      api
        .post("/verification-door/v1/send/email", {
          Email: self.user.info.UserBasicInfo.EmailAddress,
          Username: username,
          Lang: self.locale,
        })
        .then((resp) => {
          success(notif, msg);
          self.emailDialog = true;
        })
        .catch((error) => {
          fail(notif, failToSend, error);
        });
    },

    loginByUsername: function () {
      this.usernameRef.validate();
      this.passRef.validate();

      if (this.usernameRef.hasError || this.passRef.hasError) {
        return;
      }

      if (
        this.gResponse === "" ||
        this.gResponse === null ||
        this.gResponse === undefined
      ) {
        fail(undefined, this.$t("Notify.Recaptcha.Fail"), "");
        return;
      }
      let self = this;

      var notif = waiting(this.$t("Notify.Login.Wait"));
      var password = sha256Password(this.loginInput.password);

      api
        .post("/login-door/v1/login", {
          Username: self.loginInput.username,
          Password: password,
          GoogleRecaptchaResponse: self.gResponse,
        })
        .then((resp) => {
          self.user = {
            logined: false,
            info: resp.data.Info,
          };
          success(notif, self.$t("Notify.Login.Success"));
          if (resp.data.Info.UserAppInfo.UserApplicationInfo.GALogin) {
            self.gaDialog = true;
            return;
          } else if (
            resp.data.Info.UserBasicInfo.EmailAddress !== "" &&
            resp.data.Info.UserBasicInfo.EmailAddress !== null &&
            resp.data.Info.UserBasicInfo.EmailAddress !== undefined
          ) {
            self.sendCode();
            return;
          } else {
            self.loginVerify = true;
            self.logined = true;
            self.$router.push({
              path: "/",
            });
          }
          return;
        })
        .catch((error) => {
          console.log(error.response.data);
          if (
            error.response.data.message.indexOf("input password is wrong") !==
            -1
          ) {
            fail(
              notif,
              self.$t("Notify.Login.Fail"),
              self.$t("Login.PasswordError")
            );
          } else if (
            error.response.data.message.indexOf("user not found") !== -1
          ) {
            fail(
              notif,
              self.$t("Notify.Login.Fail"),
              self.$t("Login.UserNotFound")
            );
          } else {
            fail(notif, self.$t("Notify.Login.Fail"), error);
          }
          self.loginInput.username = "";
          self.loginInput.password = "";
          self.logined = false;
          self.loginVerify = false;
          self.gResponse = "";
          self.initGrecaptcha();
        });
    },

    loginByPhone: function () {
      this.passRef.validate();

      if (
        this.gResponse === "" ||
        this.gResponse === null ||
        this.gResponse === undefined
      ) {
        fail(undefined, this.$t("Notify.Recaptcha.Fail"), "");
        return;
      }
      let self = this;

      var notif = waiting(this.$t("Notify.Login.Wait"));
      var password = sha256Password(this.loginInput.password);

      api
        .post("/login-door/v1/login", {
          Phone: self.phone,
          Password: password,
          GoogleRecaptchaResponse: self.gResponse,
        })
        .then((resp) => {
          self.user = {
            logined: false,
            info: resp.data.Info,
          };
          success(notif, self.$t("Notify.Login.Success"));
          self.phone = "";
          if (resp.data.Info.UserAppInfo.UserApplicationInfo.GALogin) {
            self.gaDialog = true;
            return;
          } else if (
            resp.data.Info.UserBasicInfo.EmailAddress !== "" &&
            resp.data.Info.UserBasicInfo.EmailAddress !== null &&
            resp.data.Info.UserBasicInfo.EmailAddress !== undefined
          ) {
            self.sendCode();
            return;
          } else {
            self.logined = true;
            self.loginVerify = true;
            self.$router.push({
              path: "/",
            });
          }
          return;
        })
        .catch((error) => {
          fail(notif, self.$t("Notify.Login.Fail"), error);
          self.logined = false;
          self.loginVerify = false;
          self.phone = "";
          self.loginInput.password = "";
          self.gResponse = "";
          self.initGrecaptcha();
        });
    },

    verifyCallback: function (resp) {
      var self = this;
      if (resp === "pass") {
        this.loginVerify = true;
        this.logined = true;
        this.gaDialog = false;
        this.getUserInvitationCode();

        this.$router.push({
          path: "/",
        });
      } else {
        fail(undefined, "please inoput correct verify code", "login again");
        self.gResponse = "";
        self.logined = false;
        self.loginVerify = false;
        self.q.cookies.remove("UserID");
        self.q.cookies.remove("AppSession");
        self.q.cookies.remove("Session");
        self.phone = "";
        self.verifyCode = "";
        self.initGrecaptcha();
        self.gaDialog = false;
      }
    },

    onVerifyEmail: function (code) {
      this.usernameRef.validate();
      if (this.usernameRef.hasError) {
        return;
      }

      var userid = this.q.cookies.get("UserID");
      var self = this;
      api
        .post("/verification-door/v1/verify/code/with/userid", {
          UserID: userid,
          Param: self.user.info.UserBasicInfo.EmailAddress,
          Code: code,
        })
        .then((resp) => {
          self.loginVerify = true;
          self.logined = true;
          self.visible = false;
          self.emailDialog = false;
          self.getUserInvitationCode();

          self.$router.push({
            path: "/",
          });
        })
        .catch((error) => {
          failCodeError(
            undefined,
            error,
            "verify email code error",
            self.$t("CodeFail.Fail1"),
            self.$t("CodeFail.Fail2")
          );
          self.logined = false;
          self.loginVerify = false;
          self.visible = false;
          self.verifyCode = "";
          self.captchas = [
            { num: "" },
            { num: "" },
            { num: "" },
            { num: "" },
            { num: "" },
            { num: "" },
          ];
          self.gResponse = "";
          self.q.cookies.remove("UserID");
          self.q.cookies.remove("AppSession");
          self.q.cookies.remove("Session");
          self.phone = "";
          self.initGrecaptcha();
          self.emailDialog = false;
        });
    },
  },
});
</script>

<style scoped src="../css/register-style.css"></style>
<style scoped>
.bottom-style {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
}

.link-style {
  color: #1ec498;
  border-bottom: none;
  text-decoration: none;
}
</style>

<style>
.q-field--error .q-field__bottom {
  color: #fc4468;
}
</style>

<style lang="scss">
.row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.captcha_input_wrapper {
  width: 100%;
}
.captcha_input_box {
  height: 100px;
  width: 60px;
  margin: 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid #dddddd;
  font-size: 32px;
  text-align: center;
  color: #1e243a;
}

.google-content {
  margin: 10px 20px;
  color: black;
  font-size: 18px;
}
</style>
