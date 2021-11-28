<template>
  <div v-if="visible">
    <div class="content">
      <div class="title">{{ $t('Mining.Column1.Title') }}</div>

      <div class="earn-box">
        <div class="earn-box-item">
          <div>
            <span class="price">{{ totalAmount }}</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t('Mining.Column1.Total') }}</span>
        </div>
      </div>

      <div class="hr-t"></div>

      <div class="title">{{ $t('Mining.Column2.Title') }}</div>

      <div class="dashboard" v-for="(order, index) in myOrders" :key="index">
        <div v-if="order.good != undefined">
          <div class="dashbord-title">
            <!-- <q-img class="mining-icon" :src="order.CoinInfo.Logo" v-if="order.CoinInfo.Logo !== ''"></q-img> -->
            <q-img class="mining-icon" :src="spacemeshImg"></q-img>
            {{ order.good.Title }}
          </div>
          <div class="mining-column">
            <div class="column-item">
              <span class="column-item-title">{{ $t('Mining.Column2.Earning') }}</span>
              <span
                class="column-item-number"
              >{{ order.order.Payment.Amount }} {{ order.order.Payment.CoinInfo.Unit }}</span>

              <span
                class="additions"
                style="text-decoration:line-through"
              >({{ order.good.PriceCurrency.Symbol }}{{ order.order.Units * order.good.Price }})</span>
            </div>

            <div class="column-item" v-if="order.order.Discount !== 0">
              <span class="column-item-title">{{ $t('Mining.Column2.Discount') }}</span>
              <span class="column-item-number">{{ order.order.Discount }}%</span>
              <span
                class="additions"
              >({{ order.good.PriceCurrency.Symbol }}{{ Number(order.order.Units) * Number(order.good.Price) - Number(order.order.Payment.Amount) }})</span>
            </div>

            <div class="column-item">
              <span class="column-item-title">{{ $t('Mining.Column2.Capacity') }}</span>
              <span
                class="column-item-number"
              >{{ order.good.UnitPower * order.order.Units }} {{ order.good.Unit }}</span>
            </div>
          </div>

          <div class="detailed-summary">
            <div class="line">
              <span class="label">{{ $t('Mining.Column2.TechnicalServiceFee') }}</span>
              <span class="value">20%</span>
            </div>

            <div class="line">
              <span class="label">{{ $t('Mining.Column2.TotalDaysMining') }}</span>
              <span class="value">{{ order.good.DurationDays }} Days</span>
            </div>
          </div>
          <div class="bottom-button">
            <q-btn class="export">{{ $t('Mining.Column2.Export') }}</q-btn>
            <q-btn class="purchase">{{ $t('Mining.Column2.Purchase') }}</q-btn>
          </div>
        </div>
      </div>

      <div class="add-mining">
        <img :src="plusImg" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
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

    const goods = computed({
      get: () => $store.state.goods.goods,
    })

    const q = useQuasar()

    return {
      orders,
      goods,
      q,
    }
  },

  data () {
    return {
      spacemeshImg: require('/src/assets/product-spacemesh.svg'),
      plusImg: require('/src/assets/icon-plus.svg'),
      myOrders: ref([]),
      orderGoods: ref({}),
      visible: false,
    }
  },

  computed: {
    totalAmount: function () {
      var amount = 0;
      this.myOrders.forEach(order => {
        amount += order.order.Payment.Amount
      })
      return amount
    },
  },

  created: function () {
    var userid = this.q.cookies.get('UserID')
    if (userid === null || userid === undefined || userid === '') {
      fail(undefined, this.$t('Notify.User.PleaseLogin'), "")
      this.$router.push('/login')
      return
    }

    var appid = this.q.cookies.get('AppID')
    var self = this

    api.post('/cloud-hashing-apis/v1/get/orders/detail/by/app/user', {
      AppID: appid,
      UserID: userid,
    }).then(resp => {
      self.orders = resp.data
      console.log("self.orders", self.orders.Details)
      resp.data.Details.forEach(order => {
        self.getOrderGood(order)
      });
    }).catch(error => {
      fail(undefined, 'fail to get user order details', error)
    })
  },

  methods: {
    getOrdersDetail: function () {
      var userid = this.q.cookies.get('UserID')
      var appid = this.q.cookies.get('AppID')
      var self = this

      api.post('/cloud-hashing-apis/v1/get/orders/detail/by/app/user', {
        AppID: appid,
        UserID: userid,
      }).then(resp => {
        self.orders = resp.data
        console.log(self.orders.Details);
      }).catch(error => {
        fail(undefined, 'fail to get user order details', error)
      })
    },

    getOrderGood: function (order) {
      var self = this
      api.post('/cloud-hashing-apis/v1/get/good/detail', {
        ID: order.GoodID,
      }).then(resp => {
        self.orderGoods.order = order
        self.orderGoods.good = resp.data.Detail
        self.myOrders.push(self.orderGoods)
        self.visible = true
      }).catch(error => {
        fail(undefined, 'fail to get good detail', error)
      })
    },
  },
})
</script>


<style scoped src="../css/mining-style.css">
</style>
<style scoped>
</style>