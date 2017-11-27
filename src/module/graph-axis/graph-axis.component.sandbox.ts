import {sandboxOf} from 'angular-playground';
import {GraphAxisComponent} from './graph-axis.component';
import {ComponentsModule} from '../modules/components.module';
import * as dateFns from 'date-fns';

export default sandboxOf(GraphAxisComponent, {
  imports: [ComponentsModule],
  declareComponent: false
})
  .add('left', {
    template: `<graph-axis [label]="'Axis Label'" [scale]="scale" [position]="'left'"></graph-axis>`,
    context: {
      scale: {
        min: 0,
        max: 100,
        numTicks: 11
      }
    },
    styles: [`graph-axis { height: 500px; width: 40px; margin: 30px; border: 1px solid black;}`]
  })
  .add('right', {
    template: `<graph-axis [label]="'Axis Label'" [scale]="scale" [position]="'right'"></graph-axis>`,
    context: {
      scale: {
        min: 0,
        max: 100,
        numTicks: 11
      }
    },
    styles: [`graph-axis { height: 500px; width: 40px; margin: 30px; border: 1px solid black;}`]
  })
  .add('bottom', {
    template: `<graph-axis [label]="'Axis Label'" [scale]="scale" [position]="'bottom'"></graph-axis>`,
    context: {
      scale: {
        min: 0,
        max: 100,
        numTicks: 11
      }
    },
    styles: [`graph-axis { width: 700px; height: 40px; margin: 30px; border: 1px solid black;}`]
  })
  .add('top', {
    template: `<graph-axis [label]="'Axis Label'" [scale]="scale" [position]="'top'"></graph-axis>`,
    context: {
      scale: {
        min: 0,
        max: 100,
        numTicks: 11
      }
    },
    styles: [`graph-axis { width: 700px; height: 40px; margin: 30px; border: 1px solid black;}`]
  })
  .add('formatted tick values', {
    template: `<graph-axis [label]="'Axis Label'" [scale]="scale" [position]="'bottom'" [formatTickFn]="format"></graph-axis>`,
    context: {
      scale: {
        min: 1483228800000,
        max: 1483401600000,
        numTicks: 25
      },
      format: (n: number) => dateFns.format(new Date(n), 'HH:mm')
    },
    styles: [`graph-axis { width: 1100px; height: 40px; margin: 30px; border: 1px solid black;}`]
  });
