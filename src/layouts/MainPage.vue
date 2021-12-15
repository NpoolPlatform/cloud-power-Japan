<template>
  <q-layout view="hHh lpR fFf">
    <div>
      <q-header reveal class="page-header" :style="toggle">
        <div class="header-left">
          <router-link :to="{ path: '/' }">
            <q-img :src="url" class="header-title"></q-img>
          </router-link>
          <div v-if="openSide" class="hr"></div>
        </div>

        <div class="header-right">
          <router-link class="nav-link" :to="{ path: '/' }">{{
            $t("Header.Home")
          }}</router-link>
          <a
            class="nav-link"
            href="https://procyon-vip.medium.com/"
            target="_blank"
            >{{ $t("Header.Blog") }}</a
          >
          <router-link class="nav-link" :to="{ path: '/faq' }">{{
            $t("Header.Support")
          }}</router-link>
          <a class="nav-link" href="mailto:support@procyon.vip">{{
            $t("Header.Contact")
          }}</a>
          <div class="button-group" style="margin-right: 10px">
            <q-btn-toggle
              v-model="locale"
              push
              glossy
              toggle-color="orange-9"
              @click="changeLang"
              :options="[
                { label: $t('Footer.Forth.En'), value: 'en-US' },
                { label: $t('Footer.Forth.Jp'), value: 'ja-JP' },
              ]"
            />
          </div>
          <q-btn
            class="btn-register"
            style="width: 140px; margin-right: 10px; text-transform: unset"
            flat
            @click="$router.push('/emailregister')"
            >{{ $t("Register.Register") }}</q-btn
          >
          <q-btn
            v-if="!logined"
            class="alt"
            flat
            @click="$router.push('/login')"
            >{{ $t("Header.Signin") }}</q-btn
          >
          <div class="avator-box" @click.stop>
            <q-img
              v-if="logined"
              class="avator"
              :src="userImg"
              @click="showList = !showList"
            ></q-img>

            <div class="list-box" v-if="showList">
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="
                    $router.push('/account');
                    showList = !showList;
                  "
                >
                  <q-item-section>
                    <q-item-label>{{ $t("Drawer.Account") }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="
                    $router.push('/order');
                    showList = !showList;
                  "
                >
                  <q-item-section>
                    <q-item-label>{{ $t("Drawer.Order") }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="
                    $router.push('/wallet');
                    showList = !showList;
                  "
                >
                  <q-item-section>
                    <q-item-label>{{ $t("Drawer.Wallet") }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  v-if="hasInvitationCode"
                  clickable
                  v-close-popup
                  @click="
                    $router.push('/invitation');
                    showList = !showList;
                  "
                >
                  <q-item-section>
                    <q-item-label>{{ $t("Drawer.Invitation") }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="logout">
                  <q-item-section>
                    <q-item-label>{{ $t("Drawer.Logout") }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-header>
    </div>

    <q-drawer
      style="
        background: linear-gradient(to bottom right, #1f293a 0, #23292b 100%);
        box-shadow: 0px 0px 60px 15px #051319;
        z-index: -1;
      "
      class="drawer-style text-white"
      :width="200"
      v-model="openSide"
    >
      <div class="drawer-items">
        <router-link href class="drawer-item" :to="{ path: '/account' }">
          <div class="row">
            <q-img :src="accountImg" class="drawer-item-img"></q-img>
            <p class="drawer-item-span">{{ $t("Drawer.Account") }}</p>
          </div>
        </router-link>
        <router-link href class="drawer-item" :to="{ path: '/order' }">
          <div class="row">
            <q-img :src="miningImg" class="drawer-item-img"></q-img>
            <span class="drawer-item-span">{{ $t("Drawer.Order") }}</span>
          </div>
        </router-link>
        <router-link href class="drawer-item" :to="{ path: '/wallet' }">
          <div class="row">
            <q-img :src="walletImg" class="drawer-item-img"></q-img>
            <span class="drawer-item-span">{{ $t("Drawer.Wallet") }}</span>
          </div>
        </router-link>
        <router-link
          href
          class="drawer-item"
          :to="{ path: '/invitation' }"
          v-if="hasInvitationCode"
        >
          <div class="row">
            <q-img :src="affiliatesImg" class="drawer-item-img"></q-img>
            <span class="drawer-item-span">{{ $t("Drawer.Invitation") }}</span>
          </div>
        </router-link>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="page-footer" style="position: absolute; bottom: 0">
      <div class="footer-bg">
        <div class="footer-content">
          <div class="content-4">
            <div class="content-items">
              <q-img :src="url" class="content-logo"></q-img>
              <div class="content-h1" style="font-size: 22px">
                {{ $t("Footer.First.Title") }}
              </div>
              <div class="content-h4">{{ $t("Footer.First.Content") }}</div>
            </div>

            <div class="content-items">
              <h4>{{ $t("Footer.Forth.Title") }}</h4>
              <div class="button-group">
                <q-btn-toggle
                  v-model="locale"
                  push
                  glossy
                  toggle-color="orange-9"
                  @click="changeLang"
                  :options="[
                    { label: $t('Footer.Forth.En'), value: 'en-US' },
                    { label: $t('Footer.Forth.Jp'), value: 'ja-JP' },
                  ]"
                />
              </div>
            </div>

            <div class="content-items">
              <h4>{{ $t("Footer.Second.Title") }}</h4>
              <div class="item-links">
                <router-link class="footer-link nav-link" :to="{ path: '/' }">{{
                  $t("Footer.Second.Home")
                }}</router-link>
                <router-link class="footer-link nav-link" :to="{ path: '/' }">{{
                  $t("Footer.Second.Products")
                }}</router-link>
                <a
                  class="footer-link nav-link"
                  href="https://procyon-vip.medium.com/"
                  target="_blank"
                  >{{ $t("Footer.Second.Blog") }}</a
                >
              </div>
            </div>

            <div class="content-items">
              <h4>{{ $t("Footer.Third.Title") }}</h4>
              <div class="item-links">
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/faq' }"
                  >{{ $t("Footer.Third.Faqs") }}</router-link
                >
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/faq' }"
                  >{{ $t("Footer.Third.Support") }}</router-link
                >
                <router-link
                  class="footer-link nav-link"
                  :to="{ path: '/legal' }"
                  >{{ $t("Footer.Third.Legal") }}</router-link
                >
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
import { api } from "src/boot/axios";
import { fail, success } from "src/notify/notify";
import { defineComponent, computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainPage",
  setup() {
    const { t, locale } = useI18n({ useScope: "global" });
    const $store = useStore();
    const q = useQuasar();

    const hasInvitationCode = computed({
      get: () => $store.state.verify.hasInvitationCode,
    });

    const openSide = computed({
      get: () => $store.state.router.router.open,
      set: (val) => {
        $store.commit("router/setOpenSide", val);
      },
    });

    const refresh = computed({
      get: () => $store.state.verify.refresh,
      set: (val) => {
        $store.commit("verify/updateRefresh", val);
      },
    });

    const changeLang = () => {
      // var msg = t("Loading.Msg");
      // q.loading.show({
      //   message: msg,
      //   html: true,
      // });
      // location.reload();
      // q.loading.hide();
      refresh.value = true;
    };

    const logined = computed({
      get: () => $store.state.user.user.logined,
      set: (val) => {
        $store.commit("user/updateUserLogined", val);
      },
    });

    const loginVerify = computed({
      get: () => $store.state.verify.loginVerify,
      set: (val) => {
        $store.commit("verify/updateLoginVerify", val);
      },
    });
    return {
      q,
      locale,
      openSide,
      logined,
      changeLang,
      loginVerify,
      hasInvitationCode,
    };
  },

  data() {
    return {
      url: require("/src/assets/procyon-light.svg"),
      miningImg: require("/src/assets/icon-mining.svg"),
      walletImg: require("/src/assets/icon-wallet.svg"),
      accountImg: require("/src/assets/icon-account.svg"),
      affiliatesImg: require("/src/assets/icon-affiliates.svg"),
      toggleStyle:
        "background: linear-gradient(to bottom right, #1f293a 0, #23292b 100%) no-repeat; background-size: 200px; border-bottom: 240px #a1d0d0;",
      toggle: null,
      userImg: require("/src/assets/icon-user.svg"),
      showList: false,
    };
  },

  mounted: function () {
    document.addEventListener("click", this.bodyCloseSelected);
  },

  watch: {
    locale: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        var lang = this.q.cookies.get("lang");
        if (lang !== n) {
          this.q.cookies.set("lang", n);
        }
      },
    },
    openSide: {
      deep: true,
      immediate: true,
      handler: function (n, o) {
        if (n) {
          this.toggle = this.toggleStyle;
        } else {
          this.toggle = null;
        }
      },
    },

    logined: {
      deep: true,
      immediate: true,
      handler: function (n, o) {},
    },
  },

  beforeUnmount: function () {
    document.removeEventListener("click", this.bodyCloseSelected);
  },

  methods: {
    bodyCloseSelected: function () {
      this.showList = false;
    },

    logout: function () {
      var self = this;
      var appSession = this.$q.cookies.get("AppSession");
      api
        .post("/login-door/v1/logout", {
          Session: appSession,
        })
        .then((resp) => {
          success(undefined, self.$t("Notify.Logout.Success"));
          self.$q.cookies.remove("UserID");
          self.loginVerify = false;
          self.logined = false;
          self.$router.push("/");
        })
        .catch((error) => {
          fail(undefined, self.$t("Notify.Logout.Fail"), error);
        });
    },
  },
});
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

<style scoped>
.q-btn-group--glossy > .q-btn-item {
  background-image: linear-gradient(to bottom right, #6b787c 0, #3d4c52 100%);
}

.bg-orange-9 {
  background: linear-gradient(
    to bottom right,
    #ff964a 0,
    #ce5417 100%
  ) !important;
}
</style>
