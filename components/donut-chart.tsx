import {
  AgAreaSeriesOptions,
  AgChartOptions,
  AgDonutSeriesOptions,
} from "ag-charts-community";
import { AgCharts } from "ag-charts-react";
import { CSSProperties } from "react";

const defaultOptions: AgChartOptions = {
  background: {
    fill: "transparent",
  },
  legend: {
    enabled: false,
  },
};

export default function DonutChart<T>({
  series,
  data,
  style,
}: {
  series: AgDonutSeriesOptions[];
  data: T[];
  style?: CSSProperties;
}) {
  return (
    <AgCharts
      options={
        {
          ...defaultOptions,
          series,
          data,
        } as AgChartOptions
      }
      style={style}
    />
  );
}
