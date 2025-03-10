import { Component, Prop, h} from "@stencil/core";

@Component({
  tag: 'monitoring-alert',
  styleUrl:'monitoring-alert.css',
  shadow: true,
})
export class MonitoringAlert {
  @Prop() type: string;
  @Prop() message: string;

  render() {
    return (
      <div class={`alert alert-${this.type}`}>
        {this.message}
      </div>
    );
  }
}
