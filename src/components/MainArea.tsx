import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Typography, Card, CardContent } from "@mui/material";

const MainArea: React.FC = () => {
  const selectedChart = useSelector((state: RootState) => state.charts.selectedChart);

  if (!selectedChart) {
    return <Typography variant="h6">Select a chart from the sidebar</Typography>;
  }

  const options = {
    title: {
      text: selectedChart.name,
    },
    xAxis: {
      title: { text: selectedChart.xAxisName },
      categories: selectedChart.dataseries.map((data: any) => data.date),
    },
    yAxis: {
      title: { text: selectedChart.yAxisName },
    },
    series: [
      {
        name: selectedChart.name,
        data: selectedChart.dataseries.map((data: any) => data.value),
        type: selectedChart.type.toLowerCase(), // e.g., "line", "bar", "pie"
        color: selectedChart.color.toLowerCase(),
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Typography variant="body1">{selectedChart.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default MainArea;
