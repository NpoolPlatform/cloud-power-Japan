<template>
  <div>
    <div class="content">
      <div class="title">{{ $t("Mining.Column1.Title") }}</div>

      <div class="earn-box">
        <div class="earn-box-item">
          <div>
            <span class="price">*</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t("Mining.Column1.Total") }}</span>
        </div>

        <div class="earn-box-item">
          <div>
            <span class="price">*</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t("Mining.Column1.Yesterday") }}</span>
        </div>

        <div class="earn-box-item">
          <div>
            <span class="price">*</span>
            <span class="unit">USDT</span>
          </div>
          <div class="hr"></div>
          <span class="subtitle">{{ $t("Mining.Column1.Current") }}</span>
        </div>
      </div>

      <div class="hr-t"></div>

      <div class="title">{{ $t("Mining.Column2.Title") }}</div>
      <div class="mining-summary">
        <div class="mining-heading">
          <img class="mining-icon" :src="spacemeshImg" />
          <h3 class="mining-title">Spacemesh</h3>
        </div>

        <div class="top-line-summary">
          <div class="top-line-item">
            <span class="label">{{ $t("Mining.Column2.Earning") }}</span>
            <span class="value">* SMH</span>
            <span class="sub-value">(* USDT)</span>
          </div>

          <div class="top-line-item">
            <span class="label">{{ $t("Mining.Column2.Last") }}</span>
            <span class="value">* SMH</span>
            <span class="sub-value">(* USDT)</span>
          </div>

          <div class="top-line-item">
            <span class="label">{{ $t("Mining.Column2.Capacity") }}</span>
            <span class="value">{{ totalCapacity }} TB</span>
          </div>
        </div>

        <div class="detailed-summary">
          <div class="line">
            <span class="label">{{ $t("Mining.Column2.DailyOutput") }}</span>
            <span class="value">* SMH</span>
          </div>

          <div class="line">
            <span class="label">{{
              $t("Mining.Column2.TechnicalServiceFee")
            }}</span>
            <span class="value">* SMH (20%)</span>
          </div>

          <div class="line">
            <span class="label">{{ $t("Mining.Column2.NetDailyOutput") }}</span>
            <span class="value">* SMH</span>
          </div>

          <div class="line">
            <span class="label">{{
              $t("Mining.Column2.TotalDaysMining")
            }}</span>
            <span class="value">{{ durationDays }}{{ $t("Mining.Day") }}</span>
          </div>

          <div class="line">
            <span class="label">{{ $t("Mining.Column2.Hashrate") }}</span>
            <span class="value">* MH/s</span>
          </div>

          <div class="line">
            <span class="label">{{
              $t("Mining.Column2.NetworkDailyOutput")
            }}</span>
            <span class="value">* SMH</span>
          </div>
        </div>

        <div class="buttons">
          <button disabled class="export">
            {{ $t("Mining.Column2.Export") }}
          </button>
          <button disabled class="purchase">
            {{ $t("Mining.Column2.Purchase") }}
          </button>
        </div>
      </div>

      <div class="title">{{ $t("Mining.Column3.Title") }}</div>
      <div v-if="showTable">
        <div>
          <q-table
            flat
            class="table-box"
            :rows="myOrders"
            :columns="orderColumns"
            row-key="name"
          >
          </q-table>
          <q-inner-loading :showing="visible">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </div>
      </div>

      <div class="hr-t"></div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onBeforeMount, onMounted, computed, watch } from "vue";
import { api } from "src/boot/axios";
import { fail } from "src/notify/notify";
import { timestampToDate } from "src/utils/utils";
import { useI18n } from "vue-i18n";

const q = useQuasar();
const $store = useStore();
const $router = useRouter();
const { t, locale } = useI18n({ useScope: "global" });

const spacemeshImg = require("/src/assets/product-spacemesh.svg");
const plusImg = require("/src/assets/icon-plus.svg");
const myOrders = ref([]);
const orderGoods = ref({});
const visible = ref(true);
const totalAmount = ref("");
const totalCapacity = ref("");
const durationDays = ref("");

const showTable = ref(true);
const lang = computed(() => locale.value);

const userid = q.cookies.get("UserID");
const appid = q.cookies.get("AppID");

const orders = computed({
  get: () => $store.state.orders.orders,
  set: (val) => {
    $store.commit("orders/updateOrders", val);
  },
});

watch(locale, (n, o) => {
  if (n !== o) {
    location.reload();
  }
});

const getOrderGood = (order) => {
  api
    .post("/cloud-hashing-apis/v1/get/good/detail", {
      ID: order.GoodID,
    })
    .then((resp) => {
      var good = resp.data.Detail;
      var myOrder = {
        date: timestampToDate(order.Start),
        product: good.CoinInfo.Name,
        amount: order.Units + good.Unit,
        price: good.Price + good.PriceCurrency.Unit + "/" + good.Unit,
        discount:
          (
            Number(order.Discount) +
            (Number(order.SpecialReductionAmount) /
              (Number(order.Units) * Number(good.Price))) *
              100
          ).toString() + "%",
        techFee: "20%",
        period: good.DurationDays,
        total: order.Payment.Amount,
      };
      durationDays.value = good.DurationDays;
      totalAmount.value += order.Payment.Amount;
      totalCapacity.value += order.Units;
      myOrders.value.push(myOrder);

      visible.value = false;
    });
};

const getOrdersDetail = () => {
  api
    .post("/cloud-hashing-apis/v1/get/orders/detail/by/app/user", {
      AppID: appid,
      UserID: userid,
    })
    .then((resp) => {
      orders.value = resp.data;
      resp.data.Details.forEach((order) => {
        getOrderGood(order);
      });
      return;
    })
    .catch((error) => {
      myOrders.value = [];
    });
  myOrders.value = [];
  visible.value = false;
};

onBeforeMount(() => {
  if (!q.cookies.has("userID") && !q.cookies.has("AppSession")) {
    fail(undefined, this.$t("Notify.User.PleaseLogin"), "");
    $router.push("/login");
  }
});

onMounted(() => {
  getOrdersDetail();
});

const orderColumns = [
  {
    name: "date",
    label: t("Mining.Column3.Date"),
    align: "left",
    field: (row) => row.date,
  },
  {
    name: "product",
    label: t("Mining.Column3.Product"),
    align: "center",
    field: (row) => row.product,
  },
  {
    name: "amount",
    label: t("Mining.Column3.Amount"),
    align: "center",
    field: (row) => row.amount,
  },
  {
    name: "price",
    label: t("Mining.Column3.Price"),
    align: "center",
    field: (row) => row.price,
  },
  {
    name: "discount",
    label: t("Mining.Column3.Discount"),
    align: "center",
    field: (row) => row.discount,
  },
  {
    name: "techFee",
    label: t("Mining.Column3.Techfee"),
    align: "center",
    field: (row) => row.techFee,
  },
  {
    name: "period",
    label: t("Mining.Column3.Period"),
    align: "center",
    field: (row) => row.period,
  },
  {
    name: "total",
    label: t("Mining.Column3.Total"),
    align: "center",
    field: (row) => row.total,
  },
];
</script>

<style scoped src="../css/mining-style.css"></style>
<style scoped>
.table-box {
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
}
</style>

<style>
.q-table--horizontal-separator thead th {
  font-size: 16px;
}
</style>
