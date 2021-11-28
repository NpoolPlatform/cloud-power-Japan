<template>
  <div>
    <div class="content faq">
      <div id="hero">
        <h1>{{ $t('Faq.A') }} &amp; {{ $t('Faq.B') }}</h1>
        <h2>{{ $t('Faq.C') }}</h2>

        <div id="search-box">
          <form action>
            <input type="text" id="search-field" name="inv-code" required />
            <input type="submit" :value="$t('Faq.Search')" id="search-button" />
          </form>
        </div>
      </div>

      <h2>{{ $t('Faq.D') }}</h2>

      <h3>{{ $t('Faq.E') }}</h3>

      <p>{{ $t('Faq.F') }}</p>

      <h3>{{ $t('Faq.E') }}</h3>

      <p>{{ $t('Faq.F') }}</p>

      <h2>{{ $t('Faq.K') }}</h2>

      <h3>{{ $t('Faq.E') }}</h3>

      <p>{{ $t('Faq.F') }}</p>

      <h3>{{ $t('Faq.E') }}</h3>

      <p>{{ $t('Faq.F') }}</p>

      <h3>{{ $t('Faq.E') }}</h3>

      <p>{{ $t('Faq.F') }}</p>

      <h2>{{ $t('Faq.R') }}</h2>

      <h3>{{ $t('Faq.E') }}</h3>

      <p>{{ $t('Faq.F') }}</p>

      <h3>{{ $t('Faq.E') }}</h3>

      <p>{{ $t('Faq.F') }}</p>

      <h3>{{ $t('Faq.E') }}</h3>

      <p>{{ $t('Faq.F') }}</p>

      <div class="hr"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {

  },
})
</script>

<style scoped src="../css/style.css">
</style>