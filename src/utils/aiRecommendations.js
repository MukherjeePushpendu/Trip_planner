// AI-powered recommendation system
const generateRecommendations = (preferences) => {
  const { budget, interests, groupType, dietaryRequirements, destination } = preferences;

  // Simulated AI recommendations based on user preferences
  const recommendations = {
    activities: generateActivities(interests, budget, groupType),
    accommodations: generateAccommodations(budget, groupType),
    restaurants: generateRestaurants(dietaryRequirements, budget),
    insights: generateInsights(preferences),
  };

  return recommendations;
};

const generateActivities = (interests, budget, groupType) => {
  // Simulated activity recommendations
  const activityMap = {
    'sightseeing': [
      { name: 'Guided City Tour', cost: 'medium', duration: '3 hours', rating: 4.5 },
      { name: 'Historical Walking Tour', cost: 'low', duration: '2 hours', rating: 4.3 },
      { name: 'Museum Pass', cost: 'medium', duration: 'Full day', rating: 4.4 },
    ],
    'outdoor': [
      { name: 'Hiking Adventure', cost: 'low', duration: '4 hours', rating: 4.6 },
      { name: 'Bike Tour', cost: 'medium', duration: '3 hours', rating: 4.4 },
      { name: 'Water Sports', cost: 'high', duration: '2 hours', rating: 4.7 },
    ],
    'food': [
      { name: 'Local Food Tour', cost: 'medium', duration: '3 hours', rating: 4.8 },
      { name: 'Cooking Class', cost: 'high', duration: '4 hours', rating: 4.6 },
      { name: 'Wine Tasting', cost: 'medium', duration: '2 hours', rating: 4.5 },
    ],
  };

  let recommendations = [];
  interests.forEach(interest => {
    if (activityMap[interest]) {
      recommendations = [...recommendations, ...activityMap[interest]];
    }
  });

  // Filter based on budget
  return recommendations.filter(activity => {
    if (budget === 'low') return activity.cost === 'low';
    if (budget === 'medium') return activity.cost !== 'high';
    return true; // For high budget, include all activities
  });
};

const generateAccommodations = (budget, groupType) => {
  const accommodations = [
    {
      type: 'hotel',
      name: 'Luxury Hotel',
      cost: 'high',
      amenities: ['Pool', 'Spa', 'Restaurant'],
      rating: 4.8,
    },
    {
      type: 'apartment',
      name: 'City Center Apartment',
      cost: 'medium',
      amenities: ['Kitchen', 'Washer', 'WiFi'],
      rating: 4.5,
    },
    {
      type: 'hostel',
      name: 'Backpackers Hostel',
      cost: 'low',
      amenities: ['Shared Kitchen', 'Common Room', 'WiFi'],
      rating: 4.2,
    },
  ];

  // Filter based on budget and group type
  return accommodations.filter(acc => {
    if (budget === 'low') return acc.cost === 'low';
    if (budget === 'medium') return acc.cost !== 'high';
    return true;
  });
};

const generateRestaurants = (dietaryRequirements, budget) => {
  const restaurants = [
    {
      name: 'Local Bistro',
      cuisine: 'Local',
      cost: 'medium',
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-free'],
      rating: 4.6,
    },
    {
      name: 'Fine Dining Experience',
      cuisine: 'International',
      cost: 'high',
      dietaryOptions: ['Vegetarian', 'Halal'],
      rating: 4.8,
    },
    {
      name: 'Street Food Market',
      cuisine: 'Various',
      cost: 'low',
      dietaryOptions: ['Vegetarian', 'Vegan'],
      rating: 4.4,
    },
  ];

  // Filter based on dietary requirements and budget
  return restaurants.filter(restaurant => {
    const meetsRequirements = dietaryRequirements.every(req =>
      restaurant.dietaryOptions.includes(req)
    );
    const meetsBudget = budget === 'high' || 
      (budget === 'medium' && restaurant.cost !== 'high') ||
      (budget === 'low' && restaurant.cost === 'low');
    
    return meetsRequirements && meetsBudget;
  });
};

const generateInsights = (preferences) => {
  // Generate AI insights based on preferences
  return [
    `Based on your ${preferences.groupType} travel style, we recommend focusing on ${preferences.interests.join(' and ')} activities.`,
    `Your ${preferences.budget} budget allows for various ${preferences.budget === 'high' ? 'luxury' : preferences.budget === 'medium' ? 'mid-range' : 'budget-friendly'} options.`,
    'Consider visiting during off-peak seasons for better deals.',
    'Local transportation options are recommended for authentic experiences.',
  ];
};

export { generateRecommendations };
