import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAxisDemoComponent } from './graph-axis-demo.component';

describe('GraphAxisDemoComponent', () => {
  let component: GraphAxisDemoComponent;
  let fixture: ComponentFixture<GraphAxisDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphAxisDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphAxisDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
