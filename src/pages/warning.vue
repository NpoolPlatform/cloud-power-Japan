<template>
  <div>
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ $t('Warning.Warning') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">{{ $t('Warning.Content') }}</q-card-section>
        <q-card-section class="q-pt-none">{{ $t('Warning.P1') }}</q-card-section>
        <q-card-section class="q-pt-none">{{ $t('Warning.P2') }}</q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <div class="button-group">
            <q-btn-toggle
              v-model="locale"
              push
              glossy
              toggle-color="orange-9"
              :options="[
                { label: $t('Footer.Forth.En'), value: 'en_US' },
                { label: $t('Footer.Forth.Jp'), value: 'ja_JP' },
              ]"
            />
          </div>
          <q-btn flat label="OK" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      persistent: ref(true),
      locale,
    }
  },

  created: function () {
    this.locale = 'ja_JP'
  },
})
</script>
