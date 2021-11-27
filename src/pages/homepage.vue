<template>
  <div id="main">
    <div class="content">
      <div id="content-title">
        <div class="title-1">
          {{ $t('Homepage.Title.Title') }}
          <strong>&nbsp;Procyon</strong>
        </div>
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
        <q-card class="product-card" v-for="(product, index) in products" :key="index">
          <q-card-section class="card-header">
            <q-img :src="url" class="header-img"></q-img>
            <span class="header-title">{{ product.productName }}</span>
          </q-card-section>

          <q-card-section class="product-price">
            <span>{{ product.productPrice }}</span>USDT / TB
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.DailyMiningRewardsLabel') }}</span>
            <span
              class="line-value"
            >{{ product.dailyMiningRewards }}{{ $t('Homepage.Content.DailyMiningRewardsValue') }}</span>
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.ServicePeriodLabel') }}</span>
            <span
              class="line-value"
            >{{ product.servocePeriod }} {{ $t('Homepage.Content.ServicePeriodValue') }}</span>
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.TechnicalServiceFeeLabel') }}</span>
            <span class="line-value">{{ product.technicalServiceFee }}</span>
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.MaintenanceFeeLabel') }}</span>
            <span
              class="line-value"
            >${{ product.maintenanceFee }} / {{ $t('Homepage.Content.MaintenanceFeeValue') }}</span>
          </q-card-section>
          <q-card-section class="product-line">
            <span class="line-label">{{ $t('Homepage.Content.OrderEffectiveLabel') }}</span>
            <span class="line-value">{{ product.orderEffective }}</span>
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
        <div class="feature-header">{{ $t('Homepage.Feature.Title') }}</div>
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
        <h2 id="why-procyon">What Is First-Batch Mining?</h2>
        <p>
          First-batch mining begins as soon as the mainnet goes live. This is possible because the first-batch of miners has already acquired hash power through the testnet prior to the launch of the mainnet. Once mainnet goes live these miners are the first to begin the mining process, achieving much
          <strong>greater ROI while the mining difficulty is low and the mining output is high</strong>.
        </p>
        <p>There are two core factors that affect a miner's ROI:</p>
        <ul>
          <li>1. Mining output</li>
          <li>2. Token price</li>
        </ul>
        <p>
          Mining output is directly related to the mining difficulty. The more miners, the greater the total network-wide hash power, the higher the mining difficulty, and the lower the mining output per miner. The total mineable supply is fixed, so the more hash power that flows into mining, the less mining output is released per unit (TB) of hash power.
          <strong>The mining output of the first-batch mining is usually much greater in comparison to regular mining</strong>. You can think of it like sharing a pizza. The more people share, the smaller each slice gets. For example, with Chia mining, the daily output during first-batch mining was equivalent to 1 year of mining at the rates just 2 months after mainnet launch.
        </p>

        <p>
          Token price is affected by dynamic market conditions. Typically the mainet launch happens simultaneously as
          <strong>listing on an exchange which is when the token experiences price discovery, possibly surging exponentially</strong>. To put it simply, the earlier you can mine, the more tokens you earn. And on top of that, you can sell your tokens at a higher price when the token is listed on exchanges, resulting in a better ROI.
        </p>

        <p>Participating in first-batch mining is only possible if you’re a professional miner or an experienced mining pool. Procyon is the premiere platform that aims to make first-batch mining accessible to general investors, delivering exceptional ROI.</p>

        <p>
          <em>Shoot for the stars with Procyon.</em>
        </p>
      </div>

      <div class="hr"></div>
    </div>
    <div class="hr"></div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { api } from 'src/boot/axios';
import { useStore } from 'vuex';
import { success, fail, waiting } from '../notify/notify'

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
    }
  },

  created: function () { },

  mounted: function () {
    var self = this
    var failword = this.$t('Notify.Goods.Fail')
    api.post('/cloud-hashing-apis/v1/get/goods/detail', {}).then(resp => {
      self.goods = resp.data
      return
    }).catch(error => {
      fail(undefined, failword, error)
      return
    })
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