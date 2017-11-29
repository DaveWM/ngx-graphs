import { gen, sampleOne } from 'testcheck';
import { Component, OnInit } from '@angular/core';
import {BarChartSeries} from 'ngx-graphs';

@Component({
  selector: 'stacked-bar-chart-demo',
  templateUrl: './stacked-bar-chart-demo.component.html',
  styleUrls: ['./stacked-bar-chart-demo.component.scss']
})
export class StackedBarChartDemoComponent implements OnInit {

  public data: BarChartSeries[] = [];

  constructor() { }

  ngOnInit() {
    this.randomData();
  }

  randomData(){
    const colourGen = gen.oneOf(['red', 'blue', 'green', 'yellow', 'black', 'purple', 'brown']);
    const numSeries = Math.floor(Math.random() * 3.5) + 1;
    const numPoints = Math.floor(Math.random() * 100) + 1;
    this.data = new Array(numSeries).fill(0)
      .map(_ => ({
        colour: sampleOne(colourGen),
        data: new Array(numPoints).fill(0).map(_ => sampleOne(gen.numberWithin(0, 100)))
      }));
  }

}
