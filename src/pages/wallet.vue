<template>
  <div>
    <div class="content">
      <span class="title">{{ $t('Wallet.Title') }}</span>
      <div class="balance-box">
        <div class="balance-box-item">
          <div>
            <span class="price">0</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t('Mining.Column1.Total') }}</span>
        </div>

        <div class="balance-box-item">
          <div>
            <span class="price">0</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t('Mining.Column1.Total') }}</span>
        </div>
      </div>

      <div class="hr-t"></div>

      <div class="assets-box">
        <div class="box-title">
          <span class="title">{{ $t('Wallet.Assets.Title') }}</span>
          <button v-show="false" class="opacity-btn">{{ $t('Wallet.Assets.Export') }}</button>
        </div>

        <div>
          <q-table flat class="table-box" :rows="assets" :columns="assetsColumns" row-key="name">
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn @click="onTransfer(props.row)">Transfer</q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>

      <div class="transactions-box">
        <div class="box-title">
          <span class="title">{{ $t('Wallet.Transactions.Title') }}</span>
        </div>

        <div>
          <q-table
            flat
            class="table-box"
            :rows="transactions"
            :columns="transactionsColumns"
            row-key="name"
          />
        </div>
      </div>

      <div class="guide-box">
        <span class="title">{{ $t('Wallet.Guide.Title') }}</span>

        <div class="content-box">
          <div class="content-column" style="margin-top: 50px;">
            <span style="font-weight: 600">{{ $t('Wallet.Guide.subtitle1') }}</span>
            <p>{{ $t('Wallet.Guide.sub1') }}</p>
          </div>

          <div class="content-column">
            <span style="font-weight: 600">{{ $t('Wallet.Guide.subtitle2') }}</span>
            <p>{{ $t('Wallet.Guide.sub2') }}</p>
          </div>

          <div class="content-column">
            <span style="font-weight: 600">{{ $t('Wallet.Guide.subtitle3') }}</span>
            <p>{{ $t('Wallet.Guide.sub3') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {

  },

  data () {
    return {
      helpImg: require('/src/assets/help-circle.svg'),
      assetsColumns: [
        { name: 'name', label: this.$t('Wallet.Assets.Name'), align: 'left', field: row => row.name },
        { name: 'balance', label: this.$t('Wallet.Assets.Balance'), align: 'center', field: 'balance', },
        { name: 'change', label: this.$t('Wallet.Assets.Change'), align: 'center', field: 'change', },
        { name: 'valueUSDT', label: this.$t('Wallet.Assets.MarketValueUSDT'), align: 'center', field: 'valueUSDT', },
        { name: 'valueJPY', label: this.$t('Wallet.Assets.MarketValueBalance'), align: 'center', field: 'valueJPY', },
        { name: 'actions' }
      ],
      assets: [
        // {
        //   id: '1',
        //   name: 'SPACEMESH',
        //   balance: '100 SMH',
        //   change: '+1.5 SMH',
        //   valueUSDT: '5000 USDT',
        //   valueJPY: '560,000 JPY',
        // },
        // {
        //   id: '2',
        //   name: 'SPACEMESH',
        //   balance: '100 SMH',
        //   change: '+1.5 SMH',
        //   valueUSDT: '5000 USDT',
        //   valueJPY: '560,000 JPY',
        // },
      ],
      transactionsColumns: [
        { name: 'name', label: this.$t('Wallet.Transactions.Name'), align: 'left', field: 'name' },
        { name: 'date', label: this.$t('Wallet.Transactions.Date'), align: 'center', field: 'date', },
        { name: 'amount', label: this.$t('Wallet.Transactions.Amount'), align: 'center', field: 'amount', },
        { name: 'status', label: this.$t('Wallet.Transactions.Status'), align: 'center', field: 'status', },
        { name: 'type', label: this.$t('Wallet.Transactions.Type'), align: 'center', field: 'type', },
        { name: 'actions' }
      ],
      transactions: [
        // {
        //   id: 1,
        //   name: 'SPACEMESH',
        //   date: '2021-09-15',
        //   amount: '-10 SMG',
        //   status: 'Pending',
        //   type: 'Withdrawal',
        // },
        // {
        //   id: 2,
        //   name: 'ETHEREUM',
        //   date: '2021-08-20',
        //   amount: '-1 ETH',
        //   status: 'Completed',
        //   type: 'Conversion',
        // },
      ],
    }
  },

  methods: {
    transfer: function (index) { },
    help: function () { },
    details: function (index) { },
    onTransfer: function (row) {
      console.log("row is", row);
    },
  },
})
</script>

<style scoped src="../css/wallet-style.css"></style>
<style scoped>
</style>