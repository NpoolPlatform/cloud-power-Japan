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
              v-model="password"
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
              v-model="confirmPassword"
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

            <q-field ref="agreeRef" :model-value="agree" :rules="agreeRules">
              <q-checkbox v-model="agree"></q-checkbox>
              <span class="text-style">
                {{ $t("Register.Agree1") }}
                <span
                  href
                  class="link"
                  @click="showPolicy = true"
                  style="cursor: pointer"
                  >{{ $t("Register.Policy") }}</span
                >
                {{ $t("Register.And") }}
                <span
                  href
                  class="link"
                  @click="showPolicy = true"
                  style="cursor: pointer"
                  >{{ $t("Register.User") }}</span
                >{{ $t("Register.Behind") }}
              </span>
            </q-field>

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

      <q-dialog v-model="showPolicy">
        <q-card style="color: #e1eeef; background-color: #23292b">
          <q-card-section>
            <div class="text-h6" style="margin-left: 10px">
              {{ $t("Legal.Title2") }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="margin: 10px 50px">
            <p>{{ $t("Legal.P1") }}</p>
            <h5>{{ $t("Legal.H1") }}</h5>
            <p>{{ $t("Legal.P2") }}</p>
            <p>{{ $t("Legal.P3") }}</p>
            <h5>{{ $t("Legal.H2") }}</h5>
            <p>{{ $t("Legal.P4") }}</p>
            <ul>
              <li>{{ $t("Legal.U1.L1") }}</li>
              <li>{{ $t("Legal.U1.L2") }}</li>
              <li>{{ $t("Legal.U1.L3") }}</li>
              <li>{{ $t("Legal.U1.L4") }}</li>
            </ul>
            <p>{{ $t("Legal.P5") }}</p>
            <h5>{{ $t("Legal.H3") }}</h5>
            <p>{{ $t("Legal.P6") }}</p>
            <h5>{{ $t("Legal.H4") }}</h5>
            <p>{{ $t("Legal.P7") }}</p>
            <h5>{{ $t("Legal.H5") }}</h5>
            <p>{{ $t("Legal.P8") }}</p>
            <ul>
              <li>{{ $t("Legal.U2.L1") }}</li>
              <li>{{ $t("Legal.U2.L2") }}</li>
              <li>{{ $t("Legal.U2.L3") }}</li>
              <li>{{ $t("Legal.U2.L4") }}</li>
              <li>{{ $t("Legal.U2.L5") }}</li>
              <li>{{ $t("Legal.U2.L6") }}</li>
              <li>{{ $t("Legal.U2.L7") }}</li>
              <li>{{ $t("Legal.U2.L8") }}</li>
            </ul>
            <p>{{ $t("Legal.P9") }}</p>
            <p>{{ $t("Legal.P10") }}</p>
            <h4>{{ $t("Legal.H6") }}</h4>
            <h5>{{ $t("Legal.H7") }}</h5>
            <p>{{ $t("Legal.P11") }}</p>
            <h5>{{ $t("Legal.H8") }}</h5>
            <p>{{ $t("Legal.P12") }}</p>
            <h6>{{ $t("Legal.H9") }}</h6>
            <p>{{ $t("Legal.P13") }}</p>
            <h6>{{ $t("Legal.H10") }}</h6>
            <p>{{ $t("Legal.P14") }}</p>
            <h6>{{ $t("Legal.H11") }}</h6>
            <p>{{ $t("Legal.P15") }}</p>
            <h6>{{ $t("Legal.H12") }}</h6>
            <p>{{ $t("Legal.P16") }}</p>
            <ul>
              <li>{{ $t("Legal.U3.L1") }}</li>
              <li>{{ $t("Legal.U3.L2") }}</li>
              <li>{{ $t("Legal.U3.L3") }}</li>
              <li>{{ $t("Legal.U3.L4") }}</li>
              <li>{{ $t("Legal.U3.L5") }}</li>
              <li>{{ $t("Legal.U3.L6") }}</li>
              <li>{{ $t("Legal.U3.L7") }}</li>
              <li>{{ $t("Legal.U3.L8") }}</li>
              <li>{{ $t("Legal.U3.L9") }}</li>
              <li>{{ $t("Legal.U3.L10") }}</li>
              <li>{{ $t("Legal.U3.L11") }}</li>
              <li>{{ $t("Legal.U3.L12") }}</li>
            </ul>
            <h6>{{ $t("Legal.hh1") }}</h6>
            <p>{{ $t("Legal.pp1") }}</p>
            <h5>{{ $t("Legal.hh2") }}</h5>
            <p>{{ $t("Legal.pp2") }}</p>
            <h5>{{ $t("Legal.hh3") }}</h5>
            <p>{{ $t("Legal.pp3") }}</p>
            <h5>{{ $t("Legal.hh4") }}</h5>
            <p>{{ $t("Legal.pp4") }}</p>
            <p>{{ $t("Legal.pp5") }}</p>
            <h5>{{ $t("Legal.hh5") }}</h5>
            <p>{{ $t("Legal.pp6") }}</p>
            <h5>{{ $t("Legal.hh6") }}</h5>
            <p>{{ $t("Legal.pp7") }}</p>
            <h5>{{ $t("Legal.hh7") }}</h5>
            <p>{{ $t("Legal.pp8") }}</p>
            <h5>{{ $t("Legal.hh8") }}</h5>
            <p>{{ $t("Legal.pp9") }}</p>
            <p>{{ $t("Legal.pp10") }}</p>
            <h5>{{ $t("Legal.hh9") }}</h5>
            <p>{{ $t("Legal.pp11") }}</p>
            <h5>{{ $t("Legal.hh10") }}</h5>
            <p>{{ $t("Legal.pp12") }}</p>
            <h5>{{ $t("Legal.hh11") }}</h5>
            <p>
              {{ $t("Legal.pp13") }}
              <a href="mailto:support@procyon.vip">support@procyon.vip</a
              >{{ $t("Legal.pp133") }}
            </p>

            <h4>{{ $t("Legal.hhh1") }}</h4>
            <h5>{{ $t("Legal.hhh2") }}</h5>
            <p>{{ $t("Legal.ppp1") }}</p>
            <h5>{{ $t("Legal.hhh3") }}</h5>
            <p>{{ $t("Legal.ppp2") }}</p>
            <p>{{ $t("Legal.ppp3") }}</p>

            <h5>{{ $t("Legal.he1") }}</h5>
            <p>{{ $t("Legal.pa1") }}</p>
            <p>{{ $t("Legal.pa2") }}</p>
            <p>{{ $t("Legal.pa3") }}</p>
            <p>{{ $t("Legal.pa4") }}</p>
            <h5>{{ $t("Legal.he2") }}</h5>
            <p>{{ $t("Legal.pa5") }}</p>
            <p>{{ $t("Legal.pa6") }}</p>
            <p>{{ $t("Legal.pa7") }}</p>
            <h5>{{ $t("Legal.he3") }}</h5>
            <p>{{ $t("Legal.pa8") }}</p>
            <p>{{ $t("Legal.pa9") }}</p>
            <p>{{ $t("Legal.pa10") }}</p>
            <p>{{ $t("Legal.pa11") }}</p>
            <h5>{{ $t("Legal.he4") }}</h5>
            <p>{{ $t("Legal.pa12") }}</p>
            <p>{{ $t("Legal.pa13") }}</p>
            <p>{{ $t("Legal.pa14") }}</p>
            <h5>{{ $t("Legal.he5") }}</h5>
            <p>{{ $t("Legal.pa15") }}</p>
            <p>{{ $t("Legal.pa16") }}</p>
            <p>{{ $t("Legal.pa17") }}</p>
            <h5>{{ $t("Legal.he6") }}</h5>
            <p>{{ $t("Legal.pa18") }}</p>
            <p>{{ $t("Legal.pa19") }}</p>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              :label="$t('Register.CancelBtn')"
              color="primary"
              v-close-popup
            />
            <q-btn
              flat
              :label="$t('Register.AcceptBtn')"
              color="primary"
              @click="
                showPolicy = false;
                agree = true;
              "
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onMounted,
  watch,
} from "vue";
import { api } from "boot/axios";
import { success, fail, waiting } from "../../notify/notify";
import { useI18n } from "vue-i18n";
import {
  parsePassword,
  parseEmail,
  sha256Password,
  failCodeError,
} from "src/utils/utils";
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

    onMounted(() => {
      verifyCode.value = "";
    });
    const password = ref("");
    const confirmPassword = ref("");
    const invitationCode = ref("");
    const registerInput = reactive({
      email,
      verifyCode,
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
      (val) => parseEmail(val) || t("Register.UsernameInputwarning"),
    ]);

    const passwordRule = ref([
      (val) => parsePassword(val) || t("Register.PasswordInputWarning"),
      (val) =>
        (val && val === confirmPassword.value) ||
        t("Register.ConfirmInputWarning2"),
    ]);

    const confirmPassRule = ref([
      (val) => (val && val.length > 0) || t("Register.ConfirmInputWarning1"),
      (val) =>
        (val && val == password.value) || t("Register.ConfirmInputWarning2"),
    ]);

    watch([password, confirmPassword], ([p, cp], [prep, precp]) => {
      if (p === cp) {
        passRef.value.validate();
        confirmPassRef.value.validate();
      }
    });

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
      showPolicy: ref(false),
      agreeRef: ref(null),
      agreeRules: ref([(val) => val || t("Register.AgreeWarning")]),
      password,
      confirmPassword,
    };
  },

  created: function () {
    this.onRegister = throttle(this.onRegister, 1000);
  },

  methods: {
    onRegister: function () {
      this.agreeRef.validate();
      this.usernameRef.validate();
      this.passRef.validate();
      this.confirmPassRef.validate();
      this.invitationRef.validate();

      if (
        this.usernameRef.hasError ||
        this.passRef.hasError ||
        this.confirmPassRef.hasError ||
        this.invitationRef.hasError ||
        this.agreeRef.hasError
      ) {
        return;
      }

      var self = this;
      var successToRegister = this.$t("Register.Success");
      var password = sha256Password(this.password);

      api
        .post("/cloud-hashing-apis/v1/signup", {
          Password: password,
          EmailAddress: self.registerInput.email,
          VerificationCode: self.registerInput.verifyCode,
          InvitationCode: self.registerInput.invitationCode,
        })
        .then(function (resp) {
          self.verifyCode = "";
          success(undefined, successToRegister);
          self.$router.push({
            path: "/login",
          });
        })
        .catch(function (error) {
          failCodeError(
            undefined,
            error,
            self.$t("Register.Fail"),
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
