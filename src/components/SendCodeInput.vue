<template>
  <div>
    <q-input
      ref="codeRef"
      class="register-input"
      outlined
      bg-color="blue-grey-1"
      v-model="verifyCode"
      :label="$t('Register.VerifyCodeInput')"
      lazy-rules
      :rules="codeRule"
    >
      <template v-slot:append>
        <div v-if="!refresh">
          <q-btn
            v-if="props.verifyType === 'email'"
            flat
            rounded
            :disable="sendDisable"
            @click="sendEmailCode"
          >
            {{ sendCodeText }}</q-btn
          >
          <q-btn
            v-if="props.verifyType === 'phone'"
            flat
            rounded
            :disable="sendDisable"
            @click="sendPhoneCode"
          >
            {{ sendCodeText }}</q-btn
          >
        </div>
      </template>
    </q-input>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { ref, computed, defineComponent, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { success, fail, waiting } from "../notify/notify";

export default defineComponent({
  name: "SendCodeInput",
  props: {
    verifyParam: String,
    verifyType: String,
    username: String,
    codeType: String,
  },
  setup(props) {
    const { t, $t, locale } = useI18n({ useScope: "global" });
    const codeRef = ref(null);
    const codeRule = ref([
      (val) =>
        (val && val.length > 0) || t("Register.EmailVerifyCodeInpuWarning"),
    ]);

    const $store = useStore();

    const refresh = computed({
      get: () => $store.state.verify.refresh,
      set: (val) => {
        $store.commit("verify/updateRefresh", val);
      },
    });

    const isGetting = ref(false);
    const sendDisable = ref(false);
    const count = ref(60);
    const sendCodeText = computed(() => {
      return t("Register.SendCode");
    });

    var verifyCode = ref("");
    switch (props.codeType) {
      case "old":
        verifyCode = computed({
          get: () => $store.state.verify.oldVerifyCode,
          set: (val) => {
            $store.commit("verify/updateOldVerifyCode", val);
          },
        });
        break;
      default:
        verifyCode = computed({
          get: () => $store.state.verify.verifyCode,
          set: (val) => {
            $store.commit("verify/updateVerifyCode", val);
          },
        });
        break;
    }

    const sendEmailCode = () => {
      var sendText = t("Register.SendCode");
      var notif = waiting(t("Notify.SendCode.Email.WaitSend"));
      var msg =
        t("Notify.SendCode.SendTo") +
        " " +
        props.verifyParam +
        ", " +
        t("Notify.SendCode.Email.Check");
      var failToSend = t("Notify.SendCode.Fail");

      api
        .post("/verification-door/v1/send/email", {
          Email: props.verifyParam,
          Username: props.username,
          Lang: locale.value,
        })
        .then(function (resp) {
          success(notif, msg);
          count.value = 60;
          var countDown = setInterval(() => {
            if (count.value < 1) {
              isGetting.value = false;
              sendDisable.value = false;
              count.value = 60;
              sendCodeText.value = sendText;
              clearInterval(countDown);
            } else {
              isGetting.value = true;
              sendDisable.value = true;
              sendCodeText.value = count.value + "s";
              count.value--;
            }
          }, 1000);
        })
        .catch(function (error) {
          fail(notif, failToSend, error);
        });
    };

    const sendPhoneCode = () => {
      codeRef.value.validate();
      if (codeRef.value.hasError) {
        return;
      }
      var sendText = $t("Register.SendCode");
      var notif = waiting($t("Notify.SendCode.Phone.WaitSend"));
      var msg =
        $t("Notify.SendCode.SendTo") +
        " " +
        props.verifyParam +
        ", " +
        $t("Notify.SendCode.Phone.Check");
      var failToSend = $t("Notify.SendCode.Fail");

      api
        .post("/verification-door/v1/send/sms", {
          Phone: props.verifyParam,
          Lang: locale.value,
        })
        .then(function (resp) {
          success(notif, msg);
          count.value = 60;
          var countDown = setInterval(() => {
            if (count.value < 1) {
              isGetting.value = false;
              sendDisable.value = false;
              count.value = 60;
              sendCodeText.value = sendText;
              clearInterval(countDown);
            } else {
              isGetting.value = true;
              sendDisable.value = true;
              sendCodeText.value = count.value + "s";
              count.value--;
            }
          }, 1000);
        })
        .catch(function (error) {
          fail(notif, failToSend, error);
        });
    };

    return {
      codeRef,
      codeRule,
      refresh,
      isGetting,
      sendDisable,
      count,
      sendCodeText,
      verifyCode,
      sendEmailCode,
      sendPhoneCode,
      props,
    };
  },

  watch: {
    refresh: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        var self = this;
        if (n) {
          setTimeout(() => {
            self.refresh = false;
          }, 500);
        }
      },
    },
  },
});
</script>

<style scoped>
.register-input {
  border-radius: 12px;
  color: #27424c;
  font-size: 14px;
  width: 100%;
  margin: 10px 0;
}
</style>
