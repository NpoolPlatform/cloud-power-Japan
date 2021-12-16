<template>
  <div>
    <div class="google-content" style="color: black">
      {{ $t("GoogleVerify.Content") }}
    </div>
    <div class="row-center captcha_input_wrapper">
      <input
        v-for="(item, index) in captchas"
        :key="index"
        v-model="item.num"
        :id="'captcha' + index"
        @input="inputFinash(index)"
        @focus="adjust(index)"
        @keydown="inputDirection(index)"
        class="captcha_input_box row-center"
        type="tel"
        maxlength="1"
      />
    </div>
    <q-inner-loading
      :showing="visible"
      :label="$t('GoogleVerify.PleaseWait')"
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script>
import { success, fail } from "../notify/notify";
import { api } from "src/boot/axios";

export default {
  emits: ["callback"],
  data() {
    return {
      // 当前输入框
      activeInput: 0,
      captchas: [
        { num: "" },
        { num: "" },
        { num: "" },
        { num: "" },
        { num: "" },
        { num: "" },
      ],
      visible: false,
    };
  },

  methods: {
    // 自动校准输入顺序
    adjust(index) {
      let dom = document.getElementById("captcha" + this.activeInput);
      if (index !== this.activeInput && dom) {
        dom.focus();
      }
    },
    // 控制前后方向
    inputDirection(index) {
      let val = this.captchas[index].num;
      // 回退键处理
      if (event.keyCode == 8 && val == "") {
        // 重新校准
        let dom = document.getElementById("captcha" + (index - 1));
        this.activeInput = index - 1;
        if (dom) dom.focus();
      }
      if (event.keyCode != 8 && val != "") {
        let dom = document.getElementById("captcha" + (index + 1));
        this.activeInput = index + 1;
        if (dom) dom.focus();
      }
    },
    // 输入框相互联动
    inputFinash(index) {
      let val = this.captchas[index].num;
      this.activeInput = val ? index + 1 : index - 1;
      let dom = document.getElementById("captcha" + this.activeInput);
      var self = this;
      if (dom) dom.focus();
      if (index == this.captchas.length - 1) {
        let code = this.captchas.map((x) => x.num).join("");
        if (code.length == 6) {
          self.visible = true;
          self.gaVerify(code);
        }
      }
    },

    gaVerify: function (code) {
      const fail1 = this.$t("Notify.GaVerify.CantNull");
      const fail2 = this.$t("Notify.GaVerify.Fail");
      const successMsg = this.$t("Notify.GaVerify.Success");
      var self = this;
      if (code === "") {
        fail(undefined, fail1, "");
        return;
      }

      api
        .post("/verification-door/v1/verify/google/auth", {
          Code: code,
        })
        .then((resp) => {
          success(undefined, successMsg);
          self.$emit("callback", "pass");
          self.visible = false;
        })
        .catch((error) => {
          self.visible = false;
          self.captchas = [
            { num: "" },
            { num: "" },
            { num: "" },
            { num: "" },
            { num: "" },
            { num: "" },
          ];
          fail(undefined, fail2, error);
          self.$emit("callback", "error");
        });
    },
  },
};
</script>

<style lang="scss">
.row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.captcha_input_wrapper {
  width: 100%;
}
.captcha_input_box {
  height: 100px;
  width: 60px;
  margin: 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid #dddddd;
  font-size: 32px;
  text-align: center;
  color: #1e243a;
}

.google-content {
  margin: 10px 20px;
  color: black;
  font-size: 18px;
}
</style>
