import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLegendDemoComponent } from './chart-legend-demo.component';

describe('ChartLegendDemoComponent', () => {
  let component: ChartLegendDemoComponent;
  let fixture: ComponentFixture<ChartLegendDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartLegendDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLegendDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
