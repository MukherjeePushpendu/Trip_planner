const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Generate AI Trip Plan
app.post('/api/generate-trip-plan', async (req, res) => {
    try {
        const { destination, groupType, budget, interests, duration, dietaryRequirements } = req.body;

        const prompt = `Plan a ${duration}-day trip to ${destination} for ${groupType} within a ${budget} budget.
        Interests: ${interests.join(', ')}
        Dietary Requirements: ${dietaryRequirements.join(', ')}
        
        Please provide a detailed itinerary including:
        1. Daily activities and attractions
        2. Restaurant recommendations considering dietary requirements
        3. Accommodation suggestions
        4. Transportation tips
        5. Estimated costs for activities
        6. Local customs and tips
        
        Format the response in a clear, day-by-day structure.`;

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1000,
            temperature: 0.7,
        });

        const tripPlan = completion.data.choices[0].text;
        
        // Parse and structure the response
        const structuredPlan = {
            destination,
            duration,
            groupType,
            budget,
            interests,
            dietaryRequirements,
            itinerary: tripPlan,
            generatedAt: new Date().toISOString(),
        };

        res.json(structuredPlan);
    } catch (error) {
        console.error('Error generating trip plan:', error);
        res.status(500).json({ error: 'Failed to generate trip plan' });
    }
});

// Get travel insights
app.post('/api/travel-insights', async (req, res) => {
    try {
        const { destination, season } = req.body;

        const prompt = `Provide travel insights for ${destination} during ${season}, including:
        1. Weather conditions
        2. Peak vs. off-peak considerations
        3. Local events and festivals
        4. Travel tips and precautions
        5. Cultural considerations`;

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.7,
        });

        res.json({ insights: completion.data.choices[0].text });
    } catch (error) {
        console.error('Error getting travel insights:', error);
        res.status(500).json({ error: 'Failed to get travel insights' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
