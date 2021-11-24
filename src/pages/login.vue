<template>
  <div class="main">
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t('Register.LoginTitle') }}</span>
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="registerInput.email"
              :label="$t('Register.Username')"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('Register.UsernameInputwarning')]"
            ></q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="registerInput.verifyCode"
              :label="$t('Register.EmailVerifyCode')"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('Register.EmailVerifyCodeInpuWarning')]"
            >
              <template v-slot:append>
                <q-btn flat rounded @click="sendCode()">{{ $t('Register.SendCode') }}</q-btn>
              </template>
            </q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="registerInput.password"
              :label="$t('Register.Password')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('Register.PasswordInputWarning')]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div>
              <recaptcha-vue @callback="callback"></recaptcha-vue>
            </div>

            <q-btn class="register-btn" @click="login()">{{ $t('Register.Login') }}</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import RecaptchaVue from 'src/components/Recaptcha.vue';
export default defineComponent({
  components: { RecaptchaVue },
  setup () {
    const email = ref('')
    const verifyCode = ref('')
    const password = ref('')
    const registerInput = reactive({ email, verifyCode, password })
    return {
      registerInput,
      isPwd: ref(true),
    }
  },

  data () {
    return {
      siteKey: '6LdlXU4dAAAAAJz1WqVn2xkIwQrSH38x6tYRAD_m',
      response: null,
    }
  },

  methods: {
    sendCode: function () { },
    login: function () { },
    callback: function (resp) {
      switch (resp) {
        case "expired":
          console.log("expired")
          break;
        case "error":
          console.log("error")
          break;
        default:
          this.response = resp
          console.log(resp)
          break;
      }
      console.log("main response is", this.response)
    },
  },
})
</script>

<style scoped src="../css/register-style.css">
</style>