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
        <router-link class="nav-link" :to="{ path: '/' }">{{ $t('Header.Contact') }}</router-link>
        <q-btn v-if="!logined" class="alt" flat @click="signIn">{{ $t('Header.Signin') }}</q-btn>
        <q-img v-if="logined" class="avator" :src="userImg" @click="onAvatorClick"></q-img>
      </div>
    </q-header>

    <q-drawer
      style="background: linear-gradient(to bottom right, #1f293a 0, #23292b 100%); box-shadow: 0px 0px 60px 15px #051319; text-align: center;"
      class="drawer-style text-white"
      :width="200"
      v-model="openSide"
    >
      <div class="drawer-items">
        <router-link href class="drawer-item" :to="{ path: '/mining' }">
          <q-img :src="miningImg" class="drawer-item-img"></q-img>
          <span class="drawer-item-span">{{ $t('Drawer.Mining') }}</span>
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
              <div class="content-h1">{{ $t('Footer.First.Title') }}</div>
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
                >{{ $t('Footer.Third.Faqs') }}</router-link>
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/faq' }"
                >{{ $t('Footer.Third.Support') }}</router-link>
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/legal' }"
                >{{ $t('Footer.Third.Legal') }}</router-link>
              </div>
            </div>
            <div class="content-items">
              <h4>{{ $t('Footer.Forth.Title') }}</h4>
              <div class="item-links">
                <div class="footer-div">
                  {{ $t('Footer.Forth.Address') }}:
                  <span style="font-weight: bolder;">#####</span>
                </div>
                <div class="footer-div">
                  {{ $t('Footer.Forth.Email') }}:
                  <span style="font-weight: bolder;">############</span>
                </div>
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
      locale: 'en-US',
      openSide,
      logined,
    }
  },

  mounted: function () {

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
        console.log("toggle is", this.toggle);
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
    signIn: function () {
      this.$router.push('/login')
    },
    goTo: function () {
      this.$router.push({
        path: '#why-procyon'
      })
    },

    onAvatorClick: function () {
      this.$router.push('/account')
    },
  },
})
</script>

<style scoped src="../css/main-style.css"></style>
<style scoped src="../css/general.css"></style>