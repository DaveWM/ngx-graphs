import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'graph-axis-demo',
  templateUrl: './graph-axis-demo.component.html',
  styleUrls: ['./graph-axis-demo.component.scss']
})
export class GraphAxisDemoComponent implements OnInit {

  public min: number = 0;
  public max: number = 100;
  public numTicks: number = 11;

  constructor() { }

  ngOnInit() {
  }

}
