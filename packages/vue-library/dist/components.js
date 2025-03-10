import { defineContainer } from '@stencil/vue-output-target/runtime';
export const MonitoringAlert = defineContainer('monitoring-alert', undefined, [
    'type',
    'message'
]);
export const MonitoringChart = defineContainer('monitoring-chart', undefined, [
    'data'
]);
export const MyComponent = defineContainer('my-component', undefined, [
    'first',
    'middle',
    'last'
]);
//# sourceMappingURL=components.js.map