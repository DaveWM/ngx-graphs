import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {StackedBarChartComponent, Series, BarPart} from './stacked-bar-chart.component';
import {property, gen, Generator} from "testcheck";
import {testRuns, checkIt} from '../../utilities/test-utils';
import * as R from "ramda";
import {By} from "@angular/platform-browser";

const colourGenerator: Generator<string> = gen.oneOf([
  'red', 'green', 'yellow', 'blue', 'black', 'white', 'purple', 'pink'
]);

export const seriesGenerator: Generator<Series> = <Generator<Series>>gen.object({
  colour: colourGenerator,
  data: gen.array(gen.number)
});

describe('StackedBarChartComponent', () => {

  describe('component', () => {
    let component: StackedBarChartComponent;
    let fixture: ComponentFixture<StackedBarChartComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ StackedBarChartComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(StackedBarChartComponent);
      component = fixture.componentInstance;
      component.series = [];
      component.yAxis = [0, 100];
      fixture.detectChanges();
    });

    it('should render one "bar" svg per bar in the "bars" array', () => {
      const bars: BarPart[][] = [[{colour: 'red', value: 100}], [{colour: 'blue', value: 50}]];
      spyOn(component, 'getBars').and.returnValue(bars);

      fixture.detectChanges();

      // can't query for svgs directly due to bug in angular
      const barElems = fixture.debugElement.query(By.css('.main')).children;
      expect(barElems.length).toEqual(bars.length);
    });
  });

  describe('controller', () => {
    describe('getBars', () => {
      it('should return an empty array when there are no series', () => {
        const ctrl = new StackedBarChartComponent();
        ctrl.series = [];

        expect(ctrl.getBars()).toEqual([]);
      });

      checkIt('should return an array of bars with length <= the number of series', property(
        gen.array(seriesGenerator),
        (series: Series[]) => {
          const ctrl = new StackedBarChartComponent();
          ctrl.series = series;

          return R.all(b => b.length <= series.length, ctrl.getBars());
        }
      ));

      checkIt('should return one bar part for each datum in each series', property(
        gen.array(seriesGenerator),
        (series: Series[]) => {
          const ctrl = new StackedBarChartComponent();
          ctrl.series = series;

          return R.reduce((acc: number, b: any[]) => acc + b.length, 0, ctrl.getBars())
            == R.reduce((acc: number, s: Series) => acc + s.data.length, 0, series);
        }
      ));

      checkIt('should return an array with a length of the length the biggest series', property(
        gen.array(seriesGenerator),
        (series: Series[]) => {
          const ctrl = new StackedBarChartComponent();
          ctrl.series = series;

          const maxSeriesLength = R.pipe<Series[], number[], number>(
            R.map((s: Series) => s.data.length),
            R.reduce(R.max, 0)
          )(series);

          return ctrl.getBars().length === maxSeriesLength;
        }
      ))
    });
  })
});
