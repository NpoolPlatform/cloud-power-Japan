<template>
  <div class="main-body">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
})
</script>

<style scoped>
.main-body {
  background-image: url("./assets/procyon-logo-opacity0.025.svg");
  background-position: 90% -360px;
  background-repeat: no-repeat;
  background-size: 800px;
  display: block;
  top: 100;
  right: 0;
  height: 100%;
  width: 100%;
}
</style>