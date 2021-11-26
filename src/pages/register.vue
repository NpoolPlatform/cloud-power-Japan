<template>
  <div class="main">
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t('Register.Title') }}</span>
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
                <q-btn flat rounded @click="sendCode">{{ $t('Register.SendCode') }}</q-btn>
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

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="registerInput.confirmPassword"
              :label="$t('Register.Confirm')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('Register.ConfirmInputWarning2')]"
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
            ></q-input>

            <q-checkbox v-model="agree"></q-checkbox>
            <span class="text-style">
              {{ $t('Register.Agree1') }}
              <a href class="link">{{ $t('Register.Policy') }}</a>
              {{ $t('Register.And') }}
              <a href class="link">{{ $t('Register.User') }}</a>
            </span>

            <q-btn class="register-btn" @click="onRegister">{{ $t('Register.Register') }}</q-btn>

            <p class="text-style">
              {{ $t('Register.Have') }}
              <router-link class="link" :to="{ path: '/login' }">{{ $t('Register.Click') }}</router-link>
            </p>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { api } from 'boot/axios'
import { success, fail, waiting } from '../notify/notify'

export default defineComponent({
  setup () {
    const email = ref('')
    const verifyCode = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const invitationCode = ref('')
    const registerInput = reactive({ email, verifyCode, password, confirmPassword, invitationCode })
    return {
      registerInput,
      isPwd: ref(true),
      isCPwd: ref(true),
    }
  },

  data () {
    return {
      agree: false,
    }
  },

  methods: {
    sendCode: function () {
      if (this.registerInput.email === '') {
        fail(undefined, 'email is null', null)
      }
      const notif = waiting("send code successfully")
      var failToSend = "fail to send code"

      var thiz = this
      api.post('/verification-door/v1/send/email', {
        Email: this.registerInput.email
      })
        .then(function (resp) {
          const msg = "code has been sent" + thiz.registerInput.email + ', ' + "please check your email"
          success(notif, msg)
        })
        .catch(function (error) {
          fail(notif, failToSend, error)
        })
    },

    onRegister: function () {
      if (!this.agree) {
        fail(undefined, "please check agree", null)
        return
      }
      var thiz = this
      var failToRegister = "fail to register"

      api.post('/user-management/v1/signup', {
        Password: this.registerInput.password,
        EmailAddress: this.registerInput.email,
        Code: this.registerInput.verifyCode,
      })
        .then(function (resp) {
          thiz.$router.push({
            path: '/login',
          })
        })
        .catch(function (error) {
          fail(undefined, failToRegister, error)
        })
    },
  },
})
</script>

<style scoped src="../css/register-style.css">
</style>