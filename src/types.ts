export type Orientation = "horizontal" | "vertical";

export type LegendKey = {
  colour: string,
  label: string
};

export type Scale = {
  min: number,
  max: number,
  numTicks: number
};

// would be better as an enum, but it's harder to use in templates
export type AxisPosition = 'top' | 'bottom' | 'left' | 'right';

export type BarChartSeries = {
  colour: string,
  data: number[]
}