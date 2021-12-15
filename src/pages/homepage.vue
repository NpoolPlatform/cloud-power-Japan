<template>
  <div id="main">
    <div class="content">
      <div id="content-title">
        <div class="title-1">{{ $t("Homepage.Title.Title") }}</div>
        <div class="title-2">{{ $t("Homepage.Title.Subtitle") }}</div>
        <div class="btn-list">
          <q-btn
            v-if="!logined"
            @click="$router.push('/emailregister')"
            class="btn-register"
            style="width: 175px; text-transform: unset"
            >{{ $t("Homepage.Title.Register") }}</q-btn
          >
        </div>
      </div>

      <div class="content-item2">
        <div class="content-item2-title">
          {{ $t("Homepage.Content.Title") }}
        </div>
      </div>

      <div class="product">
        <q-card
          class="product-card"
          v-for="(good, index) in myGoods"
          :key="index"
        >
          <q-card-section class="card-header">
            <q-img :src="url" class="header-img"></q-img>
            <span class="header-title">{{ good.Title }}</span>
          </q-card-section>

          <q-card-section class="product-price">
            <span>{{ good.Price }}</span
            >USDT / TB
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{
              $t("Homepage.Content.DailyMiningRewardsLabel")
            }}</span>
            <span class="line-value"
              >*{{ $t("Homepage.Content.DailyMiningRewardsValue") }}</span
            >
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{
              $t("Homepage.Content.ServicePeriodLabel")
            }}</span>
            <span class="line-value"
              >{{ good.DurationDays }}
              {{ $t("Homepage.Content.ServicePeriodValue") }}</span
            >
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{
              $t("Homepage.Content.TechnicalServiceFeeLabel")
            }}</span>
            <span class="line-value">20%</span>
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{
              $t("Homepage.Content.MaintenanceFeeLabel")
            }}</span>
            <span class="line-value"
              >* / {{ $t("Homepage.Content.MaintenanceFeeValue") }}</span
            >
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{
              $t("Homepage.Content.OrderEffectiveLabel")
            }}</span>
            <span class="line-value">*</span>
          </q-card-section>
          <q-btn disable color="grey" class="product-btn alt">{{
            $t("Homepage.Content.StartMining")
          }}</q-btn>
        </q-card>
      </div>
    </div>

    <div class="content">
      <h2 id="why-procyon">{{ $t("Homepage.Why.Title") }}</h2>

      <div class="columns-2">
        <div class="column-2">
          <p>
            {{ $t("Homepage.Why.Content1") }}
            <strong>{{ $t("Homepage.Why.Content2") }}</strong
            >{{ $t("Homepage.Why.Content3")
            }}<strong>{{ $t("Homepage.Why.Content4") }}</strong
            >{{ $t("Homepage.Why.Content4Comma")
            }}{{ $t("Homepage.Why.Content5") }}
          </p>
        </div>

        <div class="column-2">
          <p>
            {{ $t("Homepage.Why.Content6")
            }}<strong>{{ $t("Homepage.Why.Content7") }}</strong
            >{{ $t("Homepage.Why.Content8") }}{{ $t("Homepage.Why.Content9") }}
          </p>
        </div>
      </div>
    </div>

    <div class="feature">
      <div class="content">
        <div class="feature-content">
          <div class="feature-content-item">
            <q-img :src="imgVCBacking" class="feature-item-img"></q-img>
            <div class="feature-item-title">
              {{ $t("Homepage.Feature.VCBacking") }}
            </div>
            <p>{{ $t("Homepage.Feature.VCBackingContent") }}</p>
          </div>

          <div class="feature-content-item">
            <q-img :src="imgTopTeam" class="feature-item-img"></q-img>
            <div class="feature-item-title">
              {{ $t("Homepage.Feature.TopTeam") }}
            </div>
            <p>{{ $t("Homepage.Feature.TopTeamContent") }}</p>
          </div>

          <div class="feature-content-item">
            <q-img :src="imgTechnology" class="feature-item-img"></q-img>
            <div class="feature-item-title">
              {{ $t("Homepage.Feature.Technology") }}
            </div>
            <p>{{ $t("Homepage.Feature.TechnologyContent") }}</p>
          </div>
        </div>
      </div>

      <div class="hr"></div>
    </div>

    <div class="content">
      <div class="columns-1">
        <h2 id="why-procyon">{{ $t("Homepage.What.Title") }}</h2>
        <p>
          {{ $t("Homepage.What.Content1") }}
          <strong>{{ $t("Homepage.What.Content2") }}</strong
          >{{ $t("Homepage.What.Content2Comma") }}
        </p>
        <p>{{ $t("Homepage.What.Content3") }}</p>
        <ul>
          <li>1. {{ $t("Homepage.What.Content4") }}</li>
          <li>2. {{ $t("Homepage.What.Content5") }}</li>
        </ul>
        <p>
          {{ $t("Homepage.What.Content6") }}
          <strong>{{ $t("Homepage.What.Content7") }}</strong
          >{{ $t("Homepage.What.Content7Comma")
          }}{{ $t("Homepage.What.Content8")
          }}<strong>{{ $t("Homepage.What.Content88") }}</strong
          >{{ $t("Homepage.What.Content88Comma") }}
        </p>

        <p>
          {{ $t("Homepage.What.Content14") }}
          <strong>{{ $t("Homepage.What.Content15") }}</strong
          >{{ $t("Homepage.What.Content15Comma")
          }}{{ $t("Homepage.What.Content16") }}
        </p>

        <p>
          {{ $t("Homepage.What.Content9") }}
          <strong>{{ $t("Homepage.What.Content10") }}</strong
          >{{ $t("Homepage.What.Content10Comma")
          }}{{ $t("Homepage.What.Content11") }}
        </p>

        <p>{{ $t("Homepage.What.Content12") }}</p>

        <p>
          <em>{{ $t("Homepage.What.Content13") }}</em>
        </p>
      </div>
    </div>
    <div class="hr"></div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { api } from "src/boot/axios";
import { useStore } from "vuex";
import { fail } from "../notify/notify";
import mitt from "mitt";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "homepage",
  setup() {
    const $store = useStore();
    const goods = computed({
      get: () => $store.state.goods.goods,
      set: (val) => {
        $store.commit("goods/updateGoods", val);
      },
    });
    const { locale } = useI18n({ useScope: "global" });

    const logined = computed(() => $store.state.user.user.logined);

    return {
      goods,
      emitter: mitt(),
      locale,
      persistent: ref(false),
      show: ref(true),
      logined,
    };
  },

  data() {
    return {
      url: require("/src/assets/product-spacemesh.svg"),
      imgVCBacking: require("/src/assets/icon-vc-backing.svg"),
      imgTopTeam: require("/src/assets/icon-team.svg"),
      imgTechnology: require("/src/assets/icon-technology.svg"),
      myGoods: ref([]),
    };
  },

  created: function () {
    var flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (flag) {
      if (this.$router.currentRoute.value.path === "/") {
        this.$router.push("/warning");
      }
    }
    this.emitter.on("get_goods_list", this.onGetGoodsList);
    this.getGoodsList();
  },

  beforeUnmount: function () {
    this.emitter.off("get_goods_list");
  },

  // computed: {
  //   goodsList: function () {
  //     var goods = []
  //     for (let i = 0; i < 3 && i < this.myGoods.length; i++) {
  //       goods.push(this.myGoods[i])
  //     }
  //     for (let i = goods.length; i < 3 && goods.length > 0; i++) {
  //       goods.push(goods[i - goods.length])
  //     }
  //     return goods
  //   },
  // },

  methods: {
    onGetGoodsList: function (goods) {
      this.myGoods = goods;
      this.goods = this.myGoods;
    },

    getGoodsList: function () {
      var self = this;
      var failword = this.$t("Notify.Goods.Fail");
      var emiiter = this.emitter;

      api
        .post("/cloud-hashing-apis/v1/get/goods/detail", {})
        .then((resp) => {
          emiiter.emit("get_goods_list", resp.data.Details);
        })
        .catch((error) => {
          fail(undefined, failword, error);
          return;
        });
    },

    timestampToDate: function (timestamp) {
      var date = new Date(timestamp * 1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    },
  },
});
</script>

<style>
.warning-bk {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px;
  position: relative;
}
</style>

<style scoped src="../css/homepage-style.css"></style>
<style scoped>
.columns-2 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.column-2 {
  margin: 24px 2.5%;
  max-width: 45%;
}

.content p:not([class]) {
  font-size: 18px;
  font-weight: 300;
}

.content p:not([class]) em {
  background: linear-gradient(to left, #ff964a 0, #ffcc4a 50%);
  background-clip: border-box;
  font-weight: 500;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  -webkit-text-fill-color: transparent;
}

.content p:not([class]) strong {
  background: linear-gradient(to left, #ff964a 0, #ffcc4a 50%);
  background-clip: border-box;
  font-weight: 500;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  -webkit-text-fill-color: transparent;
}

.columns-1 {
  padding: 0 36px;
}
</style>
