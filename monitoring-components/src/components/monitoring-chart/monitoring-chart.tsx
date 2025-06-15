import { Component, Element, State, Prop, h, Watch } from'@stencil/core';
import * as d3 from  'd3';

@Component({
  tag: 'monitoring-chart',
  styleUrl: 'monitoring-chart.css',
  shadow: true,
})
export class MonitoringChart {
  @Prop() data: string;
  @Element() el: HTMLElement;
  @State() chartId: string = 'chart-' + Math.random().toString(36).substr(2, 9);

  private chartContainer?: HTMLElement;
  private svg?: d3.Selection<SVGElement, unknown, null, undefined>;

  componentDidLoad() {
    this.updateChart();
  }

  disconnectedCallback() {
    if (this.svg) {
      this.svg.remove();
    }
  }

  @Watch('data')
  updateChart() {
    try {
      if (this.chartContainer) {
        // Clear previous chart if it exists
        d3.select(this.chartContainer).selectAll('*').remove();

        // Parse data safely
        let parseData;
        try {
          parseData = JSON.parse(this.data);
          if (!Array.isArray(parseData)) {
            // If data is not an array, try to convert it to a format D3 can use
            if (typeof parseData === 'object') {
              parseData = Object.entries(parseData).map(([key, value]) => ({
                name: key,
                value: typeof value === 'number' ? value : 0
              }));
            } else {
              parseData = [{ name: 'data', value: 50 }]; // Default data
            }
          }
        } catch (e) {
          console.error('Error parsing chart data:', e);
          parseData = [{ name: 'error', value: 50 }]; // Default data on error
        }

        this.renderChart(parseData);
      }
    } catch (error) {
      console.error('Error updating chart:', error);
    }
  }
  // Render the chart using D3.js
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
    return (
      <div class="chart-container">
        <div ref={el => (this.chartContainer = el)} id={this.chartId}></div>
      </div>
    );
  }
}
