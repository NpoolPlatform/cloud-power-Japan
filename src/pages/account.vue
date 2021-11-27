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
              v-model="firstname"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.LastName') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="lastname"
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
              v-model="street1"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.StreetAddress2') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="street2"
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
              v-model="city"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div>
            <q-item-label>{{ $t('Account.PersonalDetails.Province') }}</q-item-label>
            <q-input
              style="width: 400px; margin-top: 10px;"
              outlined
              v-model="province"
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
              v-model="country"
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
                <q-img class="verify-img" :src="enableGoogleAuthentication ? passImg : notpassImg"></q-img>
                <span :v-if="enableGoogleAuthentication"></span>
                {{ enableGoogleAuthentication ? $t('Account.SecuritySetting.Verify') : $t('Account.SecuritySetting.NotVerify') }}
              </div>
              <q-btn
                class="account-btn setting-btn google-btn btn-position"
                style="top: 5px;"
                @click="onGoogleVerificationBtnClick"
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
                <q-toggle
                  v-model="userGALogin"
                  color="green"
                  :disable="!enableGoogleAuthentication"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                    v-if="!enableGoogleAuthentication"
                  >please do google authenticate verify first!!!</q-tooltip>
                </q-toggle>
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

      <q-dialog v-model="openGaVerify">
        <q-card>
          <q-card-section>
            <div class="text-h6 card-title text-black">{{ $t('GoogleAuthentication.Title1') }}</div>
          </q-card-section>

          <q-card-section class="img-section-style">
            <q-img class="img-style" :src="userGoogleImg"></q-img>
          </q-card-section>

          <q-card-section class="text-black">{{ $t('GoogleAuthentication.Content1') }}</q-card-section>

          <q-card-section class="text-black">{{ $t('GoogleAuthentication.Content2') }}</q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              :label="$t('GoogleAuthentication.NextStepBtn')"
              @click="secondDialog = true"
            />
            <q-btn flat :label="$t('GoogleAuthentication.CloseBtn')" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="secondDialog">
        <q-card>
          <q-card-section>
            <span class="card-title text-black">Google Verify</span>
          </q-card-section>
          <q-card-section>
            <verifycode-input @callback="verifyCallback"></verifycode-input>
          </q-card-section>
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
import { success, fail } from '../notify/notify'
import { useQuasar } from 'quasar'
import VerifycodeInput from 'src/components/VerifycodeInput.vue'

export default defineComponent({
  components: { VerifycodeInput },
  setup () {
    const $store = useStore()
    const user = computed({
      get: () => $store.state.user.user,
      set: val => {
        $store.commit('user/updateUserInfo', val)
      }
    })

    const firstname = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.FirstName,
      set: val => {
        $store.commit('user/updateFirstname', val)
      }
    })

    const lastname = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.LastName,
      set: val => {
        $store.commit('user/updateLastname', val)
      }
    })

    const street1 = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.StreetAddress1,
      set: val => {
        $store.commit('user/updateStreet1', val)
      }
    })

    const street2 = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.StreetAddress2,
      set: val => {
        $store.commit('user/updateStreet2', val)
      }
    })

    const city = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.City,
      set: val => {
        $store.commit('user/updateCity', val)
      }
    })

    const province = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.Province,
      set: val => {
        $store.commit('user/updateProvince', val)
      }
    })

    const country = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.Country,
      set: val => {
        $store.commit('user/updateCountry', val)
      }
    })

    const enableGoogleAuthentication = computed({
      get: () => $store.state.user.user.info.UserAppInfo.UserApplicationInfo.GAVerify,
      set: val => {
        $store.commit('user/updateGA', val)
      }
    })

    const userGALogin = computed({
      get: () => $store.state.user.user.info.UserAppInfo.UserApplicationInfo.GALogin,
      set: val => {
        $store.commit('user/updateUserLoginVerify', val)
      }
    })
    const q = useQuasar()
    return {
      user,
      userGALogin,
      firstname,
      lastname,
      street1,
      street2,
      city,
      province,
      country,
      enableGoogleAuthentication,
      q,
    }
  },

  data () {
    return {
      changePassword: false,
      passwordImg: require('/src/assets/icon-password.svg'),
      emailImg: require('/src/assets/icon-email.svg'),
      mobileImg: require('/src/assets/icon-mobile.svg'),
      authenticationImg: require('/src/assets/icon-authentication.svg'),
      verificationImg: require('/src/assets/icon-id.svg'),
      passImg: require('/src/assets/icon-pass.svg'),
      notpassImg: require('/src/assets/icon-notpass.svg'),
      userGoogleImg: '',
      openGaVerify: false,
      secondDialog: false,

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

  created: function () {
    var userid = this.q.cookies.get('UserID')
    if (userid === null || userid === undefined || userid === '') {
      fail(undefined, this.$t('Notify.User.PleaseLogin'), "")
      this.$router.push('/login')
    }
  },

  computed: {
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
  },

  methods: {
    onChangePassword: function () {
      var self = this

      if (this.changePasswordInput.password !== this.changePasswordInput.confirmPassword) {
        fail(undefined, self.$t('Notify.ChangePassword.Fail1'), "")
        this.changePassword = false
        return
      }

      api.post('/user-management/v1/change/password', {
        OldPassword: self.changePasswordInput.old,
        Password: self.changePasswordInput.password,
      }).then(resp => {
        success(undefined, self.$t('Notify.ChangePassword.Success'))
        self.changePassword = false
        return
      }).catch(error => {
        fail(undefined, self.$t('Notify.ChangePasword.Fail2'), error)
        return
      })
    },

    submitLoginVerify: function () {
      var self = this
      var appid = this.q.cookies.get('AppID')
      var userid = this.q.cookies.get('UserID')

      api.post('/application-management/v1/set/ga/login', {
        AppID: appid,
        UserID: userid,
        set: self.userGALogin,
      }).then(resp => {
        success(undefined, self.$t('Notify.SubmitLoginVerify.Success'))
        return
      }).catch(error => {
        fail(undefined, self.$t('Notify.SubmitLoginVerify.Fail'), error)
        return
      })
    },

    onSaveChange: function () {
      var appid = this.q.cookies.get('AppID')
      var userid = this.q.cookies.get('UserID')

      var self = this
      api.post('/user-management/v1/update/user', {
        AppID: appid,
        UserID: userid,
        Info: self.user.info.UserBasicInfo,
      }).then(resp => {
        success(undefined, self.$t('Notify.ChangeUserInfo.Success'))
      }).catch(error => {
        fail(undefined, self.$t('Notify.ChangeUserInfo.Fail'), error)
      })
    },

    onGoogleVerificationBtnClick: function () {
      this.openGaVerify = true
      var self = this
      api.post('verification-door/v1/get/qrcode/url', {
        Username: self.user.info.UserBasicInfo.Username,
      }).then(resp => {
        self.userGoogleImg = resp.data.Info
        console.log('google img is', self.userGoogleImg);
      }).catch(error => {
        fail(undefined, self.$t('Notify.GaVerify.FailToGetImg'), error)
      })
    },

    verifyCallback: function (resp) {
      if (resp === 'pass') {
        this.secondDialog = false
        this.enableGoogleAuthentication = true
        this.openGaVerify = false
      }
    },
  },
})
</script>

<style scoped src="../css/account-style.css">
</style>
<style scoped>
.card-title {
  color: #e1eeef;
  font-size: 24px;
  font-weight: 200;
  position: relative;
  margin: 0 0 24px 0;
  padding: 0 0 24px 0;
}

.card-title::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e1eeef 10%,
    transparent 100%
  );
  display: block;
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
}

.img-style {
  width: 200px;
  height: 200px;
  text-align: center;
}

.img-section-style {
  display: flex;
  justify-content: center;
}
</style>