<template>
  <div>
    <div class="content">
      <q-card class="register-card">
        <q-card-section class="card-title">
          <span>{{ $t('ForgetPassword.Title') }}</span>
        </q-card-section>
        <q-card-section>
          <q-form class="register-form">
            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="forgetPasswordInput.email"
              :label="$t('ForgetPassword.Username')"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('ForgetPassword.UsernameInputwarning')]"
            ></q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="forgetPasswordInput.verifyCode"
              :label="$t('ForgetPassword.EmailVerifyCode')"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('ForgetPassword.EmailVerifyCodeInpuWarning')]"
            >
              <template v-slot:append>
                <q-btn flat rounded @click="sendCode">{{ $t('ForgetPassword.SendCode') }}</q-btn>
              </template>
            </q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="forgetPasswordInput.password"
              :label="$t('ForgetPassword.Password')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('ForgetPassword.PasswordInputWarning')]"
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
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('ForgetPassword.ConfirmInputWarning2')]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isCPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isCPwd = !isCPwd"
                />
              </template>
            </q-input>

            <q-btn class="register-btn" @click="onConfirm">{{ $t('ForgetPassword.ConfirmBtn') }}</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { sendCode } from 'src/utils/utils'
import { api } from 'src/boot/axios'
import { fail, success, waiting } from 'src/notify/notify'

export default defineComponent({
  setup () {
  },

  data () {
    return {
      forgetPasswordInput: {
        email: '',
        verifyCode: '',
        password: '',
        confirmPassword: '',
      },
      isPwd: true,
      isCPwd: true,
    }
  },

  methods: {
    onConfirm: function () {
      if (this.forgetPasswordInput.password !== this.forgetPasswordInput.confirmPassword) {
        fail(undefined, this.$t('Notify.ForgetPassword.Fail1'))
        return
      }
      var self = this
      const notif = waiting(this.$t('Notify.ForgetPassword.Waiting'))
      api.post('/user-management/v1/forget/password', {
        EmailAddress: self.forgetPasswordInput.email,
        Password: self.forgetPasswordInput.password,
        Code: self.forgetPasswordInput.verifyCode,
      }).then(resp => {
        success(notif, self.$t('Notify.ForgetPassword.Success'))
        self.$router.push('/login')
      }).catch(error => {
        fail(undefined, self.$t('Notify.ForgetPassword.Fail2'), error)
      })
    },

    sendCode: function () {
      sendCode(this.forgetPasswordInput.email)
    },
  },
})
</script>

<style scoped src="../css/register-style.css">
</style>
<style scoped>
</style>