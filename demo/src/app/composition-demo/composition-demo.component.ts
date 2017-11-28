import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'composition-demo',
  templateUrl: './composition-demo.component.html',
  styleUrls: ['./composition-demo.component.scss']
})
export class CompositionDemoComponent implements OnInit {

  public showVerticalGridlines = true;
  public showHorizontalGridlines = true;

  constructor() { }

  ngOnInit() {
  }

}
