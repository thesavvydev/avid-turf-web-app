import { AgAreaSeriesOptions, AgChartOptions } from "ag-charts-community";
import { AgCharts } from "ag-charts-react";

const defaultOptions = {
  axes: [
    {
      gridLine: {
        width: 4,
        style: [
          {
            stroke: "#FFFFFF10",
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
}: {
  series: AgAreaSeriesOptions[];
  data: T[];
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
    />
  );
}
