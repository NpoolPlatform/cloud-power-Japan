<template>
  <div>
    <div class="content">
      <div class="title">{{ $t("Account.Title") }}</div>
      <div class="details-box" v-if="showDetails">
        <div class="title" style="margin: 0 0">
          {{ $t("Account.PersonalDetails.Title") }}
        </div>

        <div class="detail-column">
          <div class="input-style">
            <q-item-label>{{
              $t("Account.PersonalDetails.Username")
            }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0"
              outlined
              v-model="username"
              bg-color="blue-grey-1"
              ref="usernameRef"
              lazy-rules
              :rules="usernameRules"
            ></q-input>
          </div>

          <div class="input-style">
            <q-item-label>{{
              $t("Account.PersonalDetails.Gender")
            }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0"
              outlined
              v-model="gender"
              bg-color="blue-grey-1"
              ref="genderRef"
              lazy-rules
              :rules="genderRules"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div class="input-style">
            <q-item-label>{{
              $t("Account.PersonalDetails.FirstName")
            }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0"
              outlined
              v-model="firstname"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div class="input-style">
            <q-item-label>{{
              $t("Account.PersonalDetails.LastName")
            }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0"
              outlined
              v-model="lastname"
              bg-color="blue-grey-1"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div class="input-style">
            <q-item-label>{{
              $t("Account.PersonalDetails.StreetAddress1")
            }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0"
              outlined
              v-model="street1"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div class="input-style">
            <q-item-label>{{
              $t("Account.PersonalDetails.StreetAddress2")
            }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0"
              outlined
              v-model="street2"
              bg-color="blue-grey-1"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div class="input-style">
            <q-item-label>{{
              $t("Account.PersonalDetails.City")
            }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0"
              outlined
              v-model="city"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div class="input-style">
            <q-item-label>{{
              $t("Account.PersonalDetails.Province")
            }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0"
              outlined
              v-model="province"
              bg-color="blue-grey-1"
            ></q-input>
          </div>
        </div>

        <div class="detail-column">
          <div class="input-style">
            <q-item-label>{{
              $t("Account.PersonalDetails.Country")
            }}</q-item-label>
            <q-input
              style="width: 90%; margin: 10px 20px 0 0"
              outlined
              v-model="country"
              bg-color="blue-grey-1"
            ></q-input>
          </div>

          <div class="input-style">
            <q-btn
              style="width: 90%; margin: 10px 20px 0 0"
              class="account-btn"
              @click="onSaveChange"
              >{{ $t("Account.PersonalDetails.Save") }}</q-btn
            >
          </div>
        </div>
      </div>

      <div v-if="invitationCode !== null">
        <div class="title">{{ $t("Account.Invitation") }}</div>
        <div class="earn-box">
          <div class="earn-box-item">
            <div>
              <div class="price" style="text-transform: none; color: #1ec498">
                {{ invitationCode }}
              </div>
            </div>
            <div class="hr" style="margin: 0"></div>
            <span class="subtitle">{{ $t("Account.Invitation") }}</span>
          </div>
        </div>
      </div>

      <div>
        <div class="title">{{ $t("Account.SecuritySetting.Title") }}</div>
        <div>
          <div class="setting-column">
            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="passwordImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{
                  $t("Account.SecuritySetting.ChangePassword")
                }}</span>
              </div>
              <div class="setting-content">
                {{ $t("Account.SecuritySetting.ChangePasswordContent") }}
              </div>
              <q-space style="margin-bottom: 60px"></q-space>
              <div class="setting-btn-position">
                <q-btn
                  class="account-btn setting-btn"
                  @click="$router.push('/changepassword/email')"
                  >{{ $t("Account.SecuritySetting.ChangePasswordBtn") }}</q-btn
                >
              </div>
            </div>

            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="emailImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{
                  $t("Account.SecuritySetting.Email")
                }}</span>
              </div>
              <div class="setting-content">
                {{ $t("Account.SecuritySetting.EmailContent") }}
              </div>
              <div class="verify-content">
                <q-img
                  class="verify-img"
                  :src="enabledEmail ? passImg : notpassImg"
                ></q-img>
                <span :v-if="enabledEmail"></span>
                {{
                  enabledEmail
                    ? $t("Account.SecuritySetting.Verify")
                    : $t("Account.SecuritySetting.NotVerify")
                }}
              </div>
              <q-space style="margin-bottom: 60px"></q-space>
              <div class="setting-btn-position">
                <q-btn
                  v-if="!enabledEmail"
                  class="account-btn setting-btn"
                  @click="emailEnableDialog = true"
                  >{{ $t("Account.SecuritySetting.EmailEnable") }}</q-btn
                >

                <q-btn
                  v-if="enabledEmail"
                  class="account-btn setting-btn"
                  @click="emailUpdateDialog = true"
                  >{{ $t("Account.SecuritySetting.EmailUpdate") }}</q-btn
                >
              </div>
            </div>
          </div>

          <div class="setting-column">
            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="mobileImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{
                  $t("Account.SecuritySetting.Mobile")
                }}</span>
              </div>
              <div class="setting-content">
                {{ $t("Account.SecuritySetting.MobileContent") }}
              </div>
              <div class="verify-content">
                <q-img
                  class="verify-img"
                  :src="enabledMobile ? passImg : notpassImg"
                ></q-img>
                <span :v-if="enabledMobile"></span>
                {{
                  enabledMobile
                    ? $t("Account.SecuritySetting.Verify")
                    : $t("Account.SecuritySetting.NotVerify")
                }}
              </div>
              <q-space style="margin-bottom: 26px"></q-space>
              <div class="setting-btn-position">
                <q-btn
                  v-if="!enabledMobile"
                  @click="phoneEnableDialog = true"
                  class="account-btn setting-btn"
                  >{{ $t("Account.SecuritySetting.PhoneEnable") }}</q-btn
                >

                <q-btn
                  v-if="enabledMobile"
                  @click="phoneUpdateDialog = true"
                  class="account-btn setting-btn"
                  >{{ $t("Account.SecuritySetting.PhoneUpdate") }}</q-btn
                >
              </div>
            </div>

            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="authenticationImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{
                  $t("Account.SecuritySetting.Google")
                }}</span>
              </div>
              <div class="setting-content">
                {{ $t("Account.SecuritySetting.GoogleContent") }}
              </div>
              <div class="verify-content">
                <q-img
                  class="verify-img"
                  :src="enableGoogleAuthentication ? passImg : notpassImg"
                ></q-img>
                <span :v-if="enableGoogleAuthentication"></span>
                {{
                  enableGoogleAuthentication
                    ? $t("Account.SecuritySetting.Verify")
                    : $t("Account.SecuritySetting.NotVerify")
                }}
              </div>
              <q-space style="margin-bottom: 20px"></q-space>
              <div class="setting-btn-position">
                <q-tooltip
                  class="text-body2"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                  v-if="enableGoogleAuthentication"
                  >{{ $t("Account.SecuritySetting.HaveDoneGoogle") }}</q-tooltip
                >
                <q-btn
                  class="account-btn setting-btn google-btn"
                  :disable="enableGoogleAuthentication"
                  @click="onGoogleVerificationBtnClick"
                  >{{ $t("Account.SecuritySetting.GoogleBtn") }}</q-btn
                >
              </div>
            </div>
          </div>

          <div class="setting-column">
            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="verificationImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{
                  $t("Account.SecuritySetting.IDVerification")
                }}</span>
              </div>
              <div class="setting-content">
                {{ $t("Account.SecuritySetting.IDVerificationContent") }}
              </div>
              <div class="verify-content">
                <q-img
                  class="verify-img"
                  :src="enabledID ? passImg : notpassImg"
                ></q-img>
                <span :v-if="enabledID"></span>
                {{
                  enabledID
                    ? $t("Account.SecuritySetting.Verify")
                    : $t("Account.SecuritySetting.NotVerify")
                }}
              </div>
              <q-space style="margin-bottom: 60px"></q-space>
              <div class="setting-btn-position">
                <q-btn disable color="grey" class="account-btn setting-btn">{{
                  $t("Account.SecuritySetting.IDVerificationBtn")
                }}</q-btn>
              </div>
            </div>

            <div class="setting-box">
              <div class="setting-header">
                <q-img :src="authenticationImg" class="setting-img"></q-img>
                <span class="setting-subtitle">{{
                  $t("Account.SecuritySetting.LoginVerification")
                }}</span>
              </div>
              <div class="setting-content">
                {{ $t("Account.SecuritySetting.LoginVerificationContent") }}
              </div>
              <div class="verify-content">
                <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                  v-if="!enableGoogleAuthentication && !enabledEmail"
                  >{{ $t("Account.SecuritySetting.tooltip") }}</q-tooltip
                >
                <q-option-group
                  v-if="!enabledEmail && !userGALogin"
                  v-model="emptyNull"
                  :options="loginOptions"
                  color="primary"
                  inline
                  :disable="!enableGoogleAuthentication && !enabledEmail"
                >
                </q-option-group>
                <q-option-group
                  v-else
                  v-model="userGALogin"
                  :options="loginOptions"
                  color="primary"
                  inline
                  :disable="!enableGoogleAuthentication && !enabledEmail"
                >
                </q-option-group>
              </div>
              <q-space style="margin-bottom: 25px"></q-space>
              <div class="setting-btn-position">
                <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                  v-if="!enableGoogleAuthentication && enabledEmail"
                  >{{ $t("Account.SecuritySetting.tooltip2") }}</q-tooltip
                >
                <q-btn
                  class="account-btn setting-btn"
                  style="top: 0"
                  :disable="!enableGoogleAuthentication"
                  @click="submitLoginVerify"
                  >{{ $t("Account.SecuritySetting.Submit") }}</q-btn
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-dialog v-model="openGaVerify">
        <q-card>
          <q-card-section>
            <div class="text-h6 card-title text-black">
              {{ $t("GoogleAuthentication.Title1") }}
            </div>
          </q-card-section>

          <q-card-section class="img-section-style">
            <q-img class="img-style" :src="userGoogleImg"></q-img>
          </q-card-section>

          <q-card-section
            class="img-section-style text-black"
            style="font-weight: 600"
          >
            Google Secret: {{ userSecret }}
          </q-card-section>

          <q-card-section class="text-red">
            ({{ $t("GoogleAuthentication.Hint") }})
          </q-card-section>

          <q-card-section class="text-black">{{
            $t("GoogleAuthentication.Content1")
          }}</q-card-section>

          <q-card-section class="text-black">{{
            $t("GoogleAuthentication.Content2")
          }}</q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              :label="$t('GoogleAuthentication.NextStepBtn')"
              @click="secondDialog = true"
            />
            <q-btn
              flat
              :label="$t('GoogleAuthentication.CloseBtn')"
              v-close-popup
            />
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

      <div>
        <div class="title">{{ $t("Account.History.Title") }}</div>
        <div class="table-box">
          <q-table
            flat
            style="background: none; color: white"
            :rows="loginHistory"
            :columns="userLoginHistoryColumns"
            row-key="name"
            v-model:pagination="pagination"
            hide-pagination
          />
          <div class="flex flex-center">
            <q-pagination
              v-model="pagination.page"
              :max="pagesNumber"
              color="white"
              input
              input-class="text-white"
            />
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="emailEnableDialog" @hide="whenHide">
      <q-card class="dialog-box">
        <q-card-section>
          <span class="dialog-header">{{
            $t("Account.Email.Enable.Title")
          }}</span>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <q-input
            outlined
            bg-color="blue-grey-1"
            class="register-input"
            :label="$t('Account.Email.Enable.EmailInput')"
            v-model="email"
            ref="emailEnableRef"
            lazy-rules
            :rules="emailRule"
          ></q-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="email"
            verifyType="email"
            :username="user.info.UserBasicInfo.Username"
          ></send-code-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <q-btn class="dialog-btn-style" @click="onEnableEmail">{{
            $t("Account.Email.Enable.Btn")
          }}</q-btn>
        </q-card-section>
      </q-card></q-dialog
    >

    <q-dialog v-model="phoneEnableDialog" @hide="whenHide">
      <q-card class="dialog-box">
        <q-card-section>
          <span class="dialog-header">{{
            $t("Account.Phone.Enable.Title")
          }}</span>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <country-code></country-code>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="phone"
            verifyType="phone"
          ></send-code-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <q-btn class="dialog-btn-style" @click="onEnablePhone">{{
            $t("Account.Phone.Enable.Btn")
          }}</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="emailUpdateDialog" @hide="whenHide">
      <q-card class="dialog-box">
        <q-card-section>
          <span class="dialog-header">{{
            $t("Account.Email.Update.Title")
          }}</span>
        </q-card-section>
        <q-card-section
          class="dialog-section-style"
          style="margin-bottom: 30px"
        >
          <q-input
            outlined
            bg-color="blue-grey-1"
            class="register-input"
            :label="$t('Account.Email.Update.OldEmailInput')"
            v-model="email"
            disable
          ></q-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="email"
            verifyType="email"
            codeType="old"
            :username="user.info.UserBasicInfo.Username"
          ></send-code-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <q-input
            outlined
            bg-color="blue-grey-1"
            class="register-input"
            :label="$t('Account.Email.Update.EmailInput')"
            v-model="emailUpdateInput.email"
            ref="emailUpdateRef"
            lazy-rules
            :rules="emailRule"
          ></q-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="emailUpdateInput.email"
            verifyType="email"
            :username="user.info.UserBasicInfo.Username"
          ></send-code-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <q-btn class="dialog-btn-style" @click="onUpdateEmail">{{
            $t("Account.Email.Update.Btn")
          }}</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="phoneUpdateDialog" @hide="whenHide">
      <q-card class="dialog-box">
        <q-card-section>
          <span class="dialog-header">{{
            $t("Account.Phone.Update.Title")
          }}</span>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <country-code inputType="old"></country-code>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="oldPhone"
            verifyType="phone"
            codeType="old"
          ></send-code-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <country-code inputType="new"></country-code>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="phone"
            verifyType="phone"
          ></send-code-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <q-btn class="dialog-btn-style" @click="onUpdatePhone">{{
            $t("Account.Phone.Update.Btn")
          }}</q-btn></q-card-section
        >
      </q-card>
    </q-dialog>

    <div class="hr"></div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, computed, ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { success, fail, waiting } from "../notify/notify";
import { throttle, useQuasar } from "quasar";
import VerifycodeInput from "src/components/VerifycodeInput.vue";
import {
  failCodeError,
  parseEmail,
  parseUsername,
  timestampToDate,
} from "src/utils/utils";
import { useI18n } from "vue-i18n";
import SendCodeInput from "src/components/SendCodeInput.vue";
import CountryCode from "src/components/CountryCode.vue";

export default defineComponent({
  components: { VerifycodeInput, SendCodeInput, CountryCode },
  setup() {
    const $store = useStore();
    const q = useQuasar();

    const user = computed({
      get: () => $store.state.user.user,
      set: (val) => {
        $store.commit("user/updateUserInfo", val);
      },
    });

    const { t } = useI18n({ useScope: "global" });

    const getUserBasicInfo = () => {
      var failToGetUserinfo = t("Notify.User.Fail");

      var appid = q.cookies.get("AppID");
      var userid = q.cookies.get("UserID");

      api
        .post("/user-management/v1/get/user/details", {
          AppID: appid,
          UserID: userid,
        })
        .then((resp) => {
          user.value = {
            info: resp.data.Info,
            logined: true,
          };
        })
        .catch((error) => {
          fail(undefined, failToGetUserinfo, error);
        });
    };

    onMounted(() => {
      getUserBasicInfo();
    });

    const email = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.EmailAddress,
      set: (val) => {
        $store.commit("user/updateUserEmail", val);
      },
    });

    const myPhone = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.PhoneNumber,
    });

    const phone = computed({
      get: () => $store.state.verify.phone,
      set: (val) => {
        $store.commit("verify/updatePhone", val);
      },
    });

    const oldPhone = computed({
      get: () => $store.state.verify.oldPhone,
      set: (val) => {
        $store.commit("verify/updateOldPhone", val);
      },
    });

    const verifyCode = computed({
      get: () => $store.state.verify.verifyCode,
      set: (val) => {
        $store.commit("verify/updateVerifyCode", val);
      },
    });

    const oldVerifyCode = computed({
      get: () => $store.state.verify.oldVerifyCode,
      set: (val) => {
        $store.commit("verify/updateOldVerifyCode", val);
      },
    });

    const username = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.Username,
      set: (val) => {
        $store.commit("user/updateUsername", val);
      },
    });
    const gender = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.Gender,
      set: (val) => {
        $store.commit("user/updateGender", val);
      },
    });
    const firstname = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.FirstName,
      set: (val) => {
        $store.commit("user/updateFirstname", val);
      },
    });
    const lastname = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.LastName,
      set: (val) => {
        $store.commit("user/updateLastname", val);
      },
    });
    const street1 = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.StreetAddress1,
      set: (val) => {
        $store.commit("user/updateStreet1", val);
      },
    });
    const street2 = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.StreetAddress2,
      set: (val) => {
        $store.commit("user/updateStreet2", val);
      },
    });
    const city = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.City,
      set: (val) => {
        $store.commit("user/updateCity", val);
      },
    });
    const province = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.Province,
      set: (val) => {
        $store.commit("user/updateProvince", val);
      },
    });
    const country = computed({
      get: () => $store.state.user.user.info.UserBasicInfo.Country,
      set: (val) => {
        $store.commit("user/updateCountry", val);
      },
    });

    const enableGoogleAuthentication = computed({
      get: () =>
        $store.state.user.user.info.UserAppInfo.UserApplicationInfo.GAVerify,
      set: (val) => {
        $store.commit("user/updateGA", val);
      },
    });

    const userGALogin = computed({
      get: () =>
        $store.state.user.user.info.UserAppInfo.UserApplicationInfo.GALogin,
      set: (val) => {
        $store.commit("user/updateUserLoginVerify", val);
      },
    });

    const password = ref(null);

    const emailRule = ref([
      (val) => parseEmail(val) || t("Register.UsernameInputwarning"),
    ]);

    const enabledMobile = computed({
      get: () =>
        myPhone.value !== "" &&
        myPhone.value !== null &&
        myPhone.value !== undefined,
    });

    const enabledEmail = computed({
      get: () =>
        user.value.info.UserBasicInfo.EmailAddress !== "" &&
        user.value.info.UserBasicInfo.EmailAddress !== null &&
        user.value.info.UserBasicInfo.EmailAddress !== undefined,
    });

    const emailEnableRef = ref(null);
    const emailUpdateOldRef = ref(null);
    const emailUpdateRef = ref(null);

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
    });

    const invitationCode = ref("");

    const emailEnableDialog = ref(false);
    const phoneEnableDialog = ref(false);
    const emailUpdateDialog = ref(false);
    const phoneUpdateDialog = ref(false);

    const emailEnableInput = reactive({
      email: ref(""),
      emailCode: verifyCode.value,
    });

    const phoneEnableInput = computed(() => {
      return {
        phone: phone.value,
        phoneCode: verifyCode.value,
      };
    });

    const emailUpdateInput = reactive({
      oldEmail: email.value,
      oldEmailCode: oldVerifyCode.value,
      email: "",
      emailCode: verifyCode.value,
    });

    const phoneUpdateInput = computed(() => {
      return {
        oldPhone: oldPhone.value,
        oldPhoneCode: oldVerifyCode.value,
        phone: phone.value,
        phoneCode: verifyCode.value,
      };
    });

    const loginOptions = ref([
      {
        label: t("Account.SecuritySetting.GALogin"),
        value: true,
        disable: !enableGoogleAuthentication.value,
      },
      {
        label: t("Account.SecuritySetting.EmailLogin"),
        value: false,
        disable: !enabledEmail.value,
      },
    ]);

    const usernameRef = ref(null);

    const usernameRules = ref([
      (val) => parseUsername(val) || t("Update.UsernameInputWarning"),
    ]);

    const genderRules = ref([(val) => (val && val.length > 1) || t()]);

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
      username,
      gender,
      enableGoogleAuthentication,
      q,
      pagination,
      emailRule,
      password,
      emailEnableDialog,
      phoneEnableDialog,
      phoneUpdateDialog,
      emailUpdateDialog,
      emailUpdateInput,
      phoneUpdateInput,
      emailEnableInput,
      phoneEnableInput,
      emailEnableRef,
      emailUpdateOldRef,
      emailUpdateRef,
      verifyCode,
      oldVerifyCode,
      invitationCode,
      loginOptions,
      userSecret: ref(""),
      enabledMobile,
      enabledEmail,
      email,
      phone,
      oldPhone,
      myPhone,
      usernameRef,
      usernameRules,
      genderRef: ref(null),
      genderRules,
      showDetails: ref(true),
      emptyNull: ref(""),
    };
  },

  data() {
    return {
      changePasswordInput: {
        email: "",
        emailCode: "",
        googleCode: "",
        old: "",
        password: "",
        confirmPassword: "",
      },
      changePassword: false,
      passwordImg: require("/src/assets/icon-password.svg"),
      emailImg: require("/src/assets/icon-email.svg"),
      mobileImg: require("/src/assets/icon-mobile.svg"),
      authenticationImg: require("/src/assets/icon-authentication.svg"),
      verificationImg: require("/src/assets/icon-id.svg"),
      passImg: require("/src/assets/icon-pass.svg"),
      notpassImg: require("/src/assets/icon-notpass.svg"),
      userGoogleImg: "",
      openGaVerify: false,
      secondDialog: false,
      visible: false,

      userLoginHistoryColumns: [
        {
          name: "LoginTime",
          label: this.$t("Account.History.Date"),
          align: "left",
          field: "LoginTime",
          sortable: true,
        },
        {
          name: "IP",
          label: this.$t("Account.History.IP"),
          align: "center",
          field: "IP",
        },
        {
          name: "Location",
          label: this.$t("Account.History.Location"),
          align: "center",
          field: "Location",
        },
      ],

      loginHistory: [],
      pagesNumber: computed(() =>
        Math.ceil(this.loginHistory.length / this.pagination.rowsPerPage)
      ),
      relogin: false,
    };
  },

  created: function () {
    var userid = this.q.cookies.get("UserID");
    if (userid === null || userid === undefined || userid === "") {
      fail(undefined, this.$t("Notify.User.PleaseLogin"), "");
      this.$router.push("/login");
    }

    this.getUserLoginHistory();
    this.onSaveChange = throttle(this.onSaveChange, 1000);
    this.onGoogleVerificationBtnClick = throttle(
      this.onGoogleVerificationBtnClick,
      1000
    );
    this.submitLoginVerify = throttle(this.submitLoginVerify, 1000);
  },

  mounted: function () {
    this.getUserInvitationCode();
  },

  computed: {
    enabledID: function () {
      return false;
    },
  },

  methods: {
    whenHide: function () {
      this.verifyCode = "";
      this.oldVerifyCode = "";
      this.phone = "";
      this.oldPhone = "";
    },

    refreshUserInfo: function () {
      this.showDetails = false;
      setTimeout(() => {
        this.showDetails = true;
      }, 100);
    },

    submitLoginVerify: function () {
      var self = this;
      var appid = this.q.cookies.get("AppID");
      var userid = this.q.cookies.get("UserID");

      var set = false;
      if (!this.enabledEmail && !this.userGALogin) {
        set = this.emptyNull;
      } else {
        set = this.userGALogin;
      }

      api
        .post("/application-management/v1/set/ga/login", {
          AppID: appid,
          UserID: userid,
          Set: set,
        })
        .then((resp) => {
          success(undefined, self.$t("Notify.SubmitLoginVerify.Success"));
          if (self.userGALogin) {
            self.userGALogin = true;
          }
          return;
        })
        .catch((error) => {
          fail(undefined, self.$t("Notify.SubmitLoginVerify.Fail"), error);
          return;
        });
    },

    onSaveChange: function () {
      var appid = this.q.cookies.get("AppID");
      var userid = this.q.cookies.get("UserID");
      var notif = waiting(this.$t("Notify.ChangeUserInfo.Waiting"));

      var self = this;
      api
        .post("/user-management/v1/update/user", {
          AppID: appid,
          UserID: userid,
          Info: self.user.info.UserBasicInfo,
        })
        .then((resp) => {
          success(notif, self.$t("Notify.ChangeUserInfo.Success"));
          self.refreshUserInfo();
        })
        .catch((error) => {
          fail(notif, self.$t("Notify.ChangeUserInfo.Fail"), error);
          location.reload();
        });
    },

    onGoogleVerificationBtnClick: function () {
      this.openGaVerify = true;
      var self = this;
      var username = "";
      if (
        this.user.info.UserBasicInfo.EmailAddress != "" &&
        this.user.info.UserBasicInfo.EmailAddress != null &&
        this.user.info.UserBasicInfo.EmailAddress != undefined
      ) {
        username =
          "(Procyon:" + this.user.info.UserBasicInfo.EmailAddress + ")";
      } else if (
        this.user.info.UserBasicInfo.PhoneNumber != "" &&
        this.user.info.UserBasicInfo.PhoneNumber != null &&
        this.user.info.UserBasicInfo.PhoneNumber != undefined
      ) {
        username = "(Procyon:" + this.user.info.UserBasicInfo.PhoneNumber + ")";
      }

      api
        .post("verification-door/v1/get/qrcode/url", {
          Username: username,
        })
        .then((resp) => {
          self.userGoogleImg = resp.data.Info.CodeURL;
          self.userSecret = resp.data.Info.Secret;
        })
        .catch((error) => {
          fail(undefined, self.$t("Notify.GaVerify.FailToGetImg"), error);
        });
    },

    verifyCallback: function (resp) {
      if (resp === "pass") {
        this.secondDialog = false;
        this.visible = true;
        var appid = this.q.cookies.get("AppID");
        var userid = this.q.cookies.get("UserID");

        var self = this;
        api
          .post("/application-management/v1/update/user/ga/status", {
            UserID: userid,
            AppID: appid,
            Status: true,
          })
          .then((resp) => {
            success(undefined, self.$t("GoogleVerify.Success"));
            self.enableGoogleAuthentication = true;
            self.visible = false;
            self.openGaVerify = false;
            location.reload();
          })
          .catch((error) => {
            fail(undefined, self.$t("GoogleVerify.Fail"), error);
            self.visible = false;
          });
      }
    },

    getUserLoginHistory: function () {
      var self = this;

      api
        .post("/login-door/v1/get/user/login/records", {})
        .then((resp) => {
          resp.data.Infos.forEach((info) => {
            if (
              info.Location === "" ||
              info.Location === null ||
              info.Location === undefined
            ) {
              info.Location = self.$t("Account.History.Private");
            }
            info.LoginTime = timestampToDate(info.LoginTime);
            self.loginHistory.push(info);
          });
        })
        .catch((error) => {
          self.loginHistory = [];
        });
    },

    onEnableEmail: function () {
      this.emailEnableRef.validate();
      if (this.emailEnableRef.hasError) {
        return;
      }

      if (this.verifyCode === "") {
        fail(undefined, this.$t("AccountNotify.EnableEmail.VerifyCode"), "");
        return;
      }

      var self = this;

      api
        .post("/user-management/v1/bind/email", {
          EmailAddress: self.email,
          Code: self.verifyCode,
        })
        .then((resp) => {
          success(undefined, self.$t("AccountNotify.EnableEmail.Success"));
          self.verifyCode = "";
          self.emailEnableDialog = false;
          location.reload();
        })
        .catch((error) => {
          failCodeError(
            error,
            self.$t("CodeFail.Fail1"),
            self.$t("CodeFail.Fail2")
          );
          self.email = "";
        });
    },

    onEnablePhone: function () {
      if (this.phoneEnableInput.phone === "") {
        fail(undefined, this.$t("AccountNotify.EnablePhone.Phone"), "");
        return;
      }

      if (this.verifyCode === "") {
        fail(undefined, this.$t("AccountNotify.EnablePhone.VerifyCode"), "");
        return;
      }

      var self = this;
      api
        .post("/user-management/v1/bind/phone", {
          PhoneNumber: self.phoneEnableInput.phone,
          Code: self.verifyCode,
        })

        .then((resp) => {
          success(undefined, self.$t("AccountNotify.EnablePhone.Success"));
          self.verifyCode = "";
          self.phone = "";
          self.phoneEnableDialog = false;
          location.reload();
        })
        .catch((error) => {
          failCodeError(
            error,
            self.$t("CodeFail.Fail1"),
            self.$t("CodeFail.Fail2")
          );
        });
    },

    onUpdateEmail: function () {
      this.emailUpdateRef.validate();
      if (this.emailUpdateRef.hasError) {
        return;
      }

      if (this.verifyCode === "" || this.oldVerifyCode === "") {
        fail(undefined, this.$t("AccountNotify.UpdateEmail.VerifyCode"), "");
        return;
      }

      var self = this;
      api
        .post("/user-management/v1/update/user/email", {
          OldEmail: self.email,
          OldCode: self.oldVerifyCode,
          NewEmail: self.emailUpdateInput.email,
          NewCode: self.verifyCode,
        })
        .then((resp) => {
          success(undefined, self.$t("AccountNotify.UpdateEmail.Success"));
          self.verifyCode = "";
          self.oldVerifyCode = "";
          self.emailUpdateDialog = false;
          location.reload();
        })
        .catch((error) => {
          failCodeError(
            error,
            self.$t("CodeFail.Fail1"),
            self.$t("CodeFail.Fail2")
          );
        });
    },

    onUpdatePhone: function () {
      if (this.phoneUpdateInput.oldPhone === "") {
        fail(undefined, this.$t("AccountNotify.UpdatePhone.OldPhone"), "");
        return;
      }

      if (this.phoneUpdateInput.phone === "") {
        fail(undefined, this.$t("AccountNotify.UpdatePhone.Phone"), "");
        return;
      }

      if (this.verifyCode === "" || this.oldVerifyCode === "") {
        fail(undefined, this.$t("AccountNotify.UpdatePhone.VeirfyCode"), "");
        return;
      }

      var self = this;

      api
        .post("/user-management/v1/update/user/phone", {
          OldPhone: self.phoneUpdateInput.oldPhone,
          OldCode: self.oldVerifyCode,
          NewPhone: self.phoneUpdateInput.phone,
          NewCode: self.verifyCode,
        })
        .then((resp) => {
          success(undefined, self.$t("AccountNotify.UpdatePhone.Success"));
          self.verifyCode = "";
          self.oldVerifyCode = "";
          self.phone = "";
          self.oldPhone = "";
          self.phoneUpdateDialog = false;
          location.reload();
        })
        .catch((error) => {
          failCodeError(
            error,
            self.$t("CodeFail.Fail1"),
            self.$t("CodeFail.Fail2")
          );
        });
    },

    getUserInvitationCode: function () {
      var userid = this.q.cookies.get("UserID");
      var appid = this.q.cookies.get("AppID");
      var self = this;
      api
        .post(
          "/cloud-hashing-inspire/v1/get/user/invitation/code/by/app/user",
          {
            AppID: appid,
            UserID: userid,
          }
        )
        .then((resp) => {
          if (resp.data.Info === null) {
            self.invitationCode = null;
            return;
          }
          self.invitationCode = resp.data.Info.InvitationCode;
        })
        .catch((error) => {
          self.invitationCode = null;
        });
    },
  },
});
</script>

<style scoped src="../css/account-style.css"></style>
<style scoped>
.register-input {
  border-radius: 12px;
  color: #27424c;
  font-size: 14px;
  width: 100%;
  margin: 10px 0;
}
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
.pagination-style {
  color: #1ec498;
}
.table-title-style {
  font-size: 18px;
  font-weight: 600;
}

.earn-box {
  display: flex;
  justify-content: center;
}

.earn-box-item {
  display: flex;
  flex-direction: column;
  padding: 0 36px;
  text-align: center;
  min-width: 240px;
  width: 30%;
}

.price {
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
}

.subtitle {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 12px 0;
}

.hr {
  background: linear-gradient(
    to right,
    transparent 10%,
    #1ec498 60%,
    transparent 90%
  );
  opacity: 0.7;
  height: 2px;
  width: 100%;
}
</style>
