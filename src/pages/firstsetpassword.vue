<template>
  <div>
    <div class="content">
      <q-card class="register-card">
        <q-card-section>
          <span class="card-title">{{ $t('FirstSetPassword.Title') }}</span>
        </q-card-section>

        <q-card-section>
          <q-form class="register-form">
            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="setpasswordInput.email"
              :label="$t('FirstSetPassword.Email')"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('FirstSetPassword.EmailInputWarning')]"
            ></q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="setpasswordInput.code"
              :label="$t('FirstSetPassword.EmailVerifyCode')"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('FirstSetPassword.EmailVerifyCodeInpuWarning')]"
            >
              <template v-slot:append>
                <q-btn flat rounded @click="sendCode">{{ $t('FirstSetPassword.SendCode') }}</q-btn>
              </template>
            </q-input>

            <q-input
              class="register-input"
              outlined
              bg-color="blue-grey-1"
              v-model="setpasswordInput.password"
              :label="$t('FirstSetPassword.Password')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('FirstSetPassword.PasswordInputWarning')]"
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
              v-model="setpasswordInput.confirmPassword"
              :label="$t('FirstSetPassword.ConfirmPassword')"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[val => val && val.length > 0 || $t('FirstSetPassword.ConfirmInputWarning1')]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isConfirmPwd = !isConfirmPwd"
                />
              </template>
            </q-input>

            <q-btn class="register-btn" @click="setPassword">{{ $t('FirstSetPassword.ConfirmBtn') }}</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'src/boot/axios';
import { sendCode } from 'src/utils/utils';
import { success, fail, waiting } from '../notify/notify'

export default defineComponent({
  name: 'firstsetpassword',

  setup () {

  },

  data () {
    return {
      isPwd: true,
      isConfirmPwd: true,
      setpasswordInput: {
        email: '',
        code: '',
        password: '',
        confirmPassword: '',
      },
    }
  },

  methods: {
    sendCode: function () {
      sendCode(this.setpasswordInput.email)
    },

    setPassword: function () {
      var self = this

      if (this.setpasswordInput.password !== this.setpasswordInput.confirmPassword) {
        var failToSetPassword = 'fail to set password'
        fail(undefined, failToSetPassword, "password and confirm password not same")
        return
      }

      api.post('/user-management/v1/set/password', {
        Username: self.setpasswordInput.email,
        Password: self.setpasswordInput.password,
      }).then(resp => {
        success(undefined, 'successfully set password, please go to login')
        self.$router.push({
          path: '/login',
        })
      }).catch(error => {
        fail(undefined, failToSetPassword, error)
      })
    },
  },
})
</script>

<style scoped src="../css/register-style.css">
</style>