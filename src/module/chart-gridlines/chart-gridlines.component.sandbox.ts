import {sandboxOf} from "angular-playground";
import {ChartGridlinesComponent} from "./chart-gridlines.component";
import {ComponentsModule} from "../modules/components.module";

export default sandboxOf(ChartGridlinesComponent, {
  imports: [ComponentsModule],
  declareComponent: false
})
  .add('vertical', {
      template: `<chart-gridlines numLines="10" orientation="vertical"></chart-gridlines>`,
      styles: ['chart-gridlines { height: 400px }']
  })
  .add('horizontal', {
      template: `<chart-gridlines numLines="10" orientation="horizontal"></chart-gridlines>`,
      styles: ['chart-gridlines { height: 400px }']
  });