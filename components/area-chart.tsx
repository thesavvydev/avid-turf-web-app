import { AgAreaSeriesOptions, AgChartOptions } from "ag-charts-community";
import { AgCharts } from "ag-charts-react";
import { CSSProperties } from "react";

const defaultOptions: AgChartOptions = {
  axes: [
    {
      gridLine: {
        style: [
          {
            stroke: "transparent",
          },
        ],
      },
      label: {
        enabled: false,
      },
      type: "number",
      position: "left",
      title: { enabled: false },
    },
    {
      type: "category",
      position: "bottom",
      label: {
        enabled: false,
      },
    },
  ],
  background: {
    fill: "transparent",
  },
};

export default function AreaChart<T>({
  series,
  data,
  style,
}: {
  series: AgAreaSeriesOptions[];
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
