<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="page-header" :style="toggle">
      <div class="header-left">
        <router-link :to="{ path: '/' }">
          <q-img :src="url" class="header-title"></q-img>
        </router-link>
        <div v-if="openSide" class="hr"></div>
      </div>

      <div class="header-right">
        <router-link class="nav-link" :to="{ path: '/' }">{{ $t('Header.Home') }}</router-link>
        <router-link class="nav-link" :to="{ path: '/' }">{{ $t('Header.Blog') }}</router-link>
        <router-link class="nav-link" :to="{ path: '/faq' }">{{ $t('Header.Support') }}</router-link>
        <a class="nav-link" href="mailto:support@procyon.vip">{{ $t('Header.Contact') }}</a>
        <q-select
          hide-dropdown-icon
          class="select-style"
          standout="bg-teal text-white"
          style="background: none;"
          v-model="language"
          :options="languages"
        />
        <q-btn
          class="alt"
          disable
          style="margin-right: 10px; background-color: grey; border: none;"
          flat
          @click="$router.push('/register')"
        >{{ $t('Register.Register') }}</q-btn>
        <q-btn
          v-if="!logined"
          class="alt"
          flat
          @click="$router.push('/login')"
        >{{ $t('Header.Signin') }}</q-btn>
        <div class="avator-box">
          <q-img v-if="logined" class="avator" :src="userImg" @click="showList = !showList"></q-img>

          <div class="list-box" v-if="showList">
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="$router.push('/account'); showList = !showList"
              >
                <q-item-section>
                  <q-item-label>{{ $t('Drawer.Account') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="$router.push('/order'); showList = !showList">
                <q-item-section>
                  <q-item-label>{{ $t('Drawer.Order') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="$router.push('/wallet'); showList = !showList"
              >
                <q-item-section>
                  <q-item-label>{{ $t('Drawer.Wallet') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label>{{ $t('Drawer.Logout') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </q-header>

    <q-drawer
      style="background: linear-gradient(to bottom right, #1f293a 0, #23292b 100%); box-shadow: 0px 0px 60px 15px #051319; text-align: center;"
      class="drawer-style text-white"
      :width="200"
      v-model="openSide"
    >
      <div class="drawer-items">
        <router-link href class="drawer-item" :to="{ path: '/order' }">
          <q-img :src="miningImg" class="drawer-item-img"></q-img>
          <span class="drawer-item-span">{{ $t('Drawer.Order') }}</span>
        </router-link>
        <router-link href class="drawer-item" :to="{ path: '/wallet' }">
          <q-img :src="walletImg" class="drawer-item-img"></q-img>
          <span class="drawer-item-span">{{ $t('Drawer.Wallet') }}</span>
        </router-link>
        <router-link href class="drawer-item" :to="{ path: '/account' }">
          <q-img :src="accountImg" class="drawer-item-img"></q-img>
          <span class="drawer-item-span">{{ $t('Drawer.Account') }}</span>
        </router-link>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="page-footer" style="position: absolute; bottom: 0;">
      <div class="footer-bg">
        <div class="footer-content">
          <div class="content-4">
            <div class="content-items">
              <q-img :src="url" class="content-logo"></q-img>
              <div class="content-h1" style="font-size: 22px">{{ $t('Footer.First.Title') }}</div>
              <div class="content-h4">{{ $t('Footer.First.Content') }}</div>
            </div>
            <div class="content-items">
              <h4>{{ $t('Footer.Second.Title') }}</h4>
              <div class="item-links">
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/' }"
                >{{ $t('Footer.Second.Home') }}</router-link>
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/' }"
                >{{ $t('Footer.Second.Products') }}</router-link>
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/' }"
                >{{ $t('Footer.Second.Blog') }}</router-link>
              </div>
            </div>
            <div class="content-items">
              <h4>{{ $t('Footer.Third.Title') }}</h4>
              <div class="item-links">
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/faq' }"
                >{{ $t('Footer.Third.Faqs') }} & {{ $t('Footer.Third.Support') }}</router-link>
                <router-link class="footer-link nav-link" :to="{ path: '/faq' }"></router-link>
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/legal' }"
                >{{ $t('Footer.Third.Legal') }}</router-link>
              </div>
            </div>
            <div class="content-items">
              <h4>{{ $t('Footer.Forth.Title') }}</h4>
              <div class="button-group">
                <q-btn-toggle
                  v-model="locale"
                  push
                  glossy
                  toggle-color="orange-9"
                  :options="[
                    { label: $t('Footer.Forth.En'), value: 'en-US' },
                    { label: $t('Footer.Forth.Jp'), value: 'jp' },
                  ]"
                />
              </div>
            </div>
          </div>
          <p class="copyright">© 2021 PRCN Technology Ltd.</p>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { api } from 'src/boot/axios';
import { fail, success } from 'src/notify/notify';
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex'

export default defineComponent({
  name: "MainPage",
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const $store = useStore()

    const openSide = computed({
      get: () => $store.state.router.router.open,
      set: val => {
        $store.commit('router/setOpenSide', val)
      }
    })

    const logined = computed({
      get: () => $store.state.user.user.logined
    })
    return {
      locale,
      openSide,
      logined,
    }
  },

  created: function () {
    this.locale = 'jp'
    this.language = 'jp'
  },

  data () {
    return {
      url: require('/src/assets/procyon-light.svg'),
      miningImg: require('/src/assets/icon-mining.svg'),
      walletImg: require('/src/assets/icon-wallet.svg'),
      accountImg: require('/src/assets/icon-account.svg'),
      toggleStyle: 'background: linear-gradient(to bottom right, #1f293a 0, #23292b 100%) no-repeat; background-size: 200px; border-bottom: 240px #a1d0d0;',
      toggle: null,
      userImg: require('/src/assets/icon-user.svg'),
      showList: false,
      language: this.locale,
      languages: ['en-US', 'jp']
    }
  },

  watch: {
    openSide: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        if (n) {
          this.toggle = this.toggleStyle
        } else {
          this.toggle = null
        }
      },
    },

    logined: {
      deep: true,
      immediate: true,
      handler: function (n, o) {

      },
    },
  },

  methods: {
    logout: function () {
      var self = this
      var appSession = this.$q.cookies.get('AppSession')
      api.post('/login-door/v1/logout', {
        Session: appSession,
      }).then(resp => {
        success(undefined, self.$t('Notify.Logout.Success'))
        self.$q.cookies.remove('UserID')
        self.$router.push('/')
        location.reload()
      }).catch(error => {
        fail(undefined, self.$t('Notify.Logout.Fail'), error)
      })
    },
  },
})
</script>

<style scoped src="../css/main-style.css"></style>
<style scoped src="../css/general.css"></style>
<style>
.select-style .q-field__native,
.q-field__prefix,
.q-field__suffix {
  font-size: 18px;
  color: white;
}
</style>