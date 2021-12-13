<template>
  <div>
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t("ChangePassword.Title") }}</span>
          <router-link
            style="font-size: 16px; font-weight: 200; margin-right: 10px"
            class="link"
            :to="{ path: '/changepassword/email' }"
            >{{ $t("ChangePassword.UseEmail") }}</router-link
          >
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <country-code
              v-model:userPhoneNumber="phoneResponse.phone"
              v-model:userCode="phoneResponse.code"
            ></country-code>

            <send-code-input
              :verifyParam="changePasswordInput.phone"
              verifyType="phone"
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
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useStore } from "vuex";
import { fail, success, waiting } from "src/notify/notify";
import { sha256Password } from "src/utils/utils";
import { throttle, useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import SendCodeInput from "src/components/SendCodeInput.vue";
import CountryCode from "../../components/CountryCode.vue";

export default defineComponent({
  components: { SendCodeInput, CountryCode },
  setup() {
    const q = useQuasar();
    const $store = useStore();
    const t = useI18n({ useScope: "global" });

    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
      set: (val) => {
        $store.commit("verify/updateVerifyCode", val);
      },
    });

    onMounted(() => {
      verifyCode.value = "";
    });

    const phoneResponse = {
      phone: "",
      code: "",
    };

    const oldPasswordRef = ref(null);
    const passwordRef = ref(null);
    const confirmPasswordRef = ref(null);

    const changePasswordInput = reactive({
      phone: "",
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
      verifyCode,
      changePasswordInput,
      oldPasswordRef,
      passwordRef,
      confirmPasswordRef,
      q,
      phoneResponse,
      confirmPassRule,
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
      this.oldPasswordRef.validate();
      this.passwordRef.validate();
      this.confirmPasswordRef.validate();

      if (
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
      this.changePasswordInput.phone =
        this.phoneResponse.code + this.phoneResponse.phone;

      api
        .post("/user-management/v1/change/password", {
          VerifyParam: self.changePasswordInput.phone,
          Password: password,
          OldPassword: sha256Password(self.changePasswordInput.oldPassword),
          VerifyType: "phone",
          Code: self.verifyCode,
        })
        .then((resp) => {
          success(notif, self.$t("Notify.ChangePassword.Success"));
          self.verifyCode = "";
          this.q.cookies.remove("UserID");
          this.q.cookies.remove("AppSession");
          this.q.cookies.remove("Session");
          self.verifyCode = "";
          location.reload();
          self.$router.push("/login");
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
