import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import dataseriesData from "../data/dataseries.json"; // Adjust path if needed

interface Chart {
  id?: number;
  name: string;
  type: string;
  color: string;
  dataseries: string;
  xAxisName: string;
  yAxisName: string;
  description: string;
}

interface ChartDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (chartData: Chart) => void;
  editMode?: boolean;
  initialData?: Chart | null;
}

const chartTypes = ["Line", "Bar", "Pie"];
const colors = ["Black", "Blue", "Red"];

const ChartDialog: React.FC<ChartDialogProps> = ({ open, onClose, onSave, editMode = false, initialData }) => {
  const { control, handleSubmit, setValue, watch, reset } = useForm<Chart>({
    defaultValues: {
      name: "",
      type: "Line",
      color: "Black",
      dataseries: "",
      xAxisName: "Date",
      yAxisName: "Value",
      description: "",
    },
  });

  console.log("this is initialData");
  console.log(initialData);

  const [dataseriesList, setDataseriesList] = useState<{ name: string; dataseries: { value: number; date: string }[] }[]>([]);

  useEffect(() => {
    setDataseriesList(dataseriesData);
  }, []);

  // Prefill form in edit mode
  useEffect(() => {
    if (editMode && initialData) {
      reset(initialData); // Load existing chart data
    } else {
      reset({
        name: "",
        type: "Line",
        color: "Black",
        dataseries: "",
        xAxisName: "Date",
        yAxisName: "Value",
        description: "",
      });
    }
  }, [editMode, initialData, reset]);

  const selectedDataseries = watch("dataseries");

  useEffect(() => {
    if (selectedDataseries) {
      setValue("xAxisName", "Date");
      setValue("yAxisName", "Value");
    }
  }, [selectedDataseries, setValue]);

  const handleFormSubmit = (data: Chart) => {
    const updatedChart = { ...initialData, ...data }; // Preserve the existing ID if editing
    onSave(updatedChart);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? "Edit Chart" : "Add Chart"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} label="Name" required fullWidth margin="normal" />}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Type" required fullWidth margin="normal">
                {chartTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Color" required fullWidth margin="normal">
                {colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="dataseries"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Dataseries" required fullWidth margin="normal">
                {dataseriesList.map((ds) => (
                  <MenuItem key={ds.name} value={ds.name}>
                    {ds.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="xAxisName"
                control={control}
                render={({ field }) => <TextField {...field} label="X-axis name" fullWidth margin="normal" />}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="yAxisName"
                control={control}
                render={({ field }) => <TextField {...field} label="Y-axis name" fullWidth margin="normal" />}
              />
            </Grid>
          </Grid>

          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField {...field} label="Description" multiline fullWidth margin="normal" />}
          />

          <DialogActions>
            <Button onClick={onClose}>CANCEL</Button>
            <Button type="submit">{editMode ? "SAVE CHANGES" : "ADD CHART"}</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChartDialog;
