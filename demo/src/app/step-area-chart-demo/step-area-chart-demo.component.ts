import { Component, OnInit } from '@angular/core';
import { sampleOne, gen } from 'testcheck';

@Component({
  selector: 'step-area-chart-demo',
  templateUrl: './step-area-chart-demo.component.html',
  styleUrls: ['./step-area-chart-demo.component.scss']
})
export class StepAreaChartDemoComponent implements OnInit {

  public data: [number, number][] = [];
  public colour: string = "#01ABC1";

  constructor() { }

  ngOnInit() {
    this.randomData();
  }

  randomData(){
    this.data = <[number, number][]>new Array(100).fill(0)
      .map((_, idx) => idx)
      .map(i => [i, sampleOne(gen.numberWithin(0, 100))])
      .filter(_ => Math.random() >= 0.9);
      console.log(this.data);
  }

}
