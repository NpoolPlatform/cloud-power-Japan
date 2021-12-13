<template>
  <div>
    <div class="phone-code-style">
      <q-input
        class="register-input"
        style="font-size: 18px; text-align: center"
        filled
        bg-color="blue-grey-1"
        v-model="phoneNumber"
        :label="inputText"
        ref="phoneRef"
        lazy-rules
        :rules="phoneRule"
      >
        <template v-slot:prepend>
          <q-select
            class="select-input"
            filled
            bg-color="blue-grey-1"
            v-model="countryCode"
            :options="myCountries"
            color="black"
            options-selected-class="text-deep-orange"
            popup-content-class="popup-content-style"
            @popup-hide="myCountries = countries"
          >
            <template v-slot:before-options>
              <div>
                <q-input
                  bg-color="white"
                  filled
                  v-model="searchInput"
                ></q-input>
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
        </template>
      </q-input>
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
.search-input-style {
  position: fixed;
  top: 0;
}
</style>

<style>
.popup-content-style {
  height: auto;
  max-height: 300px;
  width: 250px;
  color: black;
}

.select-input {
  width: 120px;
  font-size: 18px;
  background: none;
}

.phone-code-style {
  display: flex;
}

.input-phone-style {
  width: 300px;
}

.register-input {
  border-radius: 12px;
  color: #27424c;
  font-size: 14px;
  width: 100%;
  margin: 10px 0;
}

/* .q-field--labeled .q-field__native {
  padding-top: 12px;
} */
</style>
