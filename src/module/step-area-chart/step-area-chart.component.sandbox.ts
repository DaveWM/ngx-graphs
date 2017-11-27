import {sandboxOf} from 'angular-playground';
import {StepAreaChartComponent} from './step-area-chart.component';
import {ComponentsModule} from '../modules/components.module';

export default sandboxOf(StepAreaChartComponent, {
  imports: [ComponentsModule],
  declareComponent: false
})
  .add('with test data' , {
    template: `<step-area-chart [xAxis]="[0, 100]" [yAxis]="[0, 100]" [data]="data"></step-area-chart>`,
    styles: ['step-area-chart { width: 500px; height: 500px; border: 1px solid black;}'],
    context: {
      data: [
        [10, 10],
        [50, 50],
        [75, 90]
      ]
    }
  })
  .add('with different coordinate system' , {
    template: `<step-area-chart [xAxis]="[10, 150]" [yAxis]="[50, 200]" [data]="data"></step-area-chart>`,
    styles: ['step-area-chart { width: 500px; height: 500px; border: 1px solid black;}'],
    context: {
      data: [
        [10, 70],
        [75, 75],
        [120, 180]
      ]
    }
  })
  .add('with grid lines' , {
    template: `<step-area-chart [xAxis]="[0, 100]" [yAxis]="[0, 100]" [data]="data" [numHorizontalGridLines]="10"></step-area-chart>`,
    styles: ['step-area-chart { width: 500px; height: 500px; border: 1px solid black;}'],
    context: {
      data: [
        [10, 10],
        [50, 50],
        [75, 90]
      ]
    }
  })
  .add('in a different colour', {
    template: `<step-area-chart [xAxis]="[0, 100]" [yAxis]="[0, 100]" [data]="data" [colour]="'red'"></step-area-chart>`,
    styles: ['step-area-chart { width: 500px; height: 500px; border: 1px solid black;}'],
    context: {
      data: [
        [10, 10],
        [50, 50],
        [75, 90]
      ]
    }
  });
