<template>
  <div>
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t("ForgetPassword.Title") }}</span>
          <router-link
            style="font-size: 16px; font-weight: 200; margin-right: 10px"
            class="link"
            :to="{ path: '/forgetpassword/phone' }"
            >{{ $t("ForgetPassword.UsePhone") }}</router-link
          >
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
              ref="emailRef"
            ></q-input>

            <send-code-input
              :verifyParam="forgetPasswordInput.email"
              verifyType="email"
            ></send-code-input>

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
              ref="passwordRef"
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
              ref="confirmPasswordRef"
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
import { defineComponent, ref, reactive, computed } from "vue";
import { api } from "src/boot/axios";
import { useStore } from "vuex";
import { fail, success, waiting } from "src/notify/notify";
import { sha256Password } from "src/utils/utils";
import { throttle } from "quasar";
import { useI18n } from "vue-i18n";
import SendCodeInput from "src/components/SendCodeInput.vue";

export default defineComponent({
  components: { SendCodeInput },
  setup() {
    const { locale } = useI18n();
    const count = ref(0);
    const $store = useStore();

    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
      set: (val) => {
        $store.commit("verify/updateVerifyCode", val);
      },
    });

    const forgetPasswordInput = reactive({
      email: ref(""),
      verifyCode: verifyCode,
      password: ref(""),
      confirmPassword: ref(""),
    });

    const emailRef = ref(null);
    const passwordRef = ref(null);
    const oldPasswordRef = ref(null);

    return {
      locale,
      count,
      verifyCode,
      forgetPasswordInput,
      emailRef,
      passwordRef,
      oldPasswordRef,
    };
  },

  data() {
    return {
      isPwd: true,
      isCPwd: true,
    };
  },

  created: function () {
    this.onConfirm = throttle(this.onConfirm, 1000);
  },

  methods: {
    onConfirm: function () {
      this.emailRef.validate();
      this.passwordRef.validate();
      this.oldPasswordRef.validate();

      if (
        this.emailRef.hasError ||
        this.passwordRef.hasError ||
        this.oldPasswordRef.hasError
      ) {
        return;
      }

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
          VerifyParam: self.forgetPasswordInput.email,
          Password: password,
          VerifyType: "email",
          Code: self.forgetPasswordInput.verifyCode,
        })
        .then((resp) => {
          success(notif, self.$t("Notify.ForgetPassword.Success"));
          self.$router.push("/login");
          self.verifyCode = "";
        })
        .catch((error) => {
          fail(notif, self.$t("Notify.ForgetPassword.Fail2"), error);
        });
    },
  },
});
</script>

<style scoped src="../../css/register-style.css"></style>
<style>
.q-field--error .q-field__bottom {
  color: #fc4468;
}
</style>
