import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface AddChartDialogProps {
  open: boolean;
  onClose: () => void;
}

const chartTypes = ["Line", "Bar", "Pie"];
const colors = ["Black", "Blue", "Red"];

const AddChartDialog: React.FC<AddChartDialogProps> = ({ open, onClose }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      type: "Line",
      color: "Black",
      xAxisName: "",
      yAxisName: "",
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Chart Data:", data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Chart</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            name="xAxisName"
            control={control}
            render={({ field }) => <TextField {...field} label="X-axis name" fullWidth margin="normal" />}
          />

          <Controller
            name="yAxisName"
            control={control}
            render={({ field }) => <TextField {...field} label="Y-axis name" fullWidth margin="normal" />}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField {...field} label="Text description" multiline fullWidth margin="normal" />}
          />

          <DialogActions>
            <Button onClick={onClose}>CANCEL</Button>
            <Button type="submit">ADD CHART</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddChartDialog;
