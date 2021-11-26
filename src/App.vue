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

export default defineComponent({
  name: 'App',
  setup () {
    const q = useQuasar()
    const $store = useStore()

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
    }
  },

  watch: {
    path: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        if (n === '/wallet' || n === '/account' || n === '/mining') {
          this.open = true
        } else {
          this.open = false
        }

        var session = this.q.cookies.get('AppSession')
        var userid = this.q.cookies.get('UserID')
        var sessionCondition = session === '' || session === null || session === undefined
        var useridCondition = userid === '' || userid === null || userid === undefined
        if (sessionCondition || useridCondition) {
          this.$router.push('/')
          return
        }
      },
    }
  },

  created: function () {
    var appID = 'a750f653-4e53-42a9-b91a-5131f24da28b'
    this.q.cookies.set('AppID', appID)
  },

  mounted: function () {
    var session = this.q.cookies.get('AppSession')
    var userid = this.q.cookies.get('UserID')
    var sessionCondition = session === '' || session === null || session === undefined
    var useridCondition = userid === '' || userid === null || userid === undefined
    if (sessionCondition || useridCondition) {
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
      var failToGetUserinfo = 'fail to get user info'
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