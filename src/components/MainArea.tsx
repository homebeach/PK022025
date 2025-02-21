import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Button, Typography, Card, CardContent } from "@mui/material";
import { addChart, updateChart, setSelectedChart } from "../store/chartSlice";

import ChartDialog from "./ChartDialog";

const MainArea: React.FC = () => {
  const { chartId } = useParams();
  const charts = useSelector((state: RootState) => state.charts.charts);

  const selectedChart = charts.find(chart => chart.id.toString() === chartId);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(setSelectedChart(selectedChart || null));
  }, [chartId, dispatch, selectedChart]);


  const handleAddChart = () => {
    dispatch(setSelectedChart(null));
    setIsDialogOpen(true);
  };

  const handleSaveChart = (chartData: any) => {
    if (editMode) {
      dispatch(updateChart(chartData));
    } else {
      dispatch(addChart({ id: charts.length + 1, ...chartData }));
    }
    setIsDialogOpen(false);
    setEditMode(false);
    dispatch(setSelectedChart(null));
  };

  if (!charts.length) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Typography variant="h6">No charts created yet.</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
          onClick={handleAddChart}
        >
          + ADD CHART
        </Button>
        <ChartDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveChart}
          editMode={false}
          initialData={null}
        />
      </div>
    );
  }

  if (!selectedChart) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Typography variant="h6">Select a chart from the sidebar</Typography>
      </div>
    );
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
        type: selectedChart.type.toLowerCase(),
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
