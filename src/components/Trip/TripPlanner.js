import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
  Card,
  CardContent,
  Autocomplete,
  Rating,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const steps = ['Basic Info', 'Preferences', 'Activities', 'Accommodations'];

const interests = [
  'Beaches',
  'Mountains',
  'Cities',
  'Historical Sites',
  'Food & Dining',
  'Shopping',
  'Nature',
  'Adventure Sports',
  'Art & Culture',
  'Nightlife',
];

const groupTypes = [
  { value: 'solo', label: 'Solo Travel' },
  { value: 'couple', label: 'Couple' },
  { value: 'family', label: 'Family' },
  { value: 'friends', label: 'Friends Group' },
];

const accommodationTypes = [
  { value: 'hotel', label: 'Hotels', description: 'Comfortable stays with full service' },
  { value: 'hostel', label: 'Hostels', description: 'Budget-friendly shared accommodations' },
  { value: 'apartment', label: 'Apartments', description: 'Home-like stays with kitchen' },
  { value: 'resort', label: 'Resorts', description: 'Luxury stays with amenities' },
];

const TripPlanner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tripData, setTripData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 'medium',
    numberOfPeople: 1,
    groupType: 'solo',
    interests: [],
    activities: [],
    notes: '',
    accommodationType: 'hotel',
    accommodationPreferences: {
      rating: 4,
      maxPrice: '',
      amenities: [],
    },
  });

  useEffect(() => {
    // Load existing trip data if editing
    if (location.state?.trip) {
      setTripData(location.state.trip);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestsChange = (event, newValue) => {
    setTripData((prev) => ({
      ...prev,
      interests: newValue,
    }));
  };

  const handleAccommodationChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({
      ...prev,
      accommodationPreferences: {
        ...prev.accommodationPreferences,
        [name]: value,
      },
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    const newTrip = {
      ...tripData,
      id: location.state?.trip?.id || Date.now(),
      createdAt: new Date().toISOString(),
    };

    if (location.state?.trip) {
      // Update existing trip
      const index = trips.findIndex((t) => t.id === newTrip.id);
      trips[index] = newTrip;
    } else {
      // Add new trip
      trips.push(newTrip);
    }

    localStorage.setItem('trips', JSON.stringify(trips));
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Destination"
                name="destination"
                value={tripData.destination}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                name="startDate"
                value={tripData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                name="endDate"
                value={tripData.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Group Type</InputLabel>
                <Select
                  name="groupType"
                  value={tripData.groupType}
                  onChange={handleChange}
                  label="Group Type"
                >
                  {groupTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Budget Range</InputLabel>
                <Select
                  name="budget"
                  value={tripData.budget}
                  onChange={handleChange}
                  label="Budget Range"
                >
                  <MenuItem value="low">Low (₹0 - ₹20,000)</MenuItem>
                  <MenuItem value="medium">Medium (₹20,000 - ₹50,000)</MenuItem>
                  <MenuItem value="high">High (₹50,000+)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Number of People"
                type="number"
                name="numberOfPeople"
                value={tripData.numberOfPeople}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={interests}
                value={tripData.interests}
                onChange={handleInterestsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Interests"
                    placeholder="Select your interests"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Activities & Notes"
                name="notes"
                value={tripData.notes}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="List your planned activities and any special notes..."
              />
            </Grid>
            {tripData.interests.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Suggested Activities
                </Typography>
                <Grid container spacing={2}>
                  {tripData.interests.map((interest) => (
                    <Grid item xs={12} sm={6} key={interest}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {interest}
                          </Typography>
                          <Typography variant="body2">
                            • Recommended activity 1
                          </Typography>
                          <Typography variant="body2">
                            • Recommended activity 2
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Accommodation Type</InputLabel>
                <Select
                  name="accommodationType"
                  value={tripData.accommodationType}
                  onChange={handleChange}
                  label="Accommodation Type"
                >
                  {accommodationTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography component="legend">Minimum Rating</Typography>
              <Rating
                name="rating"
                value={tripData.accommodationPreferences.rating}
                onChange={(event, newValue) => {
                  handleAccommodationChange({
                    target: { name: 'rating', value: newValue },
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Maximum Price per Night"
                type="number"
                name="maxPrice"
                value={tripData.accommodationPreferences.maxPrice}
                onChange={handleAccommodationChange}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {location.state?.trip ? 'Edit Trip' : 'Plan Your Trip'}
          </Typography>
          {showSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Trip {location.state?.trip ? 'updated' : 'planned'} successfully!
            </Alert>
          )}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep > 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  {location.state?.trip ? 'Update Trip' : 'Save Trip'}
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default TripPlanner;
