import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Button, Typography, Card, CardContent, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { addChart, updateChart, setSelectedChart } from "../store/chartSlice";
import ChartDialog from "./ChartDialog";
import { parseISO, format } from "date-fns";

const MainArea: React.FC = () => {
  const { chartId } = useParams();
  const navigate = useNavigate();
  const charts = useSelector((state: RootState) => state.charts.charts);
  const selectedChart = charts.find(chart => chart.id.toString() === chartId);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    dispatch(setSelectedChart(selectedChart || null));

    if (selectedChart) {
      const dates = selectedChart.dataseries.map((d: any) => parseISO(d.date));
      setDateRange([new Date(Math.min(...dates.map(d => d.getTime()))), new Date(Math.max(...dates.map(d => d.getTime())))]);
    }
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

  if (chartId && !selectedChart) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-center p-6">
        <Typography variant="h1" style={{ fontSize: "6rem", fontWeight: "bold", color: "#ccc" }}>
          404
        </Typography>
        <Typography variant="h6" style={{ marginTop: "1rem", color: "#666" }}>
          Chart not found. Please try again.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
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

  const filteredData = selectedChart.dataseries.filter((data: any) => {
    const dataDate = parseISO(data.date);
    return (!dateRange[0] || dataDate >= dateRange[0]) && (!dateRange[1] || dataDate <= dateRange[1]);
  });

  const options = {
    title: { text: selectedChart.name },
    xAxis: {
      title: { text: selectedChart.xAxisName },
      categories: filteredData.map((data: any) => format(parseISO(data.date), "yyyy-MM-dd")),
    },
    yAxis: { title: { text: selectedChart.yAxisName } },
    series: [
      {
        name: selectedChart.name,
        data: filteredData.map((data: any) => data.value),
        type: selectedChart.type.toLowerCase(),
        color: selectedChart.color.toLowerCase(),
      },
    ],
  };


   return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{selectedChart.name}</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box display="flex" gap={2}>
              <DatePicker
                label="From"
                value={dateRange[0]}
                onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
              />
              <DatePicker
                label="To"
                value={dateRange[1]}
                onChange={(newValue) => setDateRange([dateRange[0], newValue])}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Typography variant="body1">{selectedChart.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default MainArea;