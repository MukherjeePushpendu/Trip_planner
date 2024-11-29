import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
} from '@mui/icons-material';
import '../styles/TripPlanner.css';

const ItineraryView = ({ itinerary, onEdit, onDelete }) => {
  const renderActivityItem = (activity) => (
    <Box className="activity-item" key={activity.time}>
      <Box className="time-slot">
        <ScheduleIcon fontSize="small" sx={{ mr: 1 }} />
        {activity.time}
      </Box>
      <Box className="activity-details">
        <Typography variant="subtitle1">{activity.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {activity.description}
        </Typography>
      </Box>
      <Typography className="activity-cost">
        ₹{activity.cost.toLocaleString()}
      </Typography>
    </Box>
  );

  const renderDayCard = (day, index) => (
    <Paper className="itinerary-card" key={index}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Day {index + 1}</Typography>
        <Box>
          <Tooltip title="Edit Day">
            <IconButton onClick={() => onEdit(index)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Day">
            <IconButton onClick={() => onDelete(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Location */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LocationIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="subtitle1">{day.location}</Typography>
      </Box>

      {/* Accommodation */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <HotelIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="subtitle1">{day.accommodation}</Typography>
      </Box>

      {/* Meals */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <RestaurantIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Meals</Typography>
        </Box>
        <Typography variant="body2">
          Breakfast: {day.meals.breakfast}
          <br />
          Lunch: {day.meals.lunch}
          <br />
          Dinner: {day.meals.dinner}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Activities */}
      <Typography variant="h6" gutterBottom>
        Activities
      </Typography>
      {day.activities.map(renderActivityItem)}

      {/* Daily Summary */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Daily Budget: ₹{day.totalCost.toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Your Itinerary</Typography>
        <Button variant="contained" color="primary">
          Download PDF
        </Button>
      </Box>

      {itinerary.days.map((day, index) => renderDayCard(day, index))}

      <Box className="budget-summary">
        <Paper className="budget-item">
          <Typography variant="h6">Total Budget</Typography>
          <Typography variant="h4" color="primary">
            ₹{itinerary.totalBudget.toLocaleString()}
          </Typography>
        </Paper>
        <Paper className="budget-item">
          <Typography variant="h6">Spent</Typography>
          <Typography variant="h4" color="error">
            ₹{itinerary.spentAmount.toLocaleString()}
          </Typography>
        </Paper>
        <Paper className="budget-item">
          <Typography variant="h6">Remaining</Typography>
          <Typography variant="h4" color="success">
            ₹{(itinerary.totalBudget - itinerary.spentAmount).toLocaleString()}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ItineraryView;
