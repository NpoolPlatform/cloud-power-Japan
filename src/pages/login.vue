<template>
  <div class="main">
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t("Register.LoginTitle") }}</span>
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <q-input
              ref="usernameRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.username"
              :label="$t('Register.Username')"
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
              @click="login"
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

    <q-dialog v-model="emailDialog" persistent>
      <q-card style="width: 600px; height: auto; margin: 20px">
        <q-card-section>
          <span class="card-title text-black">Email Verify</span>
        </q-card-section>
        <q-card-section style="padding: 0 20px">
          <q-input
            ref="usernameRef"
            class="register-input"
            outlined
            bg-color="blue-grey-1"
            v-model="emailVerifyInput.email"
            :label="$t('Register.Username')"
            lazy-rules
            :rules="usernameRule"
          ></q-input>
        </q-card-section>
        <q-card-section style="padding: 0 20px">
          <send-code-input
            :verifyParam="emailVerifyInput.email"
            verifyType="email"
          ></send-code-input>
        </q-card-section>

        <q-card-section style="padding: 0 20px">
          <q-btn class="register-btn" @click="onVerifyEmail">{{
            $t("Register.ConfirmBtn")
          }}</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from "vue";
import RecaptchaVue from "src/components/Recaptcha.vue";
import { useStore } from "vuex";
import { api } from "src/boot/axios";
import { success, fail, waiting } from "../notify/notify";
import VerifycodeInput from "src/components/VerifycodeInput.vue";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { sha256Password } from "src/utils/utils";
import { throttle } from "quasar";
import SendCodeInput from "src/components/SendCodeInput.vue";

export default defineComponent({
  components: { RecaptchaVue, VerifycodeInput, SendCodeInput },
  setup() {
    const { locale } = useI18n({ useScope: "global" });
    const q = useQuasar();

    const $store = useStore();

    const user = computed({
      get: () => $store.state.user.user,
      set: (val) => {
        $store.commit("user/updateUserInfo", val);
      },
    });

    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
      set: (val) => {
        $store.commit("verify/updateVerifyCode", val);
      },
    });

    const emailVerifyInput = reactive({
      email: ref(""),
      emailCode: verifyCode.value,
    });

    const { t } = useI18n({ useScope: "global" });

    const usernameRef = ref(null);

    const passRef = ref(null);
    const usernameRule = ref([
      (val) => (val && val.length > 0) || t("Register.UsernameInputwarning"),
    ]);
    const passwordRule = ref([
      (val) => (val && val.length > 0) || t("Register.PasswordInputWarning"),
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
    login: function () {
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
          } else if (resp.data.Info.UserBasicInfo.EmailAddress !== "") {
            self.emailDialog = true;
            return;
          } else {
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

    verifyCallback: function (resp) {
      var self = this;
      if (resp === "pass") {
        this.gaDialog = false;
        this.$router.push({
          path: "/",
        });
        this.loginVerify = true;
      } else {
        self.loginInput.username = "";
        self.loginInput.password = "";
        self.loginInput.verifyCode = "";
        self.loginInput.response = "";
        this.q.cookies.remove("UserID");
        this.q.cookies.remove("AppSession");
        this.q.cookies.remove("Session");
        fail(undefined, "please inoput correct verify code", "");
        location.reload();
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

    onVerifyEmail: function () {
      this.usernameRef.validate();
      if (this.usernameRef.hasError) {
        return;
      }

      var userid = this.q.cookies.get("UserID");
      var self = this;
      api
        .post("/verification-door/v1/verify/code/with/userid", {
          UserID: userid,
          Param: self.emailVerifyInput.email,
          Code: self.verifyCode,
        })
        .then((resp) => {
          self.emailDialog = false;
          self.loginVerify = true;
          self.$router.push({
            path: "/",
          });
        })
        .catch((error) => {
          var msg = $t("ReLogin.Fail");
          fail(undefined, msg, error);
          self.loginInput.username = "";
          self.loginInput.password = "";
          self.verifyCode = "";
          self.loginInput.response = "";
          this.q.cookies.remove("UserID");
          this.q.cookies.remove("AppSession");
          this.q.cookies.remove("Session");
          location.reload();
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
