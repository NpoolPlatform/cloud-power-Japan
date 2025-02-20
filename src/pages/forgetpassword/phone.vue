<template>
  <div>
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span style="font-size: 24px">{{ $t("ForgetPassword.Title") }}</span>
          <router-link
            style="font-size: 14px; font-weight: 200; margin-right: 10px"
            class="link"
            :to="{ path: '/forgetpassword/email' }"
            >{{ $t("ForgetPassword.UseEmail") }}</router-link
          >
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <country-code></country-code>

            <send-code-input
              :verifyParam="phone"
              verifyType="phone"
            ></send-code-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="password"
              :label="$t('ForgetPassword.Password')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="passwordRule"
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
              v-model="confirmPassword"
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
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { api } from "src/boot/axios";
import { useStore } from "vuex";
import { fail, success, waiting } from "src/notify/notify";
import { failCodeError, parsePassword, sha256Password } from "src/utils/utils";
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

    const phone = computed({
      get: () => $store.state.verify.phone,
      set: (val) => {
        $store.commit("verify/updatePhone", val);
      },
    });

    const forgetPasswordInput = reactive({
      phone: phone.value,
      verifyCode: verifyCode.value,
    });

    const password = ref("");
    const confirmPassword = ref("");

    const passwordRef = ref(null);
    const confirmPasswordRef = ref(null);

    const passwordRule = ref([
      (val) => parsePassword(val) || t("Register.PasswordInputWarning"),
      (val) =>
        (val && val === confirmPassword.value) ||
        t("Register.ConfirmInputWarning2"),
    ]);

    const confirmPassRule = ref([
      (val) => parsePassword(val) || t("Register.ConfirmInputWarning1"),
      (val) =>
        (val && val == password.value) || t("Register.ConfirmInputWarning2"),
    ]);

    watch([password, confirmPassword], ([p, cp], [prep, precp]) => {
      if (p === cp) {
        passwordRef.value.validate();
        confirmPasswordRef.value.validate();
      }
    });

    return {
      verifyCode,
      forgetPasswordInput,
      passwordRef,
      confirmPasswordRef,
      confirmPassRule,
      parsePassword,
      phone,
      password,
      confirmPassword,
      passwordRule,
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

      var self = this;

      var password = sha256Password(this.password);

      api
        .post("/user-management/v1/forget/password", {
          VerifyParam: self.phone,
          Password: password,
          VerifyType: "phone",
          Code: self.verifyCode,
        })
        .then((resp) => {
          success(notif, self.$t("Notify.ForgetPassword.Success"));
          self.verifyCode = "";
          self.phone = "";
          location.reload();
          self.$router.push("/login");
        })
        .catch((error) => {
          failCodeError(
            notif,
            error,
            self.$t("ForgetPassword.Fail"),
            self.$t("CodeFail.Fail1"),
            self.$t("CodeFail.Fail2")
          );
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
