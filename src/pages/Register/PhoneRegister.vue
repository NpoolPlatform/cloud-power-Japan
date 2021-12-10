<template>
  <div class="main">
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t("Register.Title") }}</span>
          <router-link
            class="link"
            style="font-size: 16px; font-weight: 200; margin-right: 10px"
            :to="{ path: '/emailregister' }"
            >{{ $t("Register.RegisterEmail") }}</router-link
          >
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <country-code
              v-model:userPhoneNumber="phoneResponse.phone"
              v-model:userCode="phoneResponse.code"
            ></country-code>

            <send-code-input
              :verifyParam="registerInput.phone"
              verifyType="phone"
            ></send-code-input>

            <q-input
              ref="passRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="registerInput.password"
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

            <q-input
              ref="confirmPassRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="registerInput.confirmPassword"
              :label="$t('Register.Confirm')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="confirmPassRule"
            >
              <template v-slot:append>
                <q-icon
                  :name="isCPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isCPwd = !isCPwd"
                />
              </template>
            </q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="registerInput.invitationCode"
              :label="$t('Register.InvitationCode')"
              lazy-rules
              ref="invitationRef"
              :rules="invitationRule"
            ></q-input>

            <q-checkbox v-model="agree"></q-checkbox>
            <span class="text-style">
              {{ $t("Register.Agree1") }}
              <a href class="link">{{ $t("Register.Policy") }}</a>
              {{ $t("Register.And") }}
              <a href class="link">{{ $t("Register.User") }}</a>
            </span>

            <q-btn class="register-btn" @click="onRegister">{{
              $t("Register.Register")
            }}</q-btn>

            <p class="text-style">
              {{ $t("Register.Have") }}
              <router-link class="link" :to="{ path: '/login' }">{{
                $t("Register.Click")
              }}</router-link>
            </p>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from "vue";
import { api } from "boot/axios";
import { success, fail, waiting } from "../../notify/notify";
import { useI18n } from "vue-i18n";
import { sha256Password } from "src/utils/utils";
import { throttle } from "quasar";
import SendCodeInput from "src/components/SendCodeInput.vue";
import CountryCode from "../../components/CountryCode.vue";

export default defineComponent({
  components: { SendCodeInput, CountryCode },
  setup() {
    const phone = ref("");
    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
    });
    const password = ref("");
    const confirmPassword = ref("");
    const invitationCode = ref("");
    const registerInput = reactive({
      phone,
      verifyCode,
      password,
      confirmPassword,
      invitationCode,
    });

    const { t } = useI18n({ useScope: "global" });

    const usernameRef = ref(null);
    const passRef = ref(null);
    const confirmPassRef = ref(null);
    const invitationRef = ref(null);
    const invitationRule = ref([
      (val) => (val && val.length > 0) || t("Register.InvitationWarning"),
    ]);

    const usernameRule = ref([
      (val) => (val && val.length > 0) || t("Register.PhoneInputWarning"),
    ]);
    const passwordRule = ref([
      (val) => (val && val.length > 0) || t("Register.PasswordInputWarning"),
    ]);
    const confirmPassRule = ref([
      (val) => (val && val.length > 0) || t("Register.ConfirmInputWarning1"),
      (val) =>
        (val && val !== password.value) || t("Register.ConfirmInputWarning2"),
    ]);
    const agree = ref(false);

    const phoneResponse = {
      phone: "",
      code: "",
    };

    return {
      registerInput,
      isPwd: ref(true),
      isCPwd: ref(true),
      usernameRule,
      usernameRef,
      passwordRule,
      passRef,
      confirmPassRef,
      confirmPassRule,
      agree,
      invitationRef,
      invitationRule,
      phoneResponse,
    };
  },

  created: function () {
    this.onRegister = throttle(this.onRegister, 1000);
  },

  methods: {
    onRegister: function () {
      this.usernameRef.validate();
      this.passRef.validate();
      this.confirmPassRef.validate();
      this.invitationRef.validate();

      if (
        this.usernameRef.hasError ||
        this.passRef.hasError ||
        this.confirmPassRef.hasError ||
        this.invitationRef.hasError
      ) {
        return;
      }

      if (!this.agree) {
        fail(undefined, "please check agree", null);
        return;
      }
      var thiz = this;
      var failToRegister = "fail to register";
      var password = sha256Password(this.registerInput.password);

      api
        .post("/user-management/v1/signup", {
          Password: password,
          PhoneNumber: thiz.phoneResponse.code + thiz.phoneResponse.phone,
          VerificationCode: thiz.registerInput.verifyCode,
          InvitationCode: thiz.registerInput.invitationCode,
        })
        .then(function (resp) {
          thiz.$router.push({
            path: "/login",
          });
        })
        .catch(function (error) {
          fail(undefined, failToRegister, error);
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
