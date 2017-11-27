import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {GraphAxisComponent, Scale} from './graph-axis.component';
import * as R from 'ramda';
import {By} from '@angular/platform-browser';

describe('GraphAxisComponent', () => {

  describe('controller', () => {

    // not worth testing this, if it grows more complex it may be worth it
    describe('getOrientation', () => {});

    describe('getTicks', () => {
      it('should return a scale with length "scale.numTicks", beginning at "scale.min", and ending at "scale.max"', () => {
        const ctrl = new GraphAxisComponent();
        const scale: Scale = {
          min: 0,
          max: 10,
          numTicks: 3
        };
        ctrl.scale = scale;

        const result = ctrl.getTicks();

        expect(result).toEqual(['0','5','10']);
      });

      it('should format the ticks according to the formatTickFn, if one is provided', () => {
        const ctrl = new GraphAxisComponent();
        const scale: Scale = {
          min: 0,
          max: 10,
          numTicks: 3
        };
        ctrl.scale = scale;
        ctrl.formatTickFn = (val: number) => '0' + val;

        const result = ctrl.getTicks();

        expect(result).toEqual(['00','05','010']);
      });
    });
  });

  describe('component', () => {
    let component: GraphAxisComponent;
    let fixture: ComponentFixture<GraphAxisComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [GraphAxisComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(GraphAxisComponent);
      component = fixture.componentInstance;
      component.scale = {
        min: 0,
        max: 10,
        numTicks: 10
      };
      component.position = 'left';
      fixture.detectChanges();
    });

    describe('label', () => {
      it('should display a label of the "label" input, iff it is defined', () => {
        const label = 'a label';
        component.label = label;

        fixture.detectChanges();

        const labelElem = fixture.debugElement.query(By.css('.axis__label')).nativeElement;
        expect(labelElem).toBeDefined();
        expect(labelElem.textContent).toContain(label);
      });

      it('should not render the label element if the "label" input is undefined', () => {
        component.label = undefined;

        fixture.detectChanges();

        const labelElem = fixture.debugElement.query(By.css('.axis__label'));
        expect(labelElem).toBeNull();
      })
    });

    describe('ticks', () => {
      it('should display a tick label for each value returned from getTicks', () => {
        const ticks = ['1', '2'];
        spyOn(component, 'getTicks').and.returnValue(ticks);

        fixture.detectChanges();

        const tickElems = fixture.debugElement.queryAll(By.css('.axis__tick'));
        expect(tickElems.length).toBe(2);
        R.zip(ticks, tickElems)
          .forEach(([value, element]) => {
            expect(element.nativeElement.textContent).toContain(value);
          });
      });
    })
  });
});
