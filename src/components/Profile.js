import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Profile = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const userId = auth.currentUser.uid;
        const tripsQuery = query(
          collection(db, 'trips'),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(tripsQuery);
        const tripsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTrips(tripsData);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteDoc(doc(db, 'trips', tripId));
      setTrips(trips.filter(trip => trip.id !== tripId));
    } catch (error) {
      console.error('Error deleting trip:', error);
      alert('Failed to delete trip. Please try again.');
    }
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

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            My Trips
          </Typography>
          
          {trips.length === 0 ? (
            <Typography>No trips planned yet.</Typography>
          ) : (
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
                      <Typography variant="body2">
                        {trip.notes || 'No additional notes'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteTrip(trip.id)}
                      >
                        Delete Trip
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
