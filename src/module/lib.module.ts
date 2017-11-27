import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ChartGridlinesComponent } from './chart-gridlines/chart-gridlines.component';
import { ChartLegendComponent } from './chart-legend/chart-legend.component';
import { StepAreaChartComponent } from './step-area-chart/step-area-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { GraphAxisComponent } from './graph-axis/graph-axis.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ChartGridlinesComponent, ChartLegendComponent, StepAreaChartComponent, StackedBarChartComponent, GraphAxisComponent],
  declarations: [ChartGridlinesComponent, ChartLegendComponent, StepAreaChartComponent, StackedBarChartComponent, GraphAxisComponent]
})
export class LibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibModule
    };
  }
}
