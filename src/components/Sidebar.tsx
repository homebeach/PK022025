import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Menu, MenuItem, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteChart } from "../store/chartSlice";
import AddChartDialog from "./AddChartDialog"; // Import the modal component

const Sidebar: React.FC = () => {
  const charts = useSelector((state: RootState) => state.charts.charts);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChart, setSelectedChart] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the modal

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, chartId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedChart(chartId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChart(null);
  };

  const handleEdit = () => {
    console.log("Edit chart", selectedChart);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedChart !== null) {
      dispatch(deleteChart(selectedChart));
    }
    handleMenuClose();
  };

  return (
    <>
      <Drawer variant="permanent" anchor="left">
        <div style={{ padding: 16 }}>
          <Button variant="contained" fullWidth onClick={() => setIsDialogOpen(true)}>
            + ADD CHART
          </Button>
        </div>
        <List>
          {charts.length === 0 ? (
            <ListItem>
              <ListItemText primary="No charts" />
            </ListItem>
          ) : (
            charts.map((chart) => (
              <ListItem
                key={chart.id}
                secondaryAction={
                  <IconButton onClick={(event) => handleMenuOpen(event, chart.id)}>
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={chart.name} />
              </ListItem>
            ))
          )}
        </List>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Drawer>

      {/* Add Chart Modal */}
      <AddChartDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
};

export default Sidebar;
