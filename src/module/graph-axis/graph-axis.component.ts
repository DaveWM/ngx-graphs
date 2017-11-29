import { Scale, AxisPosition, Orientation } from './../../types';
import {Component, Input, OnInit} from '@angular/core';
import * as R from 'ramda';
import {round, scale} from '../../utilities/misc-utils';

@Component({
  selector: 'graph-axis',
  templateUrl: './graph-axis.component.html',
  styleUrls: ['./graph-axis.component.scss']
})
export class GraphAxisComponent implements OnInit {

  @Input()
  public label: string | undefined;

  @Input()
  public scale: Scale;

  @Input()
  public position: AxisPosition;

  @Input()
  public formatTickFn: (val: number) => string = R.pipe(
    (i: number) => round(i, 2),
    R.toString
  );

  constructor() { }

  ngOnInit() {
  }

  public getOrientation(): Orientation {
    if(R.contains(this.position, ['top', 'bottom'])){
      return 'horizontal';
    } else {
      return 'vertical';
    }
  }

  // returns an array of formatted tick values
  public getTicks(): string[] {
    return scale(this.scale.min, this.scale.max, this.scale.numTicks)
      .map(this.formatTickFn);
  }
}
