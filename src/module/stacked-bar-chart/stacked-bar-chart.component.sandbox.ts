import {sandboxOf} from "angular-playground";
import {StackedBarChartComponent} from "./stacked-bar-chart.component";
import {ComponentsModule} from "../modules/components.module";

export default sandboxOf(StackedBarChartComponent, {
  imports: [ComponentsModule],
  declareComponent: false
})
  .add('with 2 series', {
    template: `<stacked-bar-chart [series]="series" [yAxis]="[0, 100]" [numHorizontalGridLines]="5"></stacked-bar-chart>`,
    context: {
      series: [
        {
          colour: '#ABE6F1',
          data: [25, 50, 90]
        },
        {
          colour: '#02BFD7',
          data: [75, 60, 10]
        }
      ]
    },
    styles: ['stacked-bar-chart { position: absolute; height: 500px; width: 1000px; margin: 50px; border: 1px solid black; }']
  })
  .add('with 3 series', {
    template: `<stacked-bar-chart [series]="series" [yAxis]="[0, 100]" [numHorizontalGridLines]="4"></stacked-bar-chart>`,
    context: {
      series: [
        {
          colour: 'red',
          data: [10, 50, 90]
        },
        {
          colour: 'blue',
          data: [50, 90, 10]
        },
        {
          colour: 'green',
          data: [90, 10, 50]
        }
      ]
    },
    styles: ['stacked-bar-chart { position: absolute; height: 500px; width: 1000px; margin: 50px; border: 1px solid black; }']
  });
