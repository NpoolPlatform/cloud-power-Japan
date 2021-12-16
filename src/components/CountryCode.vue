<template>
  <div>
    <div>
      <div class="phone-code-style"></div>
      <div class="row phone-code-style phone-number">
        <q-input
          class="register-input phone-number"
          style="font-size: 18px; text-align: center"
          v-model="phoneNumber"
          :label="inputText"
          ref="phoneRef"
          lazy-rules
          :rules="phoneRule"
        >
        </q-input>

        <q-select
          v-model="countryCode"
          :options="myCountries"
          color="black"
          options-selected-class="text-deep-orange"
          popup-content-style="height: 300px; width: 250px;color: black;"
          @popup-hide="myCountries = countries"
          class="select-input"
        >
          <template v-slot:before-options>
            <div>
              <q-input bg-color="white" filled v-model="searchInput"></q-input>
            </div>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <!-- <q-item-section avatar>
            <q-icon :name="scope.opt.icon" />
          </q-item-section> -->
              <q-item-section>
                <q-item-label
                  >{{ scope.opt.name }}({{ scope.opt.label }})</q-item-label
                >
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<script>
import { parsePhone } from "src/utils/utils";
import { defineComponent, ref, computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { countries } from "../utils/coutrycode";

export default defineComponent({
  props: {
    inputType: String,
  },

  setup(props) {
    const { t } = useI18n({ useScope: "global" });
    const beNull = ref([]);
    const phoneRef = ref(null);

    const store = useStore();
    const phoneRule = ref([
      (val) => parsePhone(val) || t("Register.PhoneInputWarning"),
      (val) => !val.startsWith("0") || t("Register.PhoneInputWarning2"),
    ]);
    const inputText = ref(t("Account.Phone.Enable.PhoneInput"));

    switch (props.inputType) {
      case "old":
        inputText.value = t("Account.Phone.Update.OldPhoneInput");
        break;
      case "new":
        inputText.value = t("Account.Phone.Update.PhoneInput");
      default:
        break;
    }

    const type = ref(props.inputType);

    const countryCode = ref({
      name: "Japan",
      chinese_name: "日本",
      country_code: "JP",
      label: "+81",
    });

    return {
      countries,
      myCountries: ref(null),
      countryCode,
      searchInput: ref(null),
      phoneNumber: ref(null),
      beNull,
      phoneRef,
      phoneRule,
      inputText,
      store,
      type,
    };
  },

  watch: {
    searchInput: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        if (n === "" || n === null || n === undefined) {
          this.myCountries = this.countries;
          return;
        } else {
          const needle = n.toLowerCase();
          this.myCountries = this.countries.filter(
            (v) =>
              v.name.toLowerCase().indexOf(needle) > -1 ||
              v.label.indexOf(needle) > -1
          );
        }
        if (this.myCountries.length === 0) {
          this.myCountries = this.countries;
        }
      },
    },

    countryCode: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        var phone = n.label + this.phoneNumber;
        switch (this.type) {
          case "old":
            this.store.commit("verify/updateOldPhone", phone);
            break;
          case "new":
            this.store.commit("verify/updatePhone", phone);
            break;
          default:
            this.store.commit("verify/updatePhone", phone);
            break;
        }
      },
    },

    phoneNumber: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        var phone = this.countryCode.label + n;
        switch (this.type) {
          case "old":
            this.store.commit("verify/updateOldPhone", phone);
            break;
          case "new":
            this.store.commit("verify/updatePhone", phone);
            break;
          default:
            this.store.commit("verify/updatePhone", phone);
            break;
        }
      },
    },
  },

  methods: {},
});
</script>

<style scoped>
.phone-code-style {
  background-color: #eceff1;
  border-radius: 4px;
  height: 56px;
  margin-bottom: 30px;
}

.select-input {
  width: 120px;
  font-size: 18px;
  background: none;
  padding-left: 20px;
}

.popup-content-style {
  height: auto;
  max-height: 300px;
  width: 250px;
  color: black;
}

.input-phone-style {
  width: 300px;
}

.register-input {
  color: #27424c;
  font-size: 14px;
  width: 100%;
  padding-left: 120px;
  padding-right: 10px;
}

.phone-number {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
