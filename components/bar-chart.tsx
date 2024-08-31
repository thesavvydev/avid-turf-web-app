import { AgBarSeriesOptions, AgChartOptions } from "ag-charts-community";
import { AgCharts } from "ag-charts-react";

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
    },
    {
      type: "category",
      position: "bottom",
      label: {
        enabled: false,
      },
      title: { enabled: false },
    },
  ],
  background: {
    fill: "transparent",
  },
  legend: {
    enabled: false,
  },
};

export default function BarChart<T>({
  series,
  data,
}: {
  series: AgBarSeriesOptions[];
  data: T[];
}) {
  return (
    <AgCharts
      className="bg-white dark:bg-gray-900"
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
