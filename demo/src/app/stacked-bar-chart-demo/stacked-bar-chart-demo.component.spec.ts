import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarChartDemoComponent } from './stacked-bar-chart-demo.component';

describe('StackedBarChartDemoComponent', () => {
  let component: StackedBarChartDemoComponent;
  let fixture: ComponentFixture<StackedBarChartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedBarChartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarChartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
