import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAreaChartDemoComponent } from './step-area-chart-demo.component';

describe('StepAreaChartDemoComponent', () => {
  let component: StepAreaChartDemoComponent;
  let fixture: ComponentFixture<StepAreaChartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepAreaChartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepAreaChartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
