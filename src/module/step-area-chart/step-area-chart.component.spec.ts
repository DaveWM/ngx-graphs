import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAreaChartComponent } from './step-area-chart.component';
import {testRuns, checkIt} from '../../utilities/test-utils';
import {gen, property} from 'testcheck';
import svgPathParser = require('svg-path-parser');
import * as R from 'ramda';

describe('StepAreaChartComponent', () => {

  describe('controller', () => {

    function getController(xAxis: [number, number], yAxis: [number, number], data: [number, number][]): StepAreaChartComponent {
      const ctrl = new StepAreaChartComponent();
      ctrl.xAxis = xAxis;
      ctrl.yAxis = yAxis;
      ctrl.data = data;
      return ctrl;
    }

    function isValidPath(s: string) {
      try {
        svgPathParser(s);
        return true;
      } catch (e) {
        return false;
      }
    }

    describe('getPath', () => {
      checkIt('should always return a valid path string', property(
        gen.array(gen.number.suchThat(Number.isFinite), {size: 2}),
        gen.array(gen.number.suchThat(Number.isFinite), {size: 2}),
        gen.array(
          gen.array(gen.number.suchThat(Number.isFinite), {size: 2})
        ),
        (xAxis: [number, number], yAxis: [number, number], data: [number, number][]) => {
          const ctrl = getController(xAxis, yAxis, data);

          const path = ctrl.getPath();

          return isValidPath(path);
        }
        ),
        testRuns.average
      );

      checkIt('should always return a closed path (i.e. ending in "Z") when the data is not empty', property(
        gen.array(gen.number.suchThat(Number.isFinite), {size: 2}),
        gen.array(gen.number.suchThat(Number.isFinite), {size: 2}),
        gen.array(
          gen.array(gen.number.suchThat(Number.isFinite), {size: 2})
        ).notEmpty(),
        (xAxis: [number, number], yAxis: [number, number], data: [number, number][]) => {
          const ctrl = getController(xAxis, yAxis, data);

          const path = ctrl.getPath();

          return R.last(path) === 'Z';
        }
        ),
        testRuns.average
      );

      it('should return an empty string when the data property is an empty array', () => {
        const ctrl = getController([0, 100], [0, 100], []);

        const path = ctrl.getPath();

        expect(path).toEqual('');
      })
    });
  });

  describe('component', () => {
    let component: StepAreaChartComponent;
    let fixture: ComponentFixture<StepAreaChartComponent>;
    const svgCoordinateSize = 100;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [StepAreaChartComponent]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(StepAreaChartComponent);
      component = fixture.componentInstance;
      component.yAxis = [0, 100];
      component.yAxis = [0, 100];
      component.data = [];
      fixture.detectChanges();
    });

    it('should render a path, with a "d" attribute of the value returned from getPath()', () => {
      const d = 'M10 10';
      spyOn(component, 'getPath').and.returnValue('M10 10');

      fixture.detectChanges();

      // can't query for path element directly due to this bug: https://github.com/angular/angular/issues/15164
      const svg = fixture.debugElement.children[0];
      expect(svg).toBeTruthy();
      const path = svg.children[0];
      expect(path).toBeTruthy();
      expect(path.attributes['d']).toEqual(d);
    });

    // see https://en.wiktionary.org/wiki/Manhattan_distance
    // would also like to check area, but there's no easy way to get the area of an svg path
    checkIt(`should render a path with a total length of: 
      (manhattan distance from [0, 0] to the first data point)
      + (sum of the manhattan distances from one data point to the next)
      + (manhattan distance from the last data point to [${svgCoordinateSize}, 0])
      + (total svg x axis (${svgCoordinateSize}))
    when the data is not empty`, property(
      gen.array(
        gen.array(gen.numberWithin(0, 100).suchThat(Number.isFinite), {size: 2})
      ).notEmpty().then((xs: [number, number][]) => R.sortBy((x: [number, number]) => R.head(x) || 0)(xs)),
      (data: [number, number][]) => {
        // use data points in same coordinate system as svg, to simplify test
        component.xAxis = [0, svgCoordinateSize];
        component.yAxis = [0, svgCoordinateSize];
        component.data = data;

        fixture.detectChanges();

        const path = fixture.debugElement.children[0].children[0].nativeElement;
        const expectedPathLength: number = R.pipe(
          R.prepend([0, 0]),
          R.append([svgCoordinateSize, 0]),
          R.aperture(2),
          R.map(
            ([[x1, y1], [x2, y2]]) => Math.abs(x2 - x1) + Math.abs(y2 - y1)
          ),
          R.sum,
          R.add(svgCoordinateSize)
        )(data);

          if(path.getTotalLength() !== expectedPathLength){
            console.log(path.getTotalLength(), expectedPathLength);
          }
        return path.getTotalLength() === expectedPathLength;
      }),
      testRuns.few
    );

    it('should render a path with an empty "d" attr when the data is empty', () => {
      component.data = [];
      component.xAxis = [0, svgCoordinateSize];
      component.yAxis = [0, svgCoordinateSize];

      fixture.detectChanges();

      const path = fixture.debugElement.children[0].children[0];
      expect(path.attributes['d']).toEqual('');
    })
  });
});
