<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PageFooter from './components/page-footer.vue';
import PageHeader from './components/page-header.vue';

</script>

<template>
  <div id="conatiner">
    <PageHeader />
    <div id="main">
      <RouterView />
    </div>
    <PageFooter />
  </div>
</template>

<style scoped>
#conatiner {
  display: grid;
  grid-template-rows: auto 2fr auto;
}

#main {
  padding: 0;
  margin: 0;
}
</style>
