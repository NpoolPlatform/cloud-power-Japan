<template>
  <div>
    <div class="content">
      <div class="title">{{ $t('Mining.Column1.Title') }}</div>

      <div class="earn-box">
        <div class="earn-box-item">
          <div>
            <span class="price">5000</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t('Mining.Column1.Total') }}</span>
        </div>

        <div class="earn-box-item">
          <div>
            <span class="price">5000</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t('Mining.Column1.Yesterday') }}</span>
        </div>

        <div class="earn-box-item">
          <div>
            <span class="price">5000</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t('Mining.Column1.Current') }}</span>
        </div>
      </div>

      <div class="hr-t"></div>

      <div class="title">{{ $t('Mining.Column2.Title') }}</div>
      <div class="dashboard">
        <div class="dashbord-title">
          <q-img class="mining-icon" :src="spacemeshImg"></q-img>SPACEMESH
        </div>
        <div class="mining-column">
          <div class="column-item">
            <span class="column-item-title">{{ $t('Mining.Column2.Earning') }}</span>
            <span class="column-item-number">10 SMH</span>
            <span class="additions">(5000 USDT)</span>
          </div>

          <div class="column-item">
            <span class="column-item-title">{{ $t('Mining.Column2.Last24') }}</span>
            <span class="column-item-number">.5 SMH</span>
            <span class="additions">(250 USDT)</span>
          </div>

          <div class="column-item">
            <span class="column-item-title">{{ $t('Mining.Column2.Capacity') }}</span>
            <span class="column-item-number">100 TB</span>
          </div>
        </div>

        <div class="detailed-summary">
          <div class="line">
            <span class="label">{{ $t('Mining.Column2.DailyOutput') }}</span>
            <span class="value">1 SMH</span>
          </div>

          <div class="line">
            <span class="label">{{ $t('Mining.Column2.TechnicalServiceFee') }}</span>
            <span class="value">.2 SMH (20%)</span>
          </div>

          <div class="line">
            <span class="label">{{ $t('Mining.Column2.NetDailyOutput') }}</span>
            <span class="value">.8 SMH</span>
          </div>

          <div class="line">
            <span class="label">{{ $t('Mining.Column2.TotalDaysMining') }}</span>
            <span class="value">150 days</span>
          </div>

          <div class="line">
            <span class="label">{{ $t('Mining.Column2.Hashrate') }}</span>
            <span class="value">950 MH/s</span>
          </div>

          <div class="line">
            <span class="label">{{ $t('Mining.Column2.NetworkDailyOutput') }}</span>
            <span class="value">1,000,000 SMH</span>
          </div>
        </div>
        <div class="bottom-button">
          <q-btn class="export">{{ $t('Mining.Column2.Export') }}</q-btn>
          <q-btn class="purchase">{{ $t('Mining.Column2.Purchase') }}</q-btn>
        </div>
      </div>

      <div class="add-mining">
        <img :src="plusImg" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { api } from 'src/boot/axios';
import { useStore } from 'vuex';
import { success, fail, waiting } from '../notify/notify'
import { useQuasar } from 'quasar';

export default defineComponent({
  setup () {
    const $store = useStore()
    const orders = computed({
      get: () => $store.state.orders.orders,
      set: val => {
        $store.commit('orders/updateOrders', val)
      }
    })

    const q = useQuasar()

    return {
      orders,
      q,
    }
  },

  data () {
    return {
      spacemeshImg: require('/src/assets/product-spacemesh.svg'),
      plusImg: require('/src/assets/icon-plus.svg')
    }
  },

  created: function () {
    var userid = this.q.cookies.get('UserID')
    if (userid === null || userid === undefined || userid === '') {
      fail(undefined, this.$t('Notify.User.PleaseLogin'), "")
      this.$router.push('/login')
    }
  },

  mounted: function () {
    var userid = this.q.cookies.get('UserID')
    var appid = this.q.cookies.get('AppID')
    var self = this

    api.post('/cloud-hashing-apis/v1/get/orders/detail/by/app/user', {
      AppID: appid,
      UserID: userid,
    }).then(resp => {
      self.orders = resp.data
    }).catch(error => {
      fail(undefined, 'fail to get user order details', error)
    })
  },
})
</script>


<style scoped src="../css/mining-style.css">
</style>
<style scoped>
</style>