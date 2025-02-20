import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chart {
  id: number;
  name: string;
  type: string;
  color: string;
  dataseries: string;
  xAxisName: string;
  yAxisName: string;
  description: string;
}

interface ChartState {
  charts: Chart[];
}

const initialState: ChartState = {
  charts: [],
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
  },
});

export const { addChart, deleteChart, updateChart } = chartSlice.actions;
export default chartSlice.reducer;
