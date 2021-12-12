<template>
  <div class="main">
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t("Register.Title") }}</span>
          <router-link
            class="link"
            style="font-size: 16px; font-weight: 200; margin-right: 10px"
            :to="{ path: '/phoneregister' }"
            >{{ $t("Register.RegisterPhone") }}</router-link
          >
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <q-input
              ref="usernameRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="registerInput.email"
              :label="$t('Register.Username')"
              lazy-rules
              :rules="usernameRule"
            ></q-input>

            <send-code-input
              :verifyParam="registerInput.email"
              verifyType="email"
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
              :type="isCPwd ? 'password' : 'text'"
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
import { useStore } from "vuex";

export default defineComponent({
  components: { SendCodeInput },
  setup() {
    const $store = useStore();
    const email = ref("");
    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
      set: (val) => {
        $store.commit("verify/updateVerifyCode", val);
      },
    });
    const password = ref("");
    const confirmPassword = ref("");
    const invitationCode = ref("");
    const registerInput = reactive({
      email,
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
      (val) => (val && val.length > 0) || t("Register.UsernameInputwarning"),
    ]);
    const passwordRule = ref([
      (val) => (val && val.length > 0) || t("Register.PasswordInputWarning"),
    ]);
    const confirmPassRule = ref([
      (val) => (val && val.length > 0) || t("Register.ConfirmInputWarning1"),
      (val) =>
        (val && val == password.value) || t("Register.ConfirmInputWarning2"),
    ]);
    const agree = ref(false);

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
      verifyCode,
    };
  },

  created: function () {
    this.onRegister = throttle(this.onRegister, 1000);
  },

  methods: {
    onRegister: function () {
      if (!this.agree) {
        fail(undefined, "please check agree", "");
        return;
      }

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

      var thiz = this;
      var failToRegister = "fail to register";
      var password = sha256Password(this.registerInput.password);

      api
        .post("/cloud-hashing-apis/v1/signup", {
          Password: password,
          EmailAddress: thiz.registerInput.email,
          VerificationCode: thiz.registerInput.verifyCode,
          InvitationCode: thiz.registerInput.invitationCode,
        })
        .then(function (resp) {
          thiz.verifyCode = "";
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
