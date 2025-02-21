import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Chart {
  id: number;
  name: string;
  type: string;
  color: string;
  dataseries: { value: number; date: string }[];
  xAxisName: string;
  yAxisName: string;
  description: string;
}
interface ChartState {
  charts: Chart[];
  selectedChart: Chart | null; // Add selectedChart state
}

const initialState: ChartState = {
  charts: [],
  selectedChart: null, // Initialize as null
};

const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    addChart: (state, action: PayloadAction<Chart>) => {
      state.charts.push(action.payload);
    },
    deleteChart: (state, action: PayloadAction<number>) => {
      state.charts = state.charts.filter(chart => chart.id !== action.payload);
    },
    updateChart: (state, action: PayloadAction<Chart>) => {
      const index = state.charts.findIndex(chart => chart.id === action.payload.id);
      if (index !== -1) {
        state.charts[index] = action.payload; // Replace the existing chart with the new data
      }
    },
    setSelectedChart: (state, action: PayloadAction<Chart | null>) => {
      state.selectedChart = action.payload; // Update selectedChart
    },
  },
});

export const { addChart, deleteChart, updateChart, setSelectedChart } = chartSlice.actions; // Export setSelectedChart
export default chartSlice.reducer;
