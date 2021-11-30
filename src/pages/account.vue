<template>
  <div>
    <div class="content">
      <div class="title">{{ $t('Account.Title') }}</div>
      <div class="details-box">
        <span class="title">{{ $t('Account.PersonalDetails.Title') }}</span>
        <div class="detail-column">
          <div class="input-style">
            <q-item-label>{{ $t('Account.PersonalDetails.FirstName') }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0;"
              outlined
              v-model="firstname"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div class="input-style">
            <q-item-label>{{ $t('Account.PersonalDetails.LastName') }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0;"
              outlined
              v-model="lastname"
              bg-color="blue-grey-1"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div class="input-style">
            <q-item-label>{{ $t('Account.PersonalDetails.StreetAddress1') }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0;"
              outlined
              v-model="street1"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div class="input-style">
            <q-item-label>{{ $t('Account.PersonalDetails.StreetAddress2') }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0;"
              outlined
              v-model="street2"
              bg-color="blue-grey-1"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div class="input-style">
            <q-item-label>{{ $t('Account.PersonalDetails.City') }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0;"
              outlined
              v-model="city"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div class="input-style">
            <q-item-label>{{ $t('Account.PersonalDetails.Province') }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0;"
              outlined
              v-model="province"
              bg-color="blue-grey-1"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div class="input-style">
            <q-item-label>{{ $t('Account.PersonalDetails.Country') }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0;"
              outlined
              v-model="country"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div class="input-style">
            <q-btn
              style="width: 90%; margin: 10px 20px 0 0;"
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
              <q-space style="margin-bottom: 60px"></q-space>
              <div class="setting-btn-position">
                <q-btn
                  class="account-btn setting-btn"
                  @click="changePassword = true"
                >{{ $t('Account.SecuritySetting.ChangePasswordBtn') }}</q-btn>
              </div>
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
              <q-space style="margin-bottom: 60px"></q-space>
              <div class="setting-btn-position">
                <q-btn
                  disable
                  color="grey"
                  class="account-btn setting-btn"
                >{{ $t('Account.SecuritySetting.EmailBtn') }}</q-btn>
              </div>
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
              <q-space style="margin-bottom: 26px"></q-space>
              <div class="setting-btn-position">
                <q-btn
                  disable
                  color="grey"
                  class="account-btn setting-btn"
                >{{ $t('Account.SecuritySetting.MobileBtn') }}</q-btn>
              </div>
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
              <q-space style="margin-bottom: 20px"></q-space>
              <div class="setting-btn-position">
                <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                  v-if="enableGoogleAuthentication"
                >{{ $t('Account.SecuritySetting.HaveDoneGoogle') }}</q-tooltip>
                <q-btn
                  class="account-btn setting-btn google-btn"
                  :disable="enableGoogleAuthentication"
                  @click="onGoogleVerificationBtnClick"
                >{{ $t('Account.SecuritySetting.GoogleBtn') }}</q-btn>
              </div>
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
              <q-space style="margin-bottom: 60px"></q-space>
              <div class="setting-btn-position">
                <q-btn
                  disable
                  color="grey"
                  class="account-btn setting-btn"
                >{{ $t('Account.SecuritySetting.IDVerificationBtn') }}</q-btn>
              </div>
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
              <q-space style="margin-bottom: 25px"></q-space>
              <div class="setting-btn-position">
                <q-btn
                  class="account-btn setting-btn"
                  style="top: 0;"
                  @click="submitLoginVerify"
                >{{ $t('Account.SecuritySetting.Submit') }}</q-btn>
              </div>
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

      <q-inner-loading
        :showing="visible"
        :label="$t('GoogleVerify.PleaseWait')"
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />

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

      <div v-show="false">
        <div class="title">{{ $t('Account.History.Title') }}</div>
        <div>
          <q-table
            flat
            class="table-box"
            :rows="userLoginHistory"
            :columns="userLoginHistoryColumns"
            row-key="name"
          />
        </div>
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
      visible: false,

      userLoginHistoryColumns: [
        { name: 'date', label: this.$t('Account.History.Date'), align: 'left', field: 'date' },
        { name: 'ip', label: this.$t('Account.History.IP'), align: 'center', field: 'ip', },
        { name: 'location', label: this.$t('Account.History.Location'), align: 'center', field: 'location', },
      ],

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
      var username = "(Procyon:" + this.user.info.UserBasicInfo.EmailAddress + ")"
      api.post('verification-door/v1/get/qrcode/url', {
        Username: username,
      }).then(resp => {
        self.userGoogleImg = resp.data.Info
      }).catch(error => {
        fail(undefined, self.$t('Notify.GaVerify.FailToGetImg'), error)
      })
    },

    verifyCallback: function (resp) {
      if (resp === 'pass') {
        this.secondDialog = false
        this.visible = true
        var appid = this.q.cookies.get('AppID')
        var userid = this.q.cookies.get('UserID')

        var self = this
        api.post('/application-management/v1/update/user/ga/status', {
          UserID: userid,
          AppID: appid,
          Status: true,
        }).then(resp => {
          success(undefined, "successfully set user google verify")
          this.enableGoogleAuthentication = true

        }).catch(error => {
          fail(undefined, 'fail to set user google verify', error)
        })
        this.visible = false
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