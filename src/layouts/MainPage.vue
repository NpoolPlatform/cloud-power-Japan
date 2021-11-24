<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="page-header" :style="toggle">
      <div class="header-left">
        <router-link :to="{ path: '/' }">
          <q-img :src="url" class="header-title"></q-img>
        </router-link>
        <div v-if="drawerOpen" class="hr"></div>
      </div>

      <div class="header-right">
        <a class="nav-link" @click="goTo()">{{ $t('Header.Home') }}</a>
        <a class="nav-link" href>{{ $t('Header.Services') }}</a>
        <a class="nav-link" href>{{ $t('Header.About') }}</a>
        <a class="nav-link" href>{{ $t('Header.Contact') }}</a>
        <q-btn class="alt" @click="signIn">{{ $t('Header.Signin') }}</q-btn>
      </div>
    </q-header>

    <q-drawer
      style="background: linear-gradient(to bottom right, #1f293a 0, #23292b 100%); box-shadow: 0px 0px 60px 15px #051319; text-align: center;"
      class="drawer-style text-white"
      width="200"
      v-model="open"
      side="left"
      bordered
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
        <a href class="drawer-item">
          <q-img :src="accountImg" class="drawer-item-img"></q-img>
          <span class="drawer-item-span">{{ $t('Drawer.Account') }}</span>
        </a>
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
                <a class="footer-link">{{ $t('Footer.Second.Home') }}</a>
                <a class="footer-link">{{ $t('Footer.Second.Products') }}</a>
                <a class="footer-link">{{ $t('Footer.Second.WhySpacemesh') }}</a>
                <a class="footer-link">{{ $t('Footer.Second.WhyProcyon') }}</a>
              </div>
            </div>
            <div class="content-items">
              <h4>{{ $t('Footer.Third.Title') }}</h4>
              <div class="item-links">
                <a class="footer-link">{{ $t('Footer.Third.Faqs') }}</a>
                <a class="footer-link">{{ $t('Footer.Third.Support') }}</a>
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
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: "MainPage",
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const leftDrawerOpen = ref(true)
    const toggle = ref("background: linear-gradient(to bottom right, #1f293a 0, #23292b 100%) no-repeat; background-size: 200px; border-bottom: 240px #a1d0d0;")

    return {
      url: require('/src/assets/procyon-light.svg'),
      locale: 'en-US',
      leftDrawerOpen,
      toggle,
    }
  },

  data () {
    return {
      miningImg: require('/src/assets/icon-mining.svg'),
      walletImg: require('/src/assets/icon-wallet.svg'),
      accountImg: require('/src/assets/icon-account.svg'),
      open: this.leftDrawerOpen,
      drawerOpen: this.leftDrawerOpen,
    }
  },

  computed: {},

  methods: {
    signIn: function () {
      this.$router.push('/login')
    },
    goTo: function () {
      this.$router.push({
        path: '#why-procyon'
      })
    },
  },
})
</script>

<style scoped src="../css/main-style.css"></style>
<style scoped src="../css/general.css"></style>