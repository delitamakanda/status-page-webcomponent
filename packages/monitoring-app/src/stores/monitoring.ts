import { defineStore} from "pinia";

export  const useMonitoringStore = defineStore('monitoring', {
  state: () => ({
    alert: null,
    metrics: [
      { name: 'CPU Usage', value: 75 },
      { name: 'Memory Usage', value: 60 },
    ],
  }),
  actions: {
    updateMetrics(metrics) {
      this.metrics = metrics;

      const cpuUsage = metrics.find(m => m.name === 'CPU Usage');
      if (cpuUsage && cpuUsage.value > 80) {
        this.alert = { type: 'warning', message: 'High CPU usage' };
      } else {
        this.alert = null;
      }
    }
  }
})
