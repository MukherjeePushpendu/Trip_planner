# Trip Planner

A modern travel planning web application built with React, powered by AI recommendations. This application helps users plan their trips efficiently with intelligent suggestions and an intuitive interface.

## Current Features

### Core Features
- AI-powered travel recommendations based on user preferences
- Interactive trip planning interface with drag-and-drop functionality
- Real-time itinerary updates and modifications
- Modern, responsive design for all devices
- User-friendly interface with Material-UI components

### Travel Planning Features
- Destination search with autocomplete
- Trip duration planning
- Budget planning and tracking
- Weather information integration
- Points of interest recommendations
- Interactive maps for location visualization

### Technical Features
- Docker containerization for easy deployment
- Nginx reverse proxy configuration
- Production-optimized React build
- Environment-based configuration
- Gzip compression for better performance

## Upcoming Features

### Phase 1 (Next Release)
- User authentication and profile management
- Save and share trip itineraries
- Advanced AI recommendations using OpenAI API
- Collaborative trip planning
- Real-time flight and hotel pricing

### Phase 2 (Future Release)
- Offline mode support
- Multi-language support
- Trip expense tracking
- Photo gallery for destinations
- Social media integration
- Mobile app version

## Getting Started

### Prerequisites

- Node.js 18 or later
- Docker Desktop
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/MukherjeePushpendu/Trip_planner.git
cd trip-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

### Docker Deployment

#### Quick Start
1. Build and run with Docker Compose:
```bash
docker compose up --build -d
```

The application will be available at http://localhost:3000

#### Manual Docker Steps
1. Build the Docker image:
```bash
docker build -t trip-planner .
```

2. Run the container:
```bash
docker run -d -p 3000:80 --name trip-planner trip-planner
```

#### Docker Configuration Details
- The application runs in a multi-stage Docker build
- Build stage uses node:18-alpine
- Production stage uses nginx:alpine
- Static files are served through Nginx
- Gzip compression enabled for better performance
- Configured for client-side routing
- Production-optimized build settings

## Technologies Used

### Frontend
- React.js 18
- Material-UI
- React Router
- Axios for API calls

### Backend Services
- OpenAI API (upcoming)
- Weather API
- Maps Integration

### DevOps
- Docker
- Nginx
- GitHub Actions (planned)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](https://choosealicense.com/licenses/mit/)
