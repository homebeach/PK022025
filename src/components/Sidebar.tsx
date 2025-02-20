import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Menu, MenuItem, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addChart, updateChart, deleteChart, setSelectedChart } from "../store/chartSlice"; // Import setSelectedChart
import ChartDialog from "./ChartDialog";

const Sidebar: React.FC = () => {
  const charts = useSelector((state: RootState) => state.charts.charts);
  const selectedChart = useSelector((state: RootState) => state.charts.selectedChart); // Get selectedChart from Redux
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Open dialog after selectedChart is set
  useEffect(() => {
    if (editMode && selectedChart) {
      setIsDialogOpen(true);
    }
  }, [selectedChart, editMode]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, chart: any) => {
    setAnchorEl(event.currentTarget);
    dispatch(setSelectedChart(chart)); // Set selected chart when menu is opened
  };

  const handleChartClick = (chart: any) => {
    dispatch(setSelectedChart(chart)); // Set selected chart when chart name is clicked
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedChart && selectedChart.id !== undefined) {
      dispatch(deleteChart(selectedChart.id)); // Only pass id if it's defined
    }
    handleMenuClose();
  };

  const handleSaveChart = (chartData: any) => {
    if (editMode) {
      dispatch(updateChart(chartData)); // Update Redux store
    } else {
      dispatch(addChart({ id: charts.length + 1, ...chartData })); // Add a new chart
    }
    setIsDialogOpen(false);
    setEditMode(false);
    dispatch(setSelectedChart(null)); // Reset selected chart in Redux
  };

  return (
    <>
      <Drawer variant="permanent" anchor="left">
        <div style={{ padding: 16 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setEditMode(false);
              setSelectedChart(null);
              setIsDialogOpen(true);
            }}
          >
            + ADD CHART
          </Button>
        </div>
        <List>
          {charts.map((chart) => (
            <ListItem
              key={chart.id}
              onClick={() => handleChartClick(chart)}
              secondaryAction={
                <IconButton onClick={(event) => handleMenuOpen(event, chart)}>
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemText primary={chart.name} />
            </ListItem>
          ))}
        </List>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Drawer>

      <ChartDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditMode(false);
          setSelectedChart(null);
        }}
        onSave={handleSaveChart}
        editMode={editMode}
        initialData={editMode ? selectedChart : null} // Pass initialData only in edit mode
      />
    </>
  );
};

export default Sidebar;
