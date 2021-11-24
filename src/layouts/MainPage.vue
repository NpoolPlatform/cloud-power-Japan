<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="page-header">
      <div class="header-left">
        <q-img :src="url" class="header-title"></q-img>
      </div>

      <div class="header-right">
        <a class="nav-link" @click="goTo()">{{ $t('Header.Why') }}</a>
        <a class="nav-link" href>{{ $t('Header.Products') }}</a>
        <a class="nav-link" href>{{ $t('Header.Support') }}</a>
        <q-btn class="alt" @click="signIn">{{ $t('Header.Signin') }}</q-btn>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="page-footer" style="position: fixed; bottom: 0;">
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
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: "MainPage",
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      url: require('/src/assets/procyon-light.svg'),
      locale: 'en-US',
    }
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
  },
})
</script>

<style scoped src="../css/main-style.css"></style>
<style scoped src="../css/general.css"></style>