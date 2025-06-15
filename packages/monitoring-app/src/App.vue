<script setup lang="ts">
import { useMonitoringStore} from "@/stores/monitoring.ts";
import { onMounted, ref } from "vue";
const store = useMonitoringStore();
const chartLoaded = ref(false);
onMounted(() => {
  store.getMetrics();
  store.getHealth();
  chartLoaded.value = true;
});
</script>

<template>
  <header>
    <div class="wrapper">
      <my-component first="Délita" last="Makanda"></my-component>
      <div v-if="!chartLoaded">Loading...</div>
      <div v-else-if="!store?.metrics || store.metrics.length === 0">No metrics available</div>
      <div v-else v-for="(data, index) in store?.metrics" :key="index">
        <h2>{{ index +1}} {{data?.name}}</h2>
        <monitoring-chart :data="JSON.stringify(data)"></monitoring-chart>
      </div>

      <monitoring-alert v-if="store.alert" :message="store.alert.message" :type="store.alert.type"></monitoring-alert>
      <p>Version: {{ store?.version }}</p>
     <p>Docker: {{ store?.docker }}</p>
      <h4>Debug informations</h4>
      <pre>{{ store?.metrics }}</pre>
      <pre>{{ store?.health }}</pre>

    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
