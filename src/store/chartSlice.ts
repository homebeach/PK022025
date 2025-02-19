import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chart {
  id: number;
  name: string;
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
  },
});

export const { addChart, deleteChart } = chartSlice.actions;
export default chartSlice.reducer;
