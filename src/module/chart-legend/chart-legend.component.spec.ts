import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ChartLegendComponent, LegendKey} from './chart-legend.component';
import {gen, property, Generator} from "testcheck";
import {testRuns, checkIt} from '../../utilities/test-utils';
import {By} from "@angular/platform-browser";
import * as R from "ramda";
import {DebugElement} from "@angular/core";

const colourGenerator: Generator<string> = gen.oneOf([
  'red', 'green', 'yellow', 'blue', 'black', 'white', 'purple', 'pink'
]);

const legendKeyGenerator: Generator<LegendKey> = <Generator<LegendKey>>gen.object({
  colour: colourGenerator,
  label: gen.string
});

describe('ChartLegendComponent', () => {
  let component: ChartLegendComponent;
  let fixture: ComponentFixture<ChartLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartLegendComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  checkIt('should render all the given keys', property(
    gen.array(legendKeyGenerator),
    (legendKeys) => {
      component.keys = legendKeys;

      fixture.detectChanges();

      const keys = fixture.debugElement.queryAll(By.css('.key'));
      return keys.length === legendKeys.length;
    }
  ), testRuns.few);

  checkIt('should render the labels of all keys (in order)', property(
    gen.array(legendKeyGenerator),
    (legendKeys) => {
      component.keys = legendKeys;

      fixture.detectChanges();

      const keyElems = fixture.debugElement.queryAll(By.css('.key'));
      return R.pipe<DebugElement[], [LegendKey, DebugElement][], boolean>(
        R.zip(legendKeys),
        R.all(([keyData, keyElem]: [LegendKey, DebugElement]) =>
          R.contains(keyData.label, keyElem.nativeElement.textContent))
      )(keyElems);
    }
  ), testRuns.few);

  checkIt('should render an element showing the colour of each key (in order)', property(
    gen.array(legendKeyGenerator),
    (legendKeys) => {
      component.keys = legendKeys;

      fixture.detectChanges();

      const keyColourElems = fixture.debugElement.queryAll(By.css('.key__colour'));
      return R.pipe<DebugElement[], [LegendKey, DebugElement][], boolean>(
        R.zip(legendKeys),
        R.all(([keyData, keyColourElem]: [LegendKey, DebugElement]) =>
          keyColourElem.styles['background-color'] === keyData.colour)
      )(keyColourElems);
    }
  ), testRuns.few);
});
