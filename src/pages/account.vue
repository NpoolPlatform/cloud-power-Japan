<template>
  <div>
    <div class="content">
      <div class="title">{{ $t("Account.Title") }}</div>
      <div class="details-box">
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
                  :disable="!enableGoogleAuthentication"
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
                  v-if="user.info.UserBasicInfo.EmailAddress === ''"
                  class="account-btn setting-btn"
                  @click="emailEnableDialog = true"
                  >{{ $t("Account.SecuritySetting.EmailEnable") }}</q-btn
                >

                <q-btn
                  v-if="user.info.UserBasicInfo.EmailAddress !== ''"
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
                  v-if="user.info.UserBasicInfo.PhoneNumber === ''"
                  @click="phoneEnableDialog = true"
                  class="account-btn setting-btn"
                  >{{ $t("Account.SecuritySetting.PhoneEnable") }}</q-btn
                >

                <q-btn
                  v-if="user.info.UserBasicInfo.PhoneNumber !== ''"
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
                    >please do google authenticate verify first!!!</q-tooltip
                  >
                </q-toggle>
                <span>{{ $t("Account.SecuritySetting.GALogin") }}</span>
              </div>
              <q-space style="margin-bottom: 25px"></q-space>
              <div class="setting-btn-position">
                <q-btn
                  class="account-btn setting-btn"
                  style="top: 0"
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

    <q-dialog v-model="emailEnableDialog">
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
            v-model="emailEnableInput.email"
            ref="emailEnableRef"
            lazy-rules
            :rules="emailRule"
          ></q-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="emailEnableInput.email"
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

    <q-dialog v-model="phoneEnableDialog">
      <q-card class="dialog-box">
        <q-card-section>
          <span class="dialog-header">{{
            $t("Account.Phone.Enable.Title")
          }}</span>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <country-code
            v-model:userPhoneNumber="phoneEnableResponse.phone"
            v-model:userCode="phoneEnableResponse.code"
          ></country-code>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="phoneEnableInput.phone"
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

    <q-dialog v-model="emailUpdateDialog">
      <q-card class="dialog-box">
        <q-card-section>
          <span class="dialog-header">{{
            $t("Account.Email.Update.Title")
          }}</span>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <q-input
            outlined
            bg-color="blue-grey-1"
            class="register-input"
            :label="$t('Account.Email.Update.OldEmailInput')"
            v-model="emailUpdateInput.oldEmail"
            ref="emailUpdateOldRef"
            lazy-rules
            :rules="emailRule"
          ></q-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="emailUpdateInput.oldEmail"
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

    <q-dialog v-model="phoneUpdateDialog">
      <q-card class="dialog-box">
        <q-card-section>
          <span class="dialog-header">{{
            $t("Account.Phone.Update.Title")
          }}</span>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <country-code
            v-model:userPhoneNumber="phoneUpdateResponse.oldPhone"
            v-model:userCode="phoneUpdateResponse.oldCode"
            inputType="old"
          ></country-code>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="phoneUpdateInput.oldPhone"
            verifyType="phone"
            codeType="old"
          ></send-code-input>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <country-code
            v-model:userPhoneNumber="phoneUpdateResponse.phone"
            v-model:userCode="phoneUpdateResponse.code"
            inputType="new"
          ></country-code>
        </q-card-section>
        <q-card-section class="dialog-section-style">
          <send-code-input
            :verifyParam="phoneUpdateInput.phone"
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
import { defineComponent, computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { success, fail, waiting } from "../notify/notify";
import { throttle, useQuasar } from "quasar";
import VerifycodeInput from "src/components/VerifycodeInput.vue";
import { timestampToDate } from "src/utils/utils";
import { sha256Password } from "src/utils/utils";
import { useI18n } from "vue-i18n";
import SendCodeInput from "src/components/SendCodeInput.vue";
import CountryCode from "src/components/CountryCode.vue";

export default defineComponent({
  components: { VerifycodeInput, SendCodeInput, CountryCode },
  setup() {
    const $store = useStore();
    const user = computed({
      get: () => $store.state.user.user,
      set: (val) => {
        $store.commit("user/updateUserInfo", val);
      },
    });

    const userBasicInfo = computed({
      get: () => $store.state.user.user.info.UserBasicInfo,
      set: (val) => {
        $store.commit("user/updateUserBasicInfo", val);
      },
    });

    const { locale } = useI18n({ useScope: "global" });
    const { t } = useI18n({ useScope: "global" });

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
    const q = useQuasar();
    const password = ref(null);

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

    const emailRef = ref(null);
    const emailCodeRef = ref(null);
    const googleCodeRef = ref(null);
    const oldPassRef = ref(null);
    const passwordRef = ref(null);
    const confirmPassRef = ref(null);

    const emailRule = ref([
      (val) => (val && val.length > 0) || t("Register.UsernameInputwarning"),
    ]);
    const emailCodeRule = ref([
      (val) =>
        (val && val.length > 0) || t("Register.EmailVerifyCodeInpuWarning"),
    ]);
    const passwordRule = ref([
      (val) => (val && val.length > 0) || t("Register.PasswordInputWarning"),
    ]);
    const confirmpassRule = ref([
      (val) => (val && val.length > 0) || t("Register.ConfirmInputWarning1"),
    ]);
    const googleCodeRule = ref([
      (val) => (val && val.length > 0) || t("Register.GooglrCodeInputWarning"),
    ]);
    const oldPasswordRule = ref([
      (val) => (val && val.length > 0) || t("Register.PasswordInputWarning"),
    ]);

    const emailEnableRef = ref(null);
    const emailUpdateOldRef = ref(null);
    const emailUpdateRef = ref(null);

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
    });

    const phoneEnableResponse = {
      phone: "",
      code: "",
    };

    const phoneUpdateResponse = {
      oldPhone: "",
      oldCode: "",
      phone: "",
      code: "",
    };

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
        phone: phoneEnableResponse.code + phoneEnableResponse.phone,
        phoneCode: verifyCode.value,
      };
    });

    const emailUpdateInput = reactive({
      oldEmail: ref(""),
      oldEmailCode: oldVerifyCode.value,
      email: ref(""),
      emailCode: verifyCode.value,
    });

    const phoneUpdateInput = computed(() => {
      return {
        oldPhone: phoneUpdateResponse.oldCode + phoneUpdateResponse.oldPhone,
        oldPhoneCode: oldVerifyCode.value,
        phone: phoneUpdateResponse.code + phoneUpdateResponse.phone,
        phoneCode: verifyCode.value,
      };
    });

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
      emailRef,
      emailCodeRef,
      googleCodeRef,
      passwordRef,
      confirmPassRef,
      emailRule,
      emailCodeRule,
      passwordRule,
      confirmpassRule,
      googleCodeRule,
      oldPassRef,
      oldPasswordRule,
      locale,
      password,
      emailEnableDialog,
      phoneEnableDialog,
      phoneUpdateDialog,
      emailUpdateDialog,
      emailUpdateInput,
      phoneUpdateInput,
      emailEnableInput,
      phoneEnableInput,
      phoneEnableResponse,
      phoneUpdateResponse,
      emailEnableRef,
      emailUpdateOldRef,
      emailUpdateRef,
      verifyCode,
      oldVerifyCode,
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

  computed: {
    enabledEmail: function () {
      if (this.user.info.UserBasicInfo.EmailAddress !== "") {
        return true;
      } else {
        return false;
      }
    },

    enabledMobile: function () {
      if (this.user.info.UserBasicInfo.PhoneNumber !== "") {
        return true;
      } else {
        return false;
      }
    },

    enabledID: function () {
      return false;
    },
  },

  methods: {
    onChangePassword: function () {
      this.emailRef.validate();
      this.emailCodeRef.validate();
      this.googleCodeRef.validate();
      this.oldPassRef.validate();
      this.passwordRef.validate();
      this.confirmPassRef.validate();

      if (
        this.emailRef.hasError ||
        this.emailCodeRef.hasError ||
        this.googleCodeRef.hasError ||
        this.oldPassRef.hasError ||
        this.passwordRef.hasError ||
        this.confirmPassRef.hasError
      ) {
        return;
      }

      var self = this;

      if (
        this.changePasswordInput.password !==
        this.changePasswordInput.confirmPassword
      ) {
        fail(undefined, self.$t("Register.ConfirmInputWarning2"), "");
        return;
      }

      var password = sha256Password(this.changePasswordInput.password);
      var oldPassword = sha256Password(this.changePasswordInput.old);
      api
        .post("/user-management/v1/change/password", {
          OldPassword: oldPassword,
          Password: password,
          Email: self.changePasswordInput.email,
          EmailVerifyCode: self.changePasswordInput.emailCode,
          GoogleVerifyCode: self.changePasswordInput.googleCode,
        })
        .then((resp) => {
          success(undefined, self.$t("Notify.ChangePassword.Success"));
          self.changePassword = false;
          self.q.cookies.remove("UserID");
          self.q.cookies.remove("AppSession");
          self.$router.push("/login");
          return;
        })
        .catch((error) => {
          fail(undefined, self.$t("Notify.ChangePassword.Fail2"), error);
          return;
        });
    },

    submitLoginVerify: function () {
      var self = this;
      var appid = this.q.cookies.get("AppID");
      var userid = this.q.cookies.get("UserID");

      api
        .post("/application-management/v1/set/ga/login", {
          AppID: appid,
          UserID: userid,
          set: self.userGALogin,
        })
        .then((resp) => {
          success(undefined, self.$t("Notify.SubmitLoginVerify.Success"));
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

      var self = this;
      api
        .post("/user-management/v1/update/user", {
          AppID: appid,
          UserID: userid,
          Info: self.user.info.UserBasicInfo,
        })
        .then((resp) => {
          success(undefined, self.$t("Notify.ChangeUserInfo.Success"));
        })
        .catch((error) => {
          fail(undefined, self.$t("Notify.ChangeUserInfo.Fail"), error);
        });
    },

    onGoogleVerificationBtnClick: function () {
      this.openGaVerify = true;
      var self = this;
      var username =
        "(Procyon:" + this.user.info.UserBasicInfo.EmailAddress + ")";
      api
        .post("verification-door/v1/get/qrcode/url", {
          Username: username,
        })
        .then((resp) => {
          self.userGoogleImg = resp.data.Info;
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
            success(undefined, "successfully set user google verify");
            this.enableGoogleAuthentication = true;
          })
          .catch((error) => {
            fail(undefined, "fail to set user google verify", error);
          });
        this.visible = false;
        this.openGaVerify = false;
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

    sendCode: function () {
      this.emailRef.validate();
      if (this.emailRef.hasError) {
        return;
      }

      var notif = waiting(this.$t("Notify.SendCode.WaitSend"));
      var msg =
        this.$t("Notify.SendCode.SendTo") +
        " " +
        this.changePasswordInput.email +
        ", " +
        this.$t("Notify.SendCode.CheckEmail");
      var failToSend = this.$t("Notify.SendCode.Fail");

      var thiz = this;
      api
        .post("/verification-door/v1/send/email", {
          Email: thiz.changePasswordInput.email,
          Lang: thiz.locale,
        })
        .then(function (resp) {
          success(notif, msg);
        })
        .catch(function (error) {
          fail(notif, failToSend, error);
        });
    },

    onEnableEmail: function () {
      this.emailEnableRef.validate();
      if (this.emailEnableRef.hasError) {
        return;
      }

      if (this.emailEnableInput.emailCode === "") {
        fail(undefined, "please input your verify code", "");
        return;
      }

      var self = this;

      api
        .post("/user-management/v1/bind/email", {
          EmailAddress: self.emailEnableInput.email,
          Code: self.emailEnableInput.emailCode,
        })
        .then((resp) => {
          success(undefined, "successfully enable email address");
          self.verifyCode = "";
          self.emailEnableDialog = false;
        })
        .catch((error) => {
          fail(undefined, "fail to enable email address", error);
        });
    },

    onEnablePhone: function () {
      if (this.phoneEnableInput.phone === "") {
        fail(undefined, "please input your phone number");
        return;
      }

      if (this.phoneEnableInput.phoneCode === "") {
        fail(undefined, "please input your verify code");
        return;
      }

      var self = this;
      api
        .post("/user-management/v1/bind/phone", {
          PhoneNumber: self.phoneEnableInput.phone,
          Code: self.phoneEnableInput.phoneCode,
        })
        .then((resp) => {
          success(undefined, "successfully enable email address");
          self.verifyCode = "";
          self.emailEnableDialog = false;
        })
        .catch((error) => {
          fail(undefined, "fail to enable email address", error);
        });
    },

    onUpdateEmail: function () {
      this.emailUpdateOldRef.validate();
      this.emailUpdateRef.validate();
      if (this.emailUpdateOldRef.hasError || this.emailUpdateRef.hasError) {
        return;
      }

      if (
        this.emailUpdateInput.oldEmailCode === "" ||
        this.emailUpdateInput.emailCode === ""
      ) {
        fail(undefined, "please input your verify code");
        return;
      }

      api
        .post("/user-management/v1/update/user/email", {
          OldEmail: self.emailUpdateInput.oldEmail,
          OldCode: self.emailUpdateInput.oldEmailCode,
          NewEmail: self.emailUpdateInput.email,
          NewCode: self.emailUpdateInput.code,
        })
        .then((resp) => {
          success(undefined, "successfully update user email address");
          self.verifyCode = "";
          self.oldVerifyCode = "";
          self.emailUpdateDialog = false;
        })
        .catch((error) => {
          fail(undefined, "fail to update email address:", error);
        });
    },

    onUpdatePhone: function () {
      if (this.phoneUpdateInput.oldPhone === "") {
        fail(undefined, "please input your old phone number");
        return;
      }

      if (this.phoneUpdateInput.phone === "") {
        fail(undefined, "please input your phone number");
        return;
      }

      if (
        this.phoneUpdateInput.oldPhoneCode === "" ||
        this.phoneUpdateInput.phoneCode === ""
      ) {
        fail(undefined, "please input your verify code");
        return;
      }

      var self = this;

      api
        .post("/user-management/v1/update/user/phone", {
          OldPhone: self.phoneUpdateInput.oldPhone,
          OldCode: self.phoneUpdateInput.oldPhoneCode,
          NewPhone: self.phoneUpdateInput.phone,
          NewCode: self.phoneUpdateInput.phoneCode,
        })
        .then((resp) => {
          success(undefined, "successfully update user phone");
          self.verifyCode = "";
          self.oldVerifyCode = "";
          self.phoneUpdateDialog = false;
        })
        .catch((error) => {
          fail(undefined, "fail to update phone number: ", error);
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
</style>
