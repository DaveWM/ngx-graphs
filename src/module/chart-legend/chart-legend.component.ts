import {Component, Input, OnInit} from '@angular/core';
import { LegendKey } from './../../types';

@Component({
  selector: 'chart-legend',
  templateUrl: './chart-legend.component.html',
  styleUrls: ['./chart-legend.component.scss']
})
export class ChartLegendComponent implements OnInit {

  @Input()
  public keys: LegendKey[] = [];

  constructor() { }

  ngOnInit() {
  }

}
