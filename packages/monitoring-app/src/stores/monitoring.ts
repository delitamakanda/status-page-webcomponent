import { defineStore} from "pinia";

const formatData = (data: any) => {
  const newData = Object.entries(data).map(([name, value]) => ({ name, value: value }));
  return newData;
}

export  const useMonitoringStore = defineStore('monitoring', {
  state: () => ({
    alert: null as { type: string; message: string } | null,
    metrics: null as any | null,
    version: null as string | null,
    docker: null as any | null,
    health: null as { status: string; timestamp: string, load_time: string } | null,
  }),
  actions: {
    async getHealth() {
      const response = await fetch('https://kf.applikuapp.com/api/health/');
      if (!response.ok) {
        throw new Error(`Failed to fetch health: ${response.status}`);
      }
      const { status, load_time, timestamp } = await response.json();
      if (status!== 'OK') {
        this.alert = { type: 'danger', message: 'Service is down' };
      } else {
        this.alert = null;
      }
      this.health = { status, load_time, timestamp };
    },
    async getMetrics() {
      const response = await fetch('https://kf.applikuapp.com/api/status/');
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.status}`);
      }
      const { disk, docker, python_version }: any = await response.json();
      this.version = python_version;
      this.docker = docker;
      this.metrics = formatData(disk) as any;
      const cpuUsage = this.metrics.find((m: any) => m.name === 'used');
      if (cpuUsage && cpuUsage.value > 80) {
        this.alert = { type: 'warning', message: 'High CPU usage' };
      } else {
        this.alert = null;
      }
    }
  }
})
