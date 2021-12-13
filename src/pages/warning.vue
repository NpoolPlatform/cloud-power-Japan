<template>
  <div>
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="text-white warning-bk" style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ $t("Warning.Warning") }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">{{
          $t("Warning.Content")
        }}</q-card-section>
        <q-card-section class="q-pt-none">{{
          $t("Warning.P1")
        }}</q-card-section>
        <q-card-section class="q-pt-none">{{
          $t("Warning.P2")
        }}</q-card-section>

        <q-card-actions align="between" class="text-teal">
          <div class="button-group">
            <q-btn-toggle
              v-model="locale"
              push
              glossy
              toggle-color="orange-9"
              :options="[
                { label: $t('Footer.Forth.En'), value: 'en-US' },
                { label: $t('Footer.Forth.Jp'), value: 'ja-JP' },
              ]"
            />
          </div>
          <q-btn
            flat
            label="OK"
            @click="
              persistent = !persistent;
              $router.push('/home');
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const { locale } = useI18n({ useScope: "global" });
    return {
      persistent: ref(true),
      locale,
    };
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
