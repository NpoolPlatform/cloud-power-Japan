<template>
  <div id="robot"></div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['callback'],
  data () {
    return {
      siteKey: '6LdlXU4dAAAAAJz1WqVn2xkIwQrSH38x6tYRAD_m',
    }
  },

  mounted: function () {
    window.onloadCallback = this.onloadCallback
    var script = document.createElement("script")
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'
    document.head.appendChild(script);
  },

  methods: {
    onloadCallback: function () {
      let self = this
      window.grecaptcha.render("robot", {
        'sitekey': self.siteKey,
        'callback': self.callback,
        'expired-callback': self.expiredCallback,
        'error-callback': self.errorCallback,
      })
    },

    callback: function (resp) {
      this.$emit('callback', resp)
    },
    expiredCallback: function (resp) {
      this.$emit('callback', "expired")
    },
    errorCallback: function (resp) {
      this.$emit('callback', "error")
    },
  },
})
</script>

<style scoped>
</style>