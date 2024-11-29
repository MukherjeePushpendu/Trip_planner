import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
} from '@mui/material';
import {
  FlightTakeoff,
  Hotel,
  Restaurant,
  LocalActivity,
  AttachMoney,
  Schedule,
  Star,
  AutoAwesome,
} from '@mui/icons-material';
import '../styles/TripPlanner.css';

const features = [
  {
    icon: <AutoAwesome />,
    title: 'AI-Powered Planning',
    description: 'Get personalized travel recommendations based on your preferences',
  },
  {
    icon: <Schedule />,
    title: 'Smart Scheduling',
    description: 'Efficiently organized itineraries that maximize your time',
  },
  {
    icon: <AttachMoney />,
    title: 'Budget Optimization',
    description: 'Stay within your budget while experiencing the best',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'The AI recommendations were spot-on! Saved me hours of planning.',
    rating: 5,
  },
  {
    name: 'John D.',
    text: 'Perfect balance of activities and free time in my itinerary.',
    rating: 5,
  },
  {
    name: 'Emily R.',
    text: 'Made planning our family vacation so much easier!',
    rating: 5,
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');

  const handleGetStarted = () => {
    navigate('/trip-planner', { state: { destination } });
  };

  return (
    <Box className="homepage-wrapper">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" className="hero-title" gutterBottom>
                Plan Your Dream Trip with AI
              </Typography>
              <Typography variant="h5" className="hero-subtitle" gutterBottom>
                Create personalized travel itineraries in minutes
              </Typography>
              <Box className="search-box">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  InputProps={{
                    startAdornment: <FlightTakeoff className="search-icon" />,
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  className="get-started-btn"
                >
                  Plan My Trip
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="hero-image-container">
                <img
                  src="/images/hero-image.png"
                  alt="AI Travel Planning"
                  className="hero-image"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className="features-section">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title" gutterBottom>
            Why Choose WonderPlan
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="feature-card">
                  <CardContent>
                    <IconButton className="feature-icon">
                      {feature.icon}
                    </IconButton>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box className="how-it-works-section">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box className="step-box">
                <Typography variant="h1" className="step-number">1</Typography>
                <Typography variant="h6">Tell us your preferences</Typography>
                <Typography variant="body1">
                  Share your travel style, interests, and budget
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="step-box">
                <Typography variant="h1" className="step-number">2</Typography>
                <Typography variant="h6">AI creates your itinerary</Typography>
                <Typography variant="body1">
                  Get personalized recommendations and schedules
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="step-box">
                <Typography variant="h1" className="step-number">3</Typography>
                <Typography variant="h6">Customize and enjoy</Typography>
                <Typography variant="body1">
                  Fine-tune your plan and start your journey
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box className="testimonials-section">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title" gutterBottom>
            What Travelers Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="testimonial-card">
                  <CardContent>
                    <Box className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="star-icon" />
                      ))}
                    </Box>
                    <Typography variant="body1" paragraph>
                      "{testimonial.text}"
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      {testimonial.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className="cta-section">
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" paragraph>
            Let AI plan your perfect trip today
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            className="cta-button"
          >
            Start Planning Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
