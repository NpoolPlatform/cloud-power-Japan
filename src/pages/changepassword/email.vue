<template>
  <div>
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t("ChangePassword.Title") }}</span>
          <router-link
            style="font-size: 16px; font-weight: 200; margin-right: 10px"
            class="link"
            :to="{ path: '/changepassword/phone' }"
            >{{ $t("ChangePassword.UsePhone") }}</router-link
          >
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="changePasswordInput.email"
              :label="$t('ChangePassword.Email.EmailInput')"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  $t('ChangePassword.Email.EmailInputWarning'),
              ]"
              ref="emailRef"
            ></q-input>

            <send-code-input
              :verifyParam="changePasswordInput.email"
              verifyType="email"
            ></send-code-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="changePasswordInput.oldPassword"
              :label="$t('ChangePassword.OldPassword')"
              :type="isOldPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  $t('ChangePassword.OldPasswordWarning'),
              ]"
              ref="oldPasswordRef"
            >
              <template v-slot:append>
                <q-icon
                  :name="isOldPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isOldPwd = !isOldPwd"
                />
              </template>
            </q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="changePasswordInput.password"
              :label="$t('ChangePassword.Password')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  $t('ChangePassword.PasswordInputWarning'),
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
              v-model="changePasswordInput.confirmPassword"
              :label="$t('ChangePassword.ConfirmPassword')"
              :type="isCPwd ? 'password' : 'text'"
              lazy-rules
              :rules="confirmPassRule"
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
              $t("ChangePassword.ConfirmBtn")
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
import { throttle, useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import SendCodeInput from "src/components/SendCodeInput.vue";

export default defineComponent({
  components: { SendCodeInput },
  setup() {
    const q = useQuasar();
    const { t, locale } = useI18n({ useScope: "global" });
    const count = ref(0);
    const $store = useStore();

    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
      set: (val) => {
        $store.commit("verify/updateVerifyCode", val);
      },
    });

    const emailRef = ref(null);
    const oldPasswordRef = ref(null);
    const passwordRef = ref(null);
    const confirmPasswordRef = ref(null);

    const changePasswordInput = reactive({
      email: "",
      verifyCode: verifyCode.value,
      oldPassword: "",
      password: "",
      confirmPassword: "",
    });

    const confirmPassRule = ref([
      (val) => (val && val.length > 0) || t("Register.ConfirmInputWarning1"),
      (val) =>
        (val && val == changePasswordInput.password) ||
        t("Register.ConfirmInputWarning2"),
    ]);

    return {
      locale,
      count,
      verifyCode,
      changePasswordInput,
      emailRef,
      oldPasswordRef,
      passwordRef,
      confirmPasswordRef,
      confirmPassRule,
      q,
    };
  },

  data() {
    return {
      isPwd: true,
      isCPwd: true,
      isOldPwd: true,
    };
  },

  created: function () {
    this.onConfirm = throttle(this.onConfirm, 1000);
  },

  methods: {
    onConfirm: function () {
      this.emailRef.validate();
      this.oldPasswordRef.validate();
      this.passwordRef.validate();
      this.confirmPasswordRef.validate();

      if (
        this.emailRef.hasError ||
        this.oldPasswordRef.hasError ||
        this.passwordRef.hasError ||
        this.confirmPasswordRef.hasError
      ) {
        return;
      }

      const notif = waiting(this.$t("Notify.ChangePassword.Waiting"));
      if (
        this.changePasswordInput.password !==
        this.changePasswordInput.confirmPassword
      ) {
        fail(notif, this.$t("Notify.ChangePassword.Fail1"), "");
        return;
      }
      var self = this;

      var password = sha256Password(this.changePasswordInput.password);

      api
        .post("/user-management/v1/change/password", {
          VerifyParam: self.changePasswordInput.email,
          Password: password,
          OldPassword: sha256Password(self.changePasswordInput.oldPassword),
          VerifyType: "email",
          Code: self.changePasswordInput.verifyCode,
        })
        .then((resp) => {
          success(notif, self.$t("Notify.ChangePassword.Success"));
          self.verifyCode = "";
          this.q.cookies.remove("UserID");
          this.q.cookies.remove("AppSession");
          this.q.cookies.remove("Session");
          self.$router.push("/login");
          self.verifyCode = "";
          location.reload();
        })
        .catch((error) => {
          fail(notif, self.$t("Notify.ChangePassword.Fail2"), error);
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
