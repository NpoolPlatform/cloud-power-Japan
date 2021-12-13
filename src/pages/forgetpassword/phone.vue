<template>
  <div>
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t("ForgetPassword.Title") }}</span>
          <router-link
            style="font-size: 16px; font-weight: 200; margin-right: 10px"
            class="link"
            :to="{ path: '/forgetpassword/email' }"
            >{{ $t("ForgetPassword.UseEmail") }}</router-link
          >
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <country-code
              v-model:userPhoneNumber="phoneResponse.phone"
              v-model:userCode="phoneResponse.code"
            ></country-code>

            <send-code-input
              :verifyParam="forgetPasswordInput.phone"
              verifyType="phone"
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
import CountryCode from "../../components/CountryCode.vue";

export default defineComponent({
  components: { SendCodeInput, CountryCode },
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const $store = useStore();

    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
      set: (val) => {
        $store.commit("verify/updateVerifyCode", val);
      },
    });

    const phoneResponse = {
      phone: "",
      code: "",
    };

    const forgetPasswordInput = reactive({
      phone: phoneResponse.code + phoneResponse.phone,
      verifyCode: verifyCode.value,
      password: "",
      confirmPassword: "",
    });

    const passwordRef = ref(null);
    const confirmPasswordRef = ref(null);

    const confirmPassRule = ref([
      (val) => (val && val.length > 0) || t("Register.ConfirmInputWarning1"),
      (val) =>
        (val && val == forgetPasswordInput.value.password) ||
        t("Register.ConfirmInputWarning2"),
    ]);

    return {
      verifyCode,
      forgetPasswordInput,
      phoneResponse,
      passwordRef,
      confirmPasswordRef,
      confirmPassRule,
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
      this.passwordRef.validate();
      this.confirmPasswordRef.validate();
      if (this.passwordRef.hasError || this.confirmPasswordRef.hasError) {
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
      this.forgetPasswordInput.phone =
        this.phoneResponse.code + this.phoneResponse.phone;

      api
        .post("/user-management/v1/forget/password", {
          VerifyParam: self.forgetPasswordInput.phone,
          Password: password,
          VerifyType: "phone",
          Code: self.verifyCode,
        })
        .then((resp) => {
          success(notif, self.$t("Notify.ForgetPassword.Success"));
          self.verifyCode = "";
          location.reload();
          self.$router.push("/login");
        })
        .catch((error) => {
          fail(notif, self.$t("Notify.ForgetPassword.Fail2"), error);
          self.verifyCode = "";
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
