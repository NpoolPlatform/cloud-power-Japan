<template>
  <div class="main">
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t('Register.LoginTitle') }}</span>
          <q-btn @click="gaDialog = true">open dialog</q-btn>
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.email"
              :label="$t('Register.Username')"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('Register.UsernameInputwarning')]"
            ></q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.verifyCode"
              :label="$t('Register.EmailVerifyCode')"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('Register.EmailVerifyCodeInpuWarning')]"
            >
              <template v-slot:append>
                <q-btn flat rounded @click="sendCode">{{ $t('Register.SendCode') }}</q-btn>
              </template>
            </q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.password"
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
            <div class="bottom-style">
              <router-link
                class="link-style"
                :to="{ path: '/forgetpassword' }"
              >{{ $t('Login.Forget') }}</router-link>
              <div>
                <span>{{ $t('Login.NoAccount') }}</span>
                <router-link
                  class="link-style"
                  :to="{ path: '/register' }"
                >{{ $t('Login.Register') }}</router-link>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="gaDialog">
      <q-card>
        <q-card-section>
          <span class="card-title text-black">Google Verify</span>
        </q-card-section>
        <q-card-section>
          <verifycode-input @callback="verifyCallback"></verifycode-input>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue';
import RecaptchaVue from 'src/components/Recaptcha.vue';
import { useStore } from 'vuex'
import { api } from 'src/boot/axios';
import notify, { success, fail, waiting } from '../notify/notify'
import VerifycodeInput from 'src/components/VerifycodeInput.vue';

export default defineComponent({
  components: { RecaptchaVue, VerifycodeInput },
  setup () {
    const email = ref('')
    const verifyCode = ref('')
    const password = ref('')
    const loginInput = reactive({ email, verifyCode, password })

    const $store = useStore()

    const user = computed({
      get: () => $store.state.user.user,
      set: val => {
        $store.commit('user/updateUserInfo', val)
      }
    })

    return {
      loginInput,
      isPwd: ref(true),
      user,
    }
  },

  watch: {
    finish: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        console.log("finish is", n)
      },
    }
  },

  data () {
    return {
      siteKey: '6LdlXU4dAAAAAJz1WqVn2xkIwQrSH38x6tYRAD_m',
      response: null,
      gaVerifyCode: '',
      gaDialog: false,
      authCode: '',
      finish: '',
    }
  },

  methods: {
    sendCode: function () {
      if (this.loginInput.email === '') {
        fail(undefined, 'email is null', null)
      }
      const notif = waiting("send code successfully")
      var failToSend = "fail to send code"

      var thiz = this
      api.post('/verification-door/v1/send/email', {
        Email: this.loginInput.email
      })
        .then(function (resp) {
          const msg = "code has been sent" + thiz.loginInput.email + ', ' + "please check your email"
          success(notif, msg)
        })
        .catch(function (error) {
          fail(undefined, failToSend, error)
        })
    },

    login: function () {
      let self = this

      var notif = waiting(this.$t('Notify.Login.Wait'))

      api.post('/login-door/v1/login', {
        Username: self.loginInput.email,
        Password: self.loginInput.password,
        VerifyCode: self.loginInput.verifyCode,
        GoogleRecaptchaResponse: self.response,
      }).then(resp => {
        self.user = {
          logined: true,
          info: resp.data.Info,
        }
        success(notif, self.$t('Notify.Login.Success'))
        if (resp.data.Info.UserAppInfo.UserApplicationInfo.GALogin) {
          self.gaDialog = true;
        } else {
          self.$router.push({
            path: '/',
          })
        }
      }).catch(error => {
        fail(undefined, self.$t('Notify.Login.Fail'), error)
      })

      this.loginInput = {}
    },

    verifyCallback: function (resp) {
      if (resp === 'pass') {
        this.gaDialog = false
        this.$router.push({
          path: '/',
        })
      } else {
        fail(undefined, "please inoput correct verify code")
      }
    },

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
    },
  },
})
</script>

<style scoped src="../css/register-style.css">
</style>
<style scoped>
.bottom-style {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
}

.link-style {
  color: #1ec498;
  border-bottom: none;
  text-decoration: none;
}
</style>