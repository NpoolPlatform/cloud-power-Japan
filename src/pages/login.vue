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
            >{{ $t("ChangePassword.UsePhone") }}</a
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
            <div v-if="refreshRecaptcha">
              <recaptcha-vue @callback="callback"></recaptcha-vue>
            </div>

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
            >{{ $t("ChangePassword.UseEmail") }}</a
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
            <div v-if="refreshRecaptcha">
              <recaptcha-vue @callback="callback"></recaptcha-vue>
            </div>

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
      <q-card>
        <q-card-section>
          <span class="card-title text-black">Google Verify</span>
        </q-card-section>
        <q-card-section>
          <verifycode-input @callback="verifyCallback"></verifycode-input>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="emailDialog" persistent @hide="whenHide">
      <q-card style="width: 600px; height: auto; margin: 20px">
        <q-card-section>
          <span class="card-title text-black">Email Verify</span>
        </q-card-section>

        <q-card-section class="google-content">
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
import RecaptchaVue from "src/components/Recaptcha.vue";
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
  components: { RecaptchaVue, VerifycodeInput, CountryCode },
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

    onMounted(() => {
      verifyCode.value = "";
      if (q.cookies.has("UserID") && q.cookies.has("AppSession")) {
        q.cookies.remove("UserID");
        q.cookies.remove("AppSession");
        location.reload();
      }
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
      refreshRecaptcha: true,
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
        this.loginInput.response === "" ||
        this.loginInput.response === null ||
        this.loginInput.response === undefined
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
          GoogleRecaptchaResponse: self.loginInput.response,
        })
        .then((resp) => {
          self.user = {
            logined: true,
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
            self.$router.push({
              path: "/",
            });
          }
          return;
        })
        .catch((error) => {
          fail(notif, self.$t("Notify.Login.Fail"), error);
          self.loginInput.username = "";
          self.loginInput.password = "";
          self.loginInput.response = "";
          self.refreshRecaptcha = false;
          self.$nextTick(() => {
            self.refreshRecaptcha = true;
          }, 500);
        });
    },

    loginByPhone: function () {
      this.passRef.validate();

      if (
        this.loginInput.response === "" ||
        this.loginInput.response === null ||
        this.loginInput.response === undefined
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
          GoogleRecaptchaResponse: self.loginInput.response,
        })
        .then((resp) => {
          self.user = {
            logined: true,
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
            self.loginVerify = true;
            self.$router.push({
              path: "/",
            });
          }
          return;
        })
        .catch((error) => {
          fail(notif, self.$t("Notify.Login.Fail"), error);
          self.phone = "";
          self.loginInput.password = "";
          self.loginInput.response = "";
          self.refreshRecaptcha = false;
          self.$nextTick(() => {
            self.refreshRecaptcha = true;
          }, 500);
        });
    },

    verifyCallback: function (resp) {
      var self = this;
      if (resp === "pass") {
        this.gaDialog = false;
        this.loginVerify = true;

        this.$router.push({
          path: "/",
        });
      } else {
        fail(undefined, "please inoput correct verify code", "login again");
        self.loginInput.response = "";
        self.q.cookies.remove("UserID");
        self.q.cookies.remove("AppSession");
        self.q.cookies.remove("Session");
        self.phone = "";
        self.verifyCode = "";
        self.logined = false;
        self.refreshRecaptcha = false;
        self.$nextTick(() => {
          self.refreshRecaptcha = true;
        }, 500);
        self.gaDialog = false;
      }
    },

    callback: function (resp) {
      var self = this;
      switch (resp) {
        case "expired":
          break;
        case "error":
          break;
        default:
          this.loginInput.response = resp;
          break;
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
          self.emailDialog = false;
          self.loginVerify = true;
          self.visible = false;

          self.$router.push({
            path: "/",
          });
        })
        .catch((error) => {
          failCodeError(
            error,
            self.$t("CodeFail.Fail1"),
            self.$t("CodeFail.Fail2")
          );
          self.visible = false;
          self.verifyCode = "";
          self.loginInput.response = "";
          self.q.cookies.remove("UserID");
          self.q.cookies.remove("AppSession");
          self.q.cookies.remove("Session");
          self.phone = "";
          self.logined = false;
          self.refreshRecaptcha = false;
          self.$nextTick(() => {
            self.refreshRecaptcha = true;
          }, 500);
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
