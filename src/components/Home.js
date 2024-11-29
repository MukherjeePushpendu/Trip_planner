import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Trip Planner
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Plan your perfect trip with ease
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/plan-trip')}
              >
                Plan a New Trip
              </Button>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 6 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Plan Your Journey
                </Typography>
                <Typography>
                  Create detailed itineraries with budget tracking and activity planning.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Smart Budgeting
                </Typography>
                <Typography>
                  Choose from different budget ranges and get personalized recommendations.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Track Everything
                </Typography>
                <Typography>
                  Keep all your travel plans organized in one place.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
