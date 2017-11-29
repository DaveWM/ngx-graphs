import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGridlinesDemoComponent } from './chart-gridlines-demo.component';

describe('ChartGridlinesDemoComponent', () => {
  let component: ChartGridlinesDemoComponent;
  let fixture: ComponentFixture<ChartGridlinesDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartGridlinesDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartGridlinesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
