<template>
  <div class="code">
    <input
      id="first"
      class="inputStyle"
      v-model="code[0]"
      style="border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;"
      type="text"
    />
    <input
      id="second"
      class="inputStyle"
      v-model="code[1]"
      style="border-left:1px solid #c6c6c6;"
      type="text"
    />
    <input
      id="third"
      class="inputStyle"
      v-model="code[2]"
      style="border-left:1px solid #c6c6c6;"
      type="text"
    />
    <input
      id="forth"
      class="inputStyle"
      v-model="code[3]"
      style="border-left:1px solid #c6c6c6;"
      type="text"
    />
    <input
      id="fifth"
      class="inputStyle"
      v-model="code[4]"
      style="border-left:1px solid #c6c6c6;"
      type="text"
    />
    <input
      id="sixth"
      class="inputStyle"
      v-model="code[5]"
      style="border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-left:1px solid #c6c6c6;"
      maxlength="1"
      type="text"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      smsCode: '',
      code: new Array(6),
      codeId: ['first', 'second', 'third', 'forth', 'fifth', 'sixth']
    }
  },
  watch: {
    code: function (newValue, oldValue) {
      console.log('newValue.length' + newValue.length)
      let tempValue = ''
      for (let i = 0; i < newValue.length; i++) {
        if (i == 6) {
          console.log(i)
          break
        }
        if (newValue[i]) {
          tempValue = tempValue + newValue[i]
        }
      }
      this.smsCode = tempValue
      console.log('smsCode ' + this.smsCode)
      let m = tempValue.split("")
      let location = 0
      for (let i = 0; i < newValue.length; i++) {
        if (m[i] && i < 6) {
          location++
          newValue[i] = m[i]
        } else {
          newValue[i] = ''
        }
      }
      // console.log(this.codeId[i])
      if (location < 1) {
        location = 1
      } else if (location > 6) {
        location = 6
      }
      document.getElementById(this.codeId[location - 1]).focus()
    }
  },
};
</script>

<style scoped>
.inputStyle {
  width: 20%;
  height: 100%;
  text-align: center;
  border: none;
}
</style>