<template>
  <div>
    <div class="content">
      <div class="title">{{ $t('Account.Title') }}</div>
      <div class="details-box">
        <span class="box-title">{{ $t('Account.PersonalDetails.Title') }}</span>
        <div class="detail-column">
          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.FirstName') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="user.info.UserBasicInfo.FirstName"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.LastName') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="user.info.UserBasicInfo.lastName"
              bg-color="blue-grey-1"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.StreetAddress1') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="user.info.UserBasicInfo.streetAddress1"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.StreetAddress2') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="user.info.UserBasicInfo.streetAddress2"
              bg-color="blue-grey-1"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.City') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="user.info.UserBasicInfo.city"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.Province') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="user.info.UserBasicInfo.province"
              bg-color="blue-grey-1"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.Country') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="user.info.UserBasicInfo.country"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div>
            <q-btn
              class="account-btn"
              @click="onSaveChange"
            >{{ $t('Account.PersonalDetails.Save') }}</q-btn>
          </div>
        </div>
      </div>

      <div>
        <div class="title">{{ $t('Account.SecuritySetting.Title') }}</div>
        <div>
          <div class="setting-column">
            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="passwordImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{ $t('Account.SecuritySetting.ChangePassword') }}</span>
              </div>
              <div class="setting-content">{{ $t('Account.SecuritySetting.ChangePasswordContent') }}</div>

              <q-btn
                class="account-btn setting-btn btn-position"
                @click="changePassword = true"
              >{{ $t('Account.SecuritySetting.ChangePasswordBtn') }}</q-btn>
            </div>

            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="emailImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{ $t('Account.SecuritySetting.Email') }}</span>
              </div>
              <div class="setting-content">{{ $t('Account.SecuritySetting.EmailContent') }}</div>
              <div class="verify-content">
                <q-img class="verify-img" :src="enabledEmail ? passImg : notpassImg"></q-img>
                <span :v-if="enabledEmail"></span>
                {{ enabledEmail ? $t('Account.SecuritySetting.Verify') : $t('Account.SecuritySetting.NotVerify') }}
              </div>
              <q-btn
                class="account-btn setting-btn btn-position"
              >{{ $t('Account.SecuritySetting.EmailBtn') }}</q-btn>
            </div>
          </div>

          <div class="setting-column">
            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="mobileImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{ $t('Account.SecuritySetting.Mobile') }}</span>
              </div>
              <div class="setting-content">{{ $t('Account.SecuritySetting.MobileContent') }}</div>
              <div class="verify-content">
                <q-img class="verify-img" :src="enabledMobile ? passImg : notpassImg"></q-img>
                <span :v-if="enabledMobile"></span>
                {{ enabledMobile ? $t('Account.SecuritySetting.Verify') : $t('Account.SecuritySetting.NotVerify') }}
              </div>
              <q-btn
                class="account-btn setting-btn btn-position"
                style="top: 15px;"
              >{{ $t('Account.SecuritySetting.MobileBtn') }}</q-btn>
            </div>

            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="authenticationImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{ $t('Account.SecuritySetting.Google') }}</span>
              </div>
              <div class="setting-content">{{ $t('Account.SecuritySetting.GoogleContent') }}</div>
              <div class="verify-content">
                <q-img class="verify-img" :src="enabledGoogle ? passImg : notpassImg"></q-img>
                <span :v-if="enabledGoogle"></span>
                {{ enabledGoogle ? $t('Account.SecuritySetting.Verify') : $t('Account.SecuritySetting.NotVerify') }}
              </div>
              <q-btn
                class="account-btn setting-btn google-btn btn-position"
                style="top: 5px;"
              >{{ $t('Account.SecuritySetting.GoogleBtn') }}</q-btn>
            </div>
          </div>

          <div class="setting-column">
            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="verificationImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{ $t('Account.SecuritySetting.IDVerification') }}</span>
              </div>
              <div class="setting-content">{{ $t('Account.SecuritySetting.IDVerificationContent') }}</div>
              <div class="verify-content">
                <q-img class="verify-img" :src="enabledID ? passImg : notpassImg"></q-img>
                <span :v-if="enabledID"></span>
                {{ enabledID ? $t('Account.SecuritySetting.Verify') : $t('Account.SecuritySetting.NotVerify') }}
              </div>
              <q-btn
                class="account-btn setting-btn btn-position"
              >{{ $t('Account.SecuritySetting.IDVerificationBtn') }}</q-btn>
            </div>

            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="authenticationImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{ $t('Account.SecuritySetting.LoginVerification') }}</span>
              </div>
              <div
                class="setting-content"
              >{{ $t('Account.SecuritySetting.LoginVerificationContent') }}</div>
              <div class="verify-content">
                <q-toggle v-model="enableLoginGA" color="green" />
                <span>{{ $t('Account.SecuritySetting.GALogin') }}</span>
              </div>

              <q-btn
                class="account-btn setting-btn btn-position"
                style="top: 0;"
                @click="submitLoginVerify"
              >{{ $t('Account.SecuritySetting.Submit') }}</q-btn>
            </div>
          </div>
        </div>
      </div>

      <q-dialog v-model="changePassword">
        <q-card class="dialog-style">
          <q-card-section>
            <q-item-label class="text-black">{{ $t('Dialog.ChangePassword.OldLabel') }}</q-item-label>
            <q-input v-model="changePasswordInput.old" :label="$t('Dialog.ChangePassword.Old')"></q-input>
          </q-card-section>
          <q-card-section>
            <q-item-label class="text-black">{{ $t('Dialog.ChangePassword.PasswordLabel') }}</q-item-label>
            <q-input
              v-model="changePasswordInput.password"
              :label="$t('Dialog.ChangePassword.Password')"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-item-label class="text-black">{{ $t('Dialog.ChangePassword.ConfirmPasswordLabel') }}</q-item-label>
            <q-input
              v-model="changePasswordInput.confirmPassword"
              :label="$t('Dialog.ChangePassword.ConfirmPassword')"
            ></q-input>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              flat
              :label="$t('Dialog.ChangePassword.Change')"
              color="primary"
              @click="onChangePassword"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div>
        <div class="title">{{ $t('Account.History.Title') }}</div>
        <q-markup-table class="table-box" wrap-cells flat>
          <thead class="table-style">
            <tr class="table-header">
              <th class="text-left text-size">{{ $t('Account.History.Date') }}</th>
              <th class="text-left text-size">{{ $t('Account.History.IP') }}</th>
              <th class="text-left text-size">{{ $t('Account.History.Location') }}</th>
            </tr>
          </thead>
          <tbody class="table-style">
            <tr class="table-line" v-for="(history, index) in userLoginHistory" :key="index">
              <td class="text-left">{{ history.date }}</td>
              <td class="text-left">{{ history.ip }}</td>
              <td class="text-left">{{ history.location }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>

    <div class="hr"></div>
  </div>
</template>

<script>
import { api } from 'src/boot/axios'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { success, fail, waiting } from '../notify/notify'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const store = useStore()
    const user = computed({
      get: () => store.state.user.user,
    })
    const q = useQuasar()
    return {
      user,
      q,
      store,
    }
  },

  data () {
    return {
      changePassword: false,
      updateEmail: false,
      updatePhone: false,
      enableGoogle: false,
      verifyID: false,
      enableLoginGA: this.enableLoginWithGA,
      passwordImg: require('/src/assets/icon-password.svg'),
      emailImg: require('/src/assets/icon-email.svg'),
      mobileImg: require('/src/assets/icon-mobile.svg'),
      authenticationImg: require('/src/assets/icon-authentication.svg'),
      verificationImg: require('/src/assets/icon-id.svg'),
      passImg: require('/src/assets/icon-pass.svg'),
      notpassImg: require('/src/assets/icon-notpass.svg'),

      userLoginHistory: [
        {
          date: '2021-10-15 21:56:49',
          ip: '116.232.193.0',
          location: 'Japan',
        },
        {
          date: '2021-10-15 21:56:49',
          ip: '116.232.193.0',
          location: 'Japan',
        },
        {
          date: '2021-10-15 21:56:49',
          ip: '116.232.193.0',
          location: 'Japan',
        },
        {
          date: '2021-10-15 21:56:49',
          ip: '116.232.193.0',
          location: 'Japan',
        },
      ],

      changePasswordInput: {
        old: '',
        password: '',
        confirmPassword: '',
      },
    }
  },

  computed: {
    enabledGoogle: function () {
      return this.user.info.UserAppInfo.UserApplicationInfo.GAVerify
    },

    enabledEmail: function () {
      if (this.user.info.UserBasicInfo.EmailAddress !== '') {
        return true
      } else {
        return false
      }
    },

    enabledMobile: function () {
      return false
    },

    enabledID: function () {
      return false
    },

    enableLoginWithGA: function () {
      if (this.user.info.UserAppInfo.UserApplicationInfo.GALogin) {
        return false
      } else {
        return this.user.info.UserAppInfo.UserApplicationInfo.GALogin
      }
    },
  },

  methods: {
    onChangePassword: function () {
      var appid = this.q.cookies.get('AppID')
      var userid = this.q.cookies.get('UserID')

      var appidCondition = (appid === '' || appid === null || appid === undefined)
      var useridCondition = (userid === '' || userid === null || userid === undefined)
      if (appidCondition || useridCondition) {
        fail(undefined, "fail to opearate, please login first", "failed")
        this.$router.push('/login')
        return
      }

      if (this.changePasswordInput.password !== this.changePasswordInput.confirmPassword) {
        fail(undefined, "password and confirm password not same", "error")
        this.changePassword = false
        return
      }

      var self = this

      api.post('/user-management/v1/change/password', {
        OldPassword: self.changePasswordInput.old,
        Password: self.changePasswordInput.password,
      }).then(resp => {
        success(undefined, 'successfully change your pasword')
        self.changePassword = false
        return
      }).catch(error => {
        fail(undefined, "fail to change password:", error)
        return
      })
    },

    submitLoginVerify: function () {
      var self = this

      var appid = this.q.cookies.get('AppID')
      var userid = this.q.cookies.get('UserID')

      var appidCondition = (appid === '' || appid === null || appid === undefined)
      var useridCondition = (userid === '' || userid === null || userid === undefined)
      if (appidCondition || useridCondition) {
        fail(undefined, "fail to opearate, please login first", "failed")
        this.$router.push('/login')
        return
      }

      api.post('/application-management/v1/set/ga/login', {
        AppID: appid,
        UserID: userid,
        set: self.enableLoginGA,
      }).then(resp => {
        success(undefined, "submit user login verfy with google authentication successfully")
        self.store.commit('user/updateUserLoginVerify', self.enableLoginGA)
        return
      }).catch(error => {
        fail(undefined, "fail to submit user login verify: ", error)
        return
      })
    },

    onSaveChange: function () {
      var appid = this.q.cookies.get('AppID')
      var userid = this.q.cookies.get('UserID')

      var appidCondition = (appid === '' || appid === null || appid === undefined)
      var useridCondition = (userid === '' || userid === null || userid === undefined)
      if (appidCondition || useridCondition) {
        fail(undefined, "fail to opearate, please login first", "failed")
        this.$router.push('/login')
        return
      }

      var self = this
      api.post('/user-management/v1/update/user', {
        AppID: appid,
        UserID: userid,
        Info: self.user.info.UserBasicInfo,
      }).then(resp => {
        success(undefined, "successfully update personal details")
        self.store.commit('user/updateUserInfo', self.user)
        return
      }).catch(error => {
        fail(undefined, "fail to update user info", error)
      })
    },
  },
})
</script>

<style scoped src="../css/account-style.css">
</style>
<style scoped>
</style>