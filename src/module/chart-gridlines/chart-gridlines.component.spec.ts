import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGridlinesComponent, Orientation } from './chart-gridlines.component';
import {testRuns, checkIt} from '../../utilities/test-utils';
import { property, gen } from 'testcheck';
import { By } from '@angular/platform-browser';

describe('ChartGridlinesComponent', () => {

  describe('component', () => {
    let component: ChartGridlinesComponent;
    let fixture: ComponentFixture<ChartGridlinesComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ChartGridlinesComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ChartGridlinesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    checkIt('should always render numHorizontalGridLines grid lines', property(
      gen.posInt.suchThat(Number.isFinite),
      gen.oneOf(['horizontal', 'vertical']),
      (i, orientation: Orientation) => {
        component.numLines = i;
        component.orientation = orientation;

        fixture.detectChanges();

        const gridLines = fixture.debugElement.query(By.css('.grid-lines-container')).children
          .filter(c => c.nativeElement.classList.contains('grid-line'));
        return gridLines.length === i;
      }
    ), testRuns.few);
  });
});
