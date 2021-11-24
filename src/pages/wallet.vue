<template>
  <div>
    <div class="content">
      <span class="title">{{ $t('Wallet.Title') }}</span>
      <div class="balance-box">
        <div class="balance-box-item">
          <div>
            <span class="price">5000</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t('Mining.Column1.Total') }}</span>
        </div>

        <div class="balance-box-item">
          <div>
            <span class="price">5000</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t('Mining.Column1.Yesterday') }}</span>
        </div>
      </div>

      <div class="hr-t"></div>

      <div class="assets-box">
        <div class="box-title">
          <span class="title">{{ $t('Wallet.Assets.Title') }}</span>
          <button class="opacity-btn">{{ $t('Wallet.Assets.Export') }}</button>
        </div>

        <q-markup-table class="table-box" wrap-cells flat>
          <thead class="table-style">
            <tr class="table-header">
              <th class="text-left">{{ $t('Wallet.Assets.Name') }}</th>
              <th class="text-left">{{ $t('Wallet.Assets.Balance') }}</th>
              <th class="text-left">{{ $t('Wallet.Assets.Change') }}</th>
              <th class="text-left">{{ $t('Wallet.Assets.MarketValueUSDT') }}</th>
              <th class="text-left">{{ $t('Wallet.Assets.MarketValueBalance') }}</th>
              <th class="text-right">
                <q-img :src="helpImg" class="help-img" @click="help"></q-img>
              </th>
            </tr>
          </thead>
          <tbody class="table-style">
            <tr class="table-line" v-for="(asset, index) in assets" :key="asset.id">
              <td class="text-left">{{ asset.name }}</td>
              <td class="text-left">{{ asset.balance }}</td>
              <td class="text-left">{{ asset.change }}</td>
              <td class="text-left">{{ asset.valueUSDT }}</td>
              <td class="text-left">{{ asset.valueJPY }}</td>
              <td class="text-right">
                <q-btn class="color-btn" @click="transfer(index)">{{ $t('Wallet.Assets.Transfer') }}</q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <div class="transactions-box">
        <div class="box-title">
          <span class="title">{{ $t('Wallet.Transactions.Title') }}</span>
        </div>

        <q-markup-table class="table-box" wrap-cells flat>
          <thead class="table-style">
            <tr class="table-header">
              <th class="text-left">{{ $t('Wallet.Transactions.Name') }}</th>
              <th class="text-left">{{ $t('Wallet.Transactions.Date') }}</th>
              <th class="text-left">{{ $t('Wallet.Transactions.Amount') }}</th>
              <th class="text-left">{{ $t('Wallet.Transactions.Status') }}</th>
              <th class="text-left">{{ $t('Wallet.Transactions.Type') }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="table-style">
            <tr
              class="table-line"
              v-for="(transaction, index) in transactions"
              :key="transaction.id"
            >
              <td class="text-left">{{ transaction.name }}</td>
              <td class="text-left">{{ transaction.date }}</td>
              <td class="text-left">{{ transaction.amount }}</td>
              <td class="text-left">{{ transaction.status }}</td>
              <td class="text-left">{{ transaction.type }}</td>
              <td class="text-right">
                <q-btn
                  class="color-btn"
                  @click="details(index)"
                >{{ $t('Wallet.Transactions.Details') }}</q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
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
      assets: [
        {
          id: '1',
          name: 'SPACEMESH',
          balance: '100 SMH',
          change: '+1.5 SMH',
          valueUSDT: '5000 USDT',
          valueJPY: '560,000 JPY',
        },
        {
          id: '2',
          name: 'SPACEMESH',
          balance: '100 SMH',
          change: '+1.5 SMH',
          valueUSDT: '5000 USDT',
          valueJPY: '560,000 JPY',
        },
      ],
      transactions: [
        {
          id: 1,
          name: 'SPACEMESH',
          date: '2021-09-15',
          amount: '-10 SMG',
          status: 'Pending',
          type: 'Withdrawal',
        },
        {
          id: 2,
          name: 'ETHEREUM',
          date: '2021-08-20',
          amount: '-1 ETH',
          status: 'Completed',
          type: 'Conversion',
        },
      ],
    }
  },

  methods: {
    transfer: function (index) { },
    help: function () { },
    details: function (index) { },
  },
})
</script>

<style scoped src="../css/wallet-style.css"></style>
<style scoped>
</style>