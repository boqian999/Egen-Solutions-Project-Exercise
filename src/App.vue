<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "styles/main.scss";
</style>
<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    AppHeader
  }
}
</script>
