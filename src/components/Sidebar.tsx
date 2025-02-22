import React, { useState, useEffect } from "react";
import {
  Drawer, List, ListItem, ListItemText, IconButton,
  Menu, MenuItem, Button, TextField, Typography, InputAdornment
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addChart, updateChart, deleteChart, setSelectedChart } from "../store/chartSlice";
import ChartDialog from "./ChartDialog";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const charts = useSelector((state: RootState) => state.charts.charts);
  const selectedChart = useSelector((state: RootState) => state.charts.selectedChart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (editMode && selectedChart) {
      setIsDialogOpen(true);
    }
  }, [selectedChart, editMode]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, chart: any) => {
    setAnchorEl(event.currentTarget);
    dispatch(setSelectedChart(chart));
  };

  const handleChartClick = (chart: any) => {
    dispatch(setSelectedChart(chart));
    navigate(`/${chart.id}`);
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
      dispatch(deleteChart(selectedChart.id));
    }
    handleMenuClose();
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
    navigate(`/${charts.length + 1}`);
  };

  const filteredCharts = charts.filter(chart =>
    chart.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Drawer variant="permanent" anchor="left" className="Sidebar">
      <div style={{ padding: 16, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src="/logoipsum-362.svg" alt="Logo" style={{ height: 40, marginBottom: 8 }} />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: 16 }}
        />
        <Button
          variant="contained"
          fullWidth
          style={{ backgroundColor: "#007bff", color: "white" }}
          onClick={() => {
            setEditMode(false);
            dispatch(setSelectedChart(null));
            setIsDialogOpen(true);
          }}
        >
          + ADD CHART
        </Button>
      </div>
      <List>
        {filteredCharts.length > 0 ? (
          filteredCharts.map((chart) => (
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
          ))
        ) : (
          <Typography style={{ textAlign: "center", marginTop: 16, color: "gray" }}>No charts</Typography>
        )}
      </List>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <ChartDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditMode(false);
          dispatch(setSelectedChart(null));
        }}
        onSave={handleSaveChart}
        editMode={editMode}
        initialData={editMode ? selectedChart : null}
      />
    </Drawer>
  );
};

export default Sidebar;
