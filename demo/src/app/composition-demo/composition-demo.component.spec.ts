import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionDemoComponent } from './composition-demo.component';

describe('CompositionDemoComponent', () => {
  let component: CompositionDemoComponent;
  let fixture: ComponentFixture<CompositionDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositionDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
