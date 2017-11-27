import {Component, Input, OnInit} from '@angular/core';
import {area, curveStepAfter} from 'd3-shape';
import * as R from 'ramda';
import {growSequence} from '../../utilities/array-utils';
import {coordinateTransform} from '../../utilities/misc-utils';

@Component({
  selector: 'step-area-chart',
  templateUrl: './step-area-chart.component.html',
  styleUrls: ['./step-area-chart.component.scss']
})
export class StepAreaChartComponent implements OnInit {

  @Input()
  public xAxis: [number, number]; // min, max

  @Input()
  public yAxis: [number, number]; // min, max

  @Input()
  public data: [number, number][];

  @Input()
  public colour: string | undefined;

  public get SVG_VIEWBOX_SIZE(): number {
   return 100;
  }

  constructor() { }

  ngOnInit() {
  }

  public getPath(): string {
    if(!this.data.length){
      return '';
    }
    const svgCoords: [number, number] = [0, this.SVG_VIEWBOX_SIZE];
    return R.pipe(
      R.map(
        R.pipe(
          R.zip([this.xAxis, this.yAxis]),
          R.map(R.apply(R.partial(coordinateTransform, [svgCoords])))
        )
      ),
      R.prepend([0, 0]),
      R.partial(growSequence, [ (last: [number, number] | undefined) => [this.SVG_VIEWBOX_SIZE, last ? last[1] : 0] ]),
      area().curve(curveStepAfter),
      s => s || ''
    )(this.data);
  }

}
