const API_URL = 'http://localhost:5000/api';

export const generateTripPlan = async (tripData) => {
    try {
        const response = await fetch(`${API_URL}/generate-trip-plan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate trip plan');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error in generateTripPlan:', error);
        throw error;
    }
};

export const getTravelInsights = async (destination, season) => {
    try {
        const response = await fetch(`${API_URL}/travel-insights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ destination, season }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to get travel insights');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error in getTravelInsights:', error);
        throw error;
    }
};
