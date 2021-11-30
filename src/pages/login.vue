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
              ref="usernameRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.email"
              :label="$t('Register.Username')"
              lazy-rules
              :rules="usernameRule"
            ></q-input>

            <q-input
              ref="codeRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.verifyCode"
              :label="$t('Register.EmailVerifyCode')"
              lazy-rules
              :rules="codeRule"
            >
              <template v-slot:append>
                <q-btn flat rounded @click="sendCode">{{ $t('Register.SendCode') }}</q-btn>
              </template>
            </q-input>

            <q-input
              ref="passRef"
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="loginInput.password"
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
            <div>
              <recaptcha-vue @callback="callback"></recaptcha-vue>
            </div>

            <q-btn id="loginBtn" class="register-btn" @click="login">{{ $t('Register.Login') }}</q-btn>
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
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

export default defineComponent({
  components: { RecaptchaVue, VerifycodeInput },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const q = useQuasar()

    const $store = useStore()

    const user = computed({
      get: () => $store.state.user.user,
      set: val => {
        $store.commit('user/updateUserInfo', val)
      }
    })

    const { t } = useI18n({ useScope: 'global' })

    const usernameRef = ref(null)
    const codeRef = ref(null)
    const passRef = ref(null)
    const usernameRule = ref([val => val && val.length > 0 || t('Register.UsernameInputwarning')])
    const codeRule = ref([val => val && val.length > 0 || t('Register.EmailVerifyCodeInpuWarning')])
    const passwordRule = ref([val => val && val.length > 0 || t('Register.PasswordInputWarning')])

    return {
      isPwd: ref(true),
      usernameRule,
      user,
      usernameRef,
      codeRule,
      codeRef,
      passwordRule,
      passRef,
      locale,
      q,
    }
  },

  watch: {
    finish: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
      },
    }
  },

  data () {
    return {
      siteKey: '6LdlXU4dAAAAAJz1WqVn2xkIwQrSH38x6tYRAD_m',
      gaVerifyCode: '',
      gaDialog: false,
      authCode: '',
      finish: '',
      loginInput: {
        email: '',
        verifyCode: '',
        password: '',
        response: '',
      },
    }
  },

  methods: {
    sendCode: function () {
      this.usernameRef.validate()
      if (this.usernameRef.hasError) {
        return
      }

      var notif = waiting(this.$t('Notify.SendCode.WaitSend'))
      var msg = this.$t('Notify.SendCode.SendTo') + ' ' + this.loginInput.email + ', ' + this.$t('Notify.SendCode.CheckEmail')
      var failToSend = this.$t('Notify.SendCode.Fail')

      var thiz = this
      api.post('/verification-door/v1/send/email', {
        Email: thiz.loginInput.email,
        Lang: thiz.locale,
      })
        .then(function (resp) {
          success(notif, msg)
        })
        .catch(function (error) {
          fail(notif, failToSend, error)
        })
    },

    login: function () {
      this.usernameRef.validate()
      this.codeRef.validate()
      this.passRef.validate()

      if (this.usernameRef.hasError || this.codeRef.hasError || this.passRef.hasError) {
        return
      }

      if (this.loginInput.response === '' || this.loginInput.response === null || this.loginInput.response === undefined) {
        fail(undefined, this.$t('Notify.Recaptcha.Fail'))
        return
      }
      let self = this

      var notif = waiting(this.$t('Notify.Login.Wait'))

      api.post('/login-door/v1/login', {
        Username: self.loginInput.email,
        Password: self.loginInput.password,
        VerifyCode: self.loginInput.verifyCode,
        GoogleRecaptchaResponse: self.loginInput.response,
      }).then(resp => {
        self.user = {
          logined: true,
          info: resp.data.Info,
        }
        success(notif, self.$t('Notify.Login.Success'))
        if (resp.data.Info.UserAppInfo.UserApplicationInfo.GALogin) {
          self.gaDialog = true;
          return
        } else {
          self.$router.push({
            path: '/',
          })
        }
        return
      }).catch(error => {
        fail(notif, self.$t('Notify.Login.Fail'), error)
        self.loginInput.email = ''
        self.loginInput.password = ''
        self.loginInput.verifyCode = ''
        self.loginInput.response = ''
      })
    },

    verifyCallback: function (resp) {
      var self = this
      if (resp === 'pass') {
        this.gaDialog = false
        this.$router.push({
          path: '/',
        })
      } else {
        self.loginInput.email = ''
        self.loginInput.password = ''
        self.loginInput.verifyCode = ''
        self.loginInput.response = ''
        this.q.cookies.remove('UserID')
        this.q.cookies.remove('AppSession')
        this.q.cookies.remove('Session')
        fail(undefined, "please inoput correct verify code", "")
      }
    },

    callback: function (resp) {
      var self = this
      switch (resp) {
        case "expired":
          console.log("expired")
          break;
        case "error":
          console.log("error")
          break;
        default:
          this.loginInput.response = resp
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