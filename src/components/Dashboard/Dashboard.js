import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    setTrips(storedTrips);
  }, []);

  const handleDeleteTrip = (tripId) => {
    const updatedTrips = trips.filter((trip) => trip.id !== tripId);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
  };

  const handleEditTrip = (trip) => {
    navigate('/plan-trip', { state: { trip } });
  };

  const handleDownloadPDF = (trip) => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(`Trip to ${trip.destination}`, 20, 20);
    
    // Add trip details
    doc.setFontSize(12);
    doc.text(`Dates: ${trip.startDate} to ${trip.endDate}`, 20, 40);
    doc.text(`Budget Range: ${trip.budget.toUpperCase()}`, 20, 50);
    doc.text(`Number of People: ${trip.numberOfPeople}`, 20, 60);
    
    // Add activities
    doc.text('Activities & Notes:', 20, 80);
    doc.setFontSize(10);
    const notes = trip.notes || 'No activities planned';
    doc.text(notes, 20, 90);
    
    // Save the PDF
    doc.save(`${trip.destination}_trip_plan.pdf`);
  };

  const handleViewDeals = (trip) => {
    setSelectedTrip(trip);
    setOpenDialog(true);
  };

  const getBudgetColor = (budget) => {
    switch (budget) {
      case 'low':
        return 'success';
      case 'medium':
        return 'primary';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            My Travel Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/plan-trip')}
            sx={{ mb: 3 }}
          >
            Plan New Trip
          </Button>
          
          <Grid container spacing={3}>
            {trips.map((trip) => (
              <Grid item xs={12} md={6} key={trip.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {trip.destination}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={`Budget: ${trip.budget.toUpperCase()}`}
                        color={getBudgetColor(trip.budget)}
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={`${trip.numberOfPeople} People`}
                        variant="outlined"
                      />
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      {new Date(trip.startDate).toLocaleDateString()} -{' '}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {trip.notes || 'No additional notes'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleEditTrip(trip)} title="Edit Trip">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTrip(trip.id)} title="Delete Trip">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDownloadPDF(trip)} title="Download PDF">
                      <DownloadIcon />
                    </IconButton>
                    <IconButton onClick={() => handleViewDeals(trip)} title="View Deals">
                      <OfferIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      {/* Deals Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Exclusive Deals for {selectedTrip?.destination}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Flight Deals
              </Typography>
              <Typography>
                • Expedia: Up to 20% off on round-trip flights
              </Typography>
              <Typography>
                • Skyscanner: Special rates for {selectedTrip?.destination}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Accommodation
              </Typography>
              <Typography>
                • Booking.com: 15% off on selected hotels
              </Typography>
              <Typography>
                • Airbnb: Special weekly rates available
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Activities
              </Typography>
              <Typography>
                • GetYourGuide: 10% off on local tours
              </Typography>
              <Typography>
                • Klook: Special package deals available
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
