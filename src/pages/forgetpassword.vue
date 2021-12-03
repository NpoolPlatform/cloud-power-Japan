<template>
  <div>
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t("ForgetPassword.Title") }}</span>
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="forgetPasswordInput.email"
              :label="$t('ForgetPassword.Username')"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  $t('ForgetPassword.UsernameInputwarning'),
              ]"
            ></q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="forgetPasswordInput.verifyCode"
              :label="$t('ForgetPassword.EmailVerifyCode')"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  $t('ForgetPassword.EmailVerifyCodeInpuWarning'),
              ]"
            >
              <template v-slot:append>
                <q-btn flat rounded :disable="sendDisable" @click="sendCode">{{
                  getCode
                }}</q-btn>
              </template>
            </q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="forgetPasswordInput.password"
              :label="$t('ForgetPassword.Password')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  $t('ForgetPassword.PasswordInputWarning'),
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="forgetPasswordInput.confirmPassword"
              :label="$t('ForgetPassword.Confirm')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  $t('ForgetPassword.ConfirmInputWarning2'),
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isCPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isCPwd = !isCPwd"
                />
              </template>
            </q-input>

            <q-btn class="register-btn" @click="onConfirm">{{
              $t("ForgetPassword.ConfirmBtn")
            }}</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { api } from "src/boot/axios";
import { fail, success, waiting } from "src/notify/notify";
import { sha256Password } from "src/utils/utils";
import { throttle } from "quasar";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const { locale } = useI18n();
    return {
      locale,
    };
  },

  data() {
    return {
      forgetPasswordInput: {
        email: "",
        verifyCode: "",
        password: "",
        confirmPassword: "",
      },
      isPwd: true,
      isCPwd: true,
      sendDisable: false,
      getCode: this.$t("Register.SendCode"),
      isGeting: false,
      count: 60,
    };
  },

  created: function () {
    this.onConfirm = throttle(this.onConfirm, 1000);
    this.sendCode = throttle(this.sendCode, 1000);
  },

  methods: {
    onConfirm: function () {
      const notif = waiting(this.$t("Notify.ForgetPassword.Waiting"));
      if (
        this.forgetPasswordInput.password !==
        this.forgetPasswordInput.confirmPassword
      ) {
        fail(notif, this.$t("Notify.ForgetPassword.Fail1"), "");
        return;
      }
      var self = this;

      var password = sha256Password(this.forgetPasswordInput.password);

      api
        .post("/user-management/v1/forget/password", {
          EmailAddress: self.forgetPasswordInput.email,
          Password: password,
          Code: self.forgetPasswordInput.verifyCode,
        })
        .then((resp) => {
          success(notif, self.$t("Notify.ForgetPassword.Success"));
          self.$router.push("/login");
        })
        .catch((error) => {
          fail(notif, self.$t("Notify.ForgetPassword.Fail2"), error);
        });
    },

    sendCode: function () {
      if (this.forgetPasswordInput.email === "") {
        fail(undefined, "email is null", null);
      }
      const notif = waiting(this.$t("Notify.SendCode.WaitSend"));
      var failToSend = this.$t("Notify.SendCode.Fail");
      var self = this;
      api
        .post("/verification-door/v1/send/email", {
          Email: self.forgetPasswordInput.email,
          Lang: self.locale,
        })
        .then(function (resp) {
          const msg =
            self.$t("Notify.SendCode.SendTo") +
            self.forgetPasswordInput.email +
            ", " +
            self.$t("Notify.SendCode.CheckEmail");
          success(notif, msg);
          var countDown = setInterval(() => {
            if (self.count < 1) {
              self.isGeting = false;
              self.sendDisable = false;
              self.getCode = self.$t("Register.SendCode");
              self.count = 6;
              clearInterval(countDown);
            } else {
              self.isGeting = true;
              self.sendDisable = true;
              self.getCode = +self.count-- + "s";
            }
          }, 1000);
        })
        .catch(function (error) {
          fail(notif, failToSend, error);
        });
    },
  },
});
</script>

<style scoped src="../css/register-style.css"></style>
<style scoped></style>
