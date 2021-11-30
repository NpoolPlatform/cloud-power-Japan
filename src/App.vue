<template>
  <div class="main-body">
    <router-view />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router'
import { api } from './boot/axios';
import { fail } from './notify/notify';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'App',
  setup () {
    const q = useQuasar()
    const $store = useStore()
    const { locale } = useI18n({ useScope: 'global' })
    const lang = computed({
      set: val => {
        $store.commit('lang/updateLang', val)
      }
    })

    const user = computed({
      get: () => $store.state.user.user,
      set: val => {
        $store.commit('user/updateUserInfo', val)
      }
    })

    const open = computed({
      get: () => $store.state.router.router.open,
      set: val => {
        $store.commit('router/setOpenSide', val)
      }
    })

    const router = useRouter()
    const path = computed({
      get: () => router.currentRoute.value.path,
    })
    return {
      q,
      user,
      path,
      open,
      locale,
      lang,
    }
  },

  watch: {
    path: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        if (n === '/wallet' || n === '/account' || n === '/order') {
          this.open = true
        } else {
          this.open = false
        }
      },
    }
  },

  created: function () {
    var appID = 'ff2c5d50-be56-413e-aba5-9c7ad888a769'
    this.q.cookies.set('AppID', appID)

    var language = localStorage.getItem('locale') || window.navigator.language.toLowerCase() || 'ja_JP'
    if (language.indexOf('zh') !== -1) {
      this.locale = 'ja_JP'
      this.lang = 'ja_JP'
    } else if (language.indexOf('en') !== -1) {
      this.locale = 'en_US'
      this.lang = 'en_US'
    } else {
      this.locale = 'ja_JP'
      this.lang = 'ja_JP'
    }

    var flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if (flag) {
      this.$router.push('/warning')
    }
  },

  mounted: function () {
    var session = this.q.cookies.get('AppSession')
    var userid = this.q.cookies.get('UserID')
    var sessionCondition = session === '' || session === null || session === undefined
    var useridCondition = userid === '' || userid === null || userid === undefined
    if (sessionCondition || useridCondition) {
      if (this.path === '/order' || this.path === '/wallet' || this.path === '/account') {
        this.$router.push('/')
      }
      return
    }

    if (!this.user.logined) {
      this.getUserInfo()
      return
    }
  },

  methods: {
    getUserInfo: function () {
      let self = this
      var appid = this.q.cookies.get('AppID')
      var userid = this.q.cookies.get('UserID')
      var failToGetUserinfo = this.$t('Notify.User.Fail')
      api.post('/user-management/v1/get/user/details', {
        AppID: appid,
        UserID: userid,
      }).then(resp => {
        self.user = {
          logined: true,
          info: resp.data.Info,
        }
      }).catch(error => {
        fail(undefined, failToGetUserinfo, error)
        self.$router.push('/')
      })
    },
  },
})
</script>

<style scoped>
.main-body {
  background-image: url("./assets/procyon-logo-opacity0.025.svg");
  background-position: 90% -360px;
  background-repeat: no-repeat;
  background-size: 800px;
  display: block;
  top: 100;
  right: 0;
  height: 100%;
  width: 100%;
}
</style>