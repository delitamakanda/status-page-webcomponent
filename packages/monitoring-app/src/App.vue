<script setup lang="ts">
import { useMonitoringStore} from "@/stores/monitoring.ts";
const store = useMonitoringStore();
const simulateData = () => {
  const newMetrics = [
    {
      name: "CPU Usage",
      value: Math.floor(Math.random() * 100),
    },
    {
      name: "Memory Usage",
      value: Math.floor(Math.random() * 100),
    }
  ]
  store.updateMetrics(newMetrics);
}
</script>

<template>
  <header>
    <div class="wrapper">
      <my-component first="Délita" last="Makanda"></my-component>
      <monitoring-chart :data="JSON.stringify(store.metrics)"></monitoring-chart>
      <monitoring-alert v-if="store.alert" :message="store.alert.message" :type="store.alert.type"></monitoring-alert>
      <button @click="simulateData">Simulate Data</button>
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
