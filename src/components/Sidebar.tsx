import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Menu, MenuItem, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addChart, updateChart, deleteChart } from "../store/chartSlice";
import ChartDialog from "./ChartDialog";

const Sidebar: React.FC = () => {
  const charts = useSelector((state: RootState) => state.charts.charts);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChart, setSelectedChart] = useState<any | null>(null);
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
    setSelectedChart(chart); // Set chart to be edited
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedChart) {
      dispatch(deleteChart(selectedChart.id));
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
    setSelectedChart(null);
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
