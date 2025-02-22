import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chart {
  id: number;
  name: string;
  type: string;
  color: string;
  dataseriesName: string;
  dataseries: { value: number; date: string }[];
  xAxisName: string;
  yAxisName: string;
  description: string;
}

interface ChartState {
  charts: Chart[];
  selectedChart: Chart | null;
}

const loadChartsFromStorage = (): Chart[] => {
  const storedCharts = localStorage.getItem("charts");
  return storedCharts ? JSON.parse(storedCharts) : [];
};

const initialState: ChartState = {
  charts: loadChartsFromStorage(), // Load charts from localStorage
  selectedChart: null,
};

const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    addChart: (state, action: PayloadAction<Chart>) => {
      state.charts.push(action.payload);
      localStorage.setItem("charts", JSON.stringify(state.charts));
    },
    deleteChart: (state, action: PayloadAction<number>) => {
      state.charts = state.charts.filter(chart => chart.id !== action.payload);
      localStorage.setItem("charts", JSON.stringify(state.charts));
    },
    updateChart: (state, action: PayloadAction<Chart>) => {
      const index = state.charts.findIndex(chart => chart.id === action.payload.id);
      if (index !== -1) {
        state.charts[index] = action.payload;
        localStorage.setItem("charts", JSON.stringify(state.charts));
      }
    },
    setSelectedChart: (state, action: PayloadAction<Chart | null>) => {
      state.selectedChart = action.payload;
    },
  },
});

export const { addChart, deleteChart, updateChart, setSelectedChart } = chartSlice.actions;
export default chartSlice.reducer;
