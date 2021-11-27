<template>
  <div id="main">
    <div class="content">
      <div id="content-title">
        <div class="title-1">{{ $t('Homepage.Title.Title') }}</div>
        <div class="title-2">{{ $t('Homepage.Title.Subtitle') }}</div>
        <div class="btn-list">
          <q-btn
            @click="$router.push('/register')"
            class="btn-register"
          >{{ $t('Homepage.Title.Register') }}</q-btn>
        </div>
      </div>

      <div class="content-item2">
        <div class="content-item2-title">{{ $t('Homepage.Content.Title') }}</div>
      </div>

      <div class="product">
        <q-card class="product-card" v-for="(good, index) in goodsList" :key="index">
          <q-card-section class="card-header">
            <q-img :src="url" class="header-img"></q-img>
            <span class="header-title">{{ good.Title }}</span>
          </q-card-section>

          <q-card-section class="product-price">
            <span>{{ good.Price }}</span>USDT / TB
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.DailyMiningRewardsLabel') }}</span>
            <span class="line-value">*{{ $t('Homepage.Content.DailyMiningRewardsValue') }}</span>
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.ServicePeriodLabel') }}</span>
            <span
              class="line-value"
            >{{ good.DurationDays }} {{ $t('Homepage.Content.ServicePeriodValue') }}</span>
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.TechnicalServiceFeeLabel') }}</span>
            <span class="line-value">20%</span>
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.MaintenanceFeeLabel') }}</span>
            <span class="line-value">$0.05 / {{ $t('Homepage.Content.MaintenanceFeeValue') }}</span>
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.OrderEffectiveLabel') }}</span>
            <span class="line-value">{{ timestampToDate(good.DeliveryAt) }}</span>
          </q-card-section>
          <q-btn class="product-btn alt">{{ $t('Homepage.Content.StartMining') }}</q-btn>
        </q-card>
      </div>
    </div>

    <div class="content">
      <h2 id="why-procyon">{{ $t('Homepage.Why.Title') }}</h2>

      <div class="columns-2">
        <div class="column-2">
          <p>
            {{ $t('Homepage.Why.Content1') }}&nbsp;
            <strong>{{ $t('Homepage.Why.Content2') }}&nbsp;</strong>
            {{ $t('Homepage.Why.Content3') }}&nbsp;
            <strong>{{ $t('Homepage.Why.Content4') }}</strong>
            {{ $t('Homepage.Why.Content5') }}&nbsp;
          </p>
        </div>

        <div class="column-2">
          <p>
            {{ $t('Homepage.Why.Content6') }}&nbsp;
            <strong>{{ $t('Homepage.Why.Content7') }}&nbsp;</strong>
            {{ $t('Homepage.Why.Content8') }}&nbsp;
          </p>
        </div>
      </div>
    </div>

    <div class="feature">
      <div class="content">
        <div class="feature-content">
          <div class="feature-content-item">
            <q-img :src="imgVCBacking" class="feature-item-img"></q-img>
            <div class="feature-item-title">{{ $t('Homepage.Feature.VCBacking') }}</div>
            <p>{{ $t('Homepage.Feature.VCBackingContent') }}</p>
          </div>

          <div class="feature-content-item">
            <q-img :src="imgTopTeam" class="feature-item-img"></q-img>
            <div class="feature-item-title">{{ $t('Homepage.Feature.TopTeam') }}</div>
            <p>{{ $t('Homepage.Feature.TopTeamContent') }}</p>
          </div>

          <div class="feature-content-item">
            <q-img :src="imgTechnology" class="feature-item-img"></q-img>
            <div class="feature-item-title">{{ $t('Homepage.Feature.Technology') }}</div>
            <p>{{ $t('Homepage.Feature.TechnologyContent') }}</p>
          </div>
        </div>
      </div>

      <div class="hr"></div>
    </div>

    <div class="content">
      <div class="columns-1">
        <h2 id="why-procyon">{{ $t('Homepage.What.Title') }}</h2>
        <p>
          {{ $t('Homepage.What.Content1') }}
          <strong>{{ $t('Homepage.What.Content2') }}</strong>.
        </p>
        <p>{{ $t('Homepage.What.Content3') }}</p>
        <ul>
          <li>1. {{ $t('Homepage.What.Content4') }}</li>
          <li>2. {{ $t('Homepage.What.Content5') }}</li>
        </ul>
        <p>
          {{ $t('Homepage.What.Content6') }}
          <strong>{{ $t('Homepage.What.Content7') }}</strong>
          . {{ $t('Homepage.What.Content8') }}
        </p>

        <p>
          {{ $t('Homepage.What.Content9') }}
          <strong>{{ $t('Homepage.What.Content10') }}</strong>
          . {{ $t('Homepage.What.Content11') }}
        </p>

        <p>{{ $t('Homepage.What.Content12') }}</p>

        <p>
          <em>{{ $t('Homepage.What.Content13') }}</em>
        </p>
      </div>
    </div>
    <div class="hr"></div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useStore } from 'vuex';
import { success, fail, waiting } from '../notify/notify'
import mitt from 'mitt'

export default defineComponent({
  name: 'homepage',
  setup () {
    const $store = useStore()
    const goods = computed({
      get: () => $store.state.goods.goods,
      set: val => {
        $store.commit('goods/updateGoods', val)
      }
    })

    return {
      goods,
      emitter: mitt(),
    }
  },

  data () {
    return {
      url: require('/src/assets/product-spacemesh.svg'),
      imgVCBacking: require('/src/assets/icon-vc-backing.svg'),
      imgTopTeam: require('/src/assets/icon-team.svg'),
      imgTechnology: require('/src/assets/icon-technology.svg'),
      products: [{
        productName: 'Spacemesh',
        productPrice: 400,
        dailyMiningRewards: 1,
        servocePeriod: 360,
        technicalServiceFee: '20%',
        maintenanceFee: 0.05,
        orderEffective: '2022/1/1',
      },
      {
        productName: 'Spacemesh',
        productPrice: 400,
        dailyMiningRewards: 1,
        servocePeriod: 360,
        technicalServiceFee: '20%',
        maintenanceFee: 0.05,
        orderEffective: '2022/1/1',
      },
      {
        productName: 'Spacemesh',
        productPrice: 400,
        dailyMiningRewards: 1,
        servocePeriod: 360,
        technicalServiceFee: '20%',
        maintenanceFee: 0.05,
        orderEffective: '2022/1/1',
      },],
      myGoods: ref([])
    }
  },

  created: function () {
    this.emitter.on('get_goods_list', this.onGetGoodsList)
    this.getGoodsList()
  },

  mounted: function () {
    // var self = this
    // var failword = this.$t('Notify.Goods.Fail')
    // const $store = useStore()

    // api.post('/cloud-hashing-apis/v1/get/goods/detail', {}).then(resp => {
    //   self.$nextTick(function () {
    //     $store.commit('goods/updateGoods', resp.data)
    //   })
    //   return
    // }).catch(error => {
    //   fail(undefined, failword, error)
    //   return
    // })
  },

  computed: {
    goodsList: function () {
      var goods = []
      for (let i = 0; i < 3 && i < this.myGoods.length; i++) {
        goods.push(this.myGoods[i])
      }
      for (let i = goods.length; i < 3; i++) {
        goods.push(goods[i - goods.length])
      }
      return goods
    },
  },

  methods: {
    onGetGoodsList: function (goods) {
      this.myGoods = goods
    },

    getGoodsList: function () {
      var self = this
      var failword = this.$t('Notify.Goods.Fail')
      var emiiter = this.emitter

      api.post('/cloud-hashing-apis/v1/get/goods/detail', {}).then(resp => {
        emiiter.emit('get_goods_list', resp.data.Details)
      }).catch(error => {
        fail(undefined, failword, error)
        return
      })
    },
    timestampToDate: function (timestamp) {
      var date = new Date(timestamp * 1000)
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      return Y + M + D
    },
  },

})
</script>

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
  line-height: 36px;
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