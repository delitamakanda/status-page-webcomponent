import { Component, Prop, h, Watch } from'@stencil/core';
import * as d3 from  'd3';

@Component({
  tag: 'monitoring-chart',
  styleUrl: 'monitoring-chart.css',
  shadow: true,
})
export class MonitoringChart {
  @Prop() data: string;

  private chartContainer: HTMLElement;

  @Watch('data')
  updateChart() {
    if (this.chartContainer) {
      const parseData = JSON.parse(this.data);
      this.renderChart(parseData);
    }
  }

  componentDidMount() {
    this.updateChart();
  }

  renderChart(data) {
    const svg = d3.select(this.chartContainer).append('svg')
      .attr('width', 300)
     .attr('height', 200);
    svg.selectAll('rect')
      .data(data)
      .enter()
     .append('rect')
      .attr('x', (_, i ) => i * 30)
     .attr('y', d => 200 - d.value)
      .attr('width', 25)
     .attr('height', d => d.value)
    .attr('fill', 'steelblue');
  }

  render() {
    return <div ref={el => (this.chartContainer = el)}></div>;
  }
}
