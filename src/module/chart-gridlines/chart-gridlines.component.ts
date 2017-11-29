import { Orientation } from './../../types';
import { Component, OnInit, Input } from '@angular/core';
import * as R from 'ramda';

@Component({
  selector: 'chart-gridlines',
  templateUrl: './chart-gridlines.component.html',
	styleUrls: ['./chart-gridlines.component.scss']
})
export class ChartGridlinesComponent implements OnInit {

	@Input()
	public orientation: Orientation = 'vertical';
		
	// The number of grid lines, including the axis itself and the topmost/rightmost line
  @Input()
  public numLines: number = 0;
	
  public get gridlines(): any[]{
    return R.repeat({}, this.numLines);
  }
		
  constructor() { }

  ngOnInit() {
  }

}
