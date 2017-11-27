import {sandboxOf} from "angular-playground";
import {ChartLegendComponent} from "./chart-legend.component";
import {ComponentsModule} from "../modules/components.module";

export default sandboxOf(ChartLegendComponent, {
  imports: [ComponentsModule],
  declareComponent: false
})
  .add('2 keys', {
    template: `<chart-legend [keys]="[{colour: 'red', label: 'First Key'}, {colour: 'blue', label: 'Second Key'}]"></chart-legend>`
  });
