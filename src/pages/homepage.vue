<template>
  <div id="main">
    <div class="content">
      <div id="content-title">
        <div class="title-1">
          {{ $t('Homepage.Title.Title') }}
          <strong>Procyon</strong>
        </div>
        <div class="title-2">{{ $t('Homepage.Title.Subtitle') }}</div>
        <div class="btn-list">
          <q-btn class="btn-register">{{ $t('Homepage.Title.Register') }}</q-btn>
          <router-link to="#why-procyon">
            <q-btn class="alt">{{ $t('Homepage.Title.Why') }}</q-btn>
          </router-link>
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
      <div class="column-1">
        <div id="why-procyon">{{ $t('Homepage.Why.Title') }}</div>
        <p>{{ $t('Homepage.Why.Content1') }}</p>
        <p>
          <em>{{ $t('Homepage.Why.Content2') }}</em>
        </p>
        <p>
          {{ $t('Homepage.Why.Content3') }}
          <a href>{{ $t('Homepage.Why.Content4') }}</a>
        </p>
        <div class="hr"></div>
      </div>

      <div class="column-2">
        <div class="column-2-item">
          <div class="item-header">{{ $t('Homepage.IndustryConnections.Title') }}</div>
          <ul>
            <li>{{ $t('Homepage.IndustryConnections.Ul[0]') }}</li>
            <li>{{ $t('Homepage.IndustryConnections.Ul[1]') }}</li>
            <li>{{ $t('Homepage.IndustryConnections.Ul[2]') }}</li>
            <li>{{ $t('Homepage.IndustryConnections.Ul[3]') }}</li>
            <li>{{ $t('Homepage.IndustryConnections.Ul[4]') }}</li>
          </ul>
        </div>

        <div class="column-2-item">
          <div class="item-header">{{ $t('Homepage.TechnologyANDOperations.Title') }}</div>
          <ul>
            <li>{{ $t('Homepage.TechnologyANDOperations.Ul[0]') }}</li>
            <li>{{ $t('Homepage.TechnologyANDOperations.Ul[1]') }}</li>
            <li>{{ $t('Homepage.TechnologyANDOperations.Ul[2]') }}</li>
          </ul>
        </div>
      </div>

      <div class="hr"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'homepage',
  setup () {
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

})
</script>
<style scoped src="../css/homepage-style.css"></style>