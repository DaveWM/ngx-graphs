import { BarChartSeries } from './../../types';
import {Component, Input, OnInit} from '@angular/core';
import * as R from "ramda";

export type BarPart = {
  colour: string,
  value: number | undefined
}

@Component({
  selector: 'stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnInit {

  @Input()
  public yAxis: [number, number]; // min, max

  @Input()
  public series: BarChartSeries[];

  constructor() { }

  public getBars(): BarPart[][] {
    return R.pipe<BarChartSeries[], BarPart[][], BarPart[][], BarPart[][]>(
      R.map((s: BarChartSeries) => s.data.map(d => ({colour: s.colour, value: d}))),
      R.transpose, // same as zipping all the lists together
      R.map<BarPart[], BarPart[]>(
        R.pipe<BarPart[], BarPart[], BarPart[]>(
          R.sortBy((bp: BarPart) => bp.value || 0), // need the largest bars to be rendered first (with the lowest z index)
          R.reverse
        )
      )
    )(this.series);
  }

  ngOnInit() {
  }

}
