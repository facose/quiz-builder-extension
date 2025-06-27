# AI Question Builder - Rails + React

A tool for teachers to generate quiz questions with AI assistance. This starter repo provides a Rails API backend with a separate React frontend.

## Interview Task

During the interview, you'll enhance this quiz builder app by adding AI-powered question generation functionality. The specific implementation approach is up to you - we want to see how you think about and solve the problem.

## Quick Start (2 minutes with Docker)

### Option 1: Docker (Recommended)
```bash
# One command setup - includes PostgreSQL, Rails API, and React frontend
docker-compose up --build

# Visit the application:
# Frontend: http://localhost:5173
# API: http://localhost:3000
```

### Option 2: Local Development

#### Prerequisites
- Ruby 3.2+ and Node.js 18+
- PostgreSQL running locally
- OpenAI API key (we'll provide this during the interview)

#### Backend Setup
```bash
cd backend
bundle install
cp .env.example .env  # Add your OpenAI API key here
rails db:create db:migrate db:seed
rails server  # Runs on http://localhost:3000
```

#### Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

#### Or use the convenience script:
```bash
./scripts/dev.sh  # Starts both servers
```

## Architecture Overview

- **Backend**: Rails API-only application serving JSON
- **Frontend**: React SPA with TypeScript and Vite
- **Database**: PostgreSQL for question storage
- **State Management**: React Query for server state
- **Styling**: Tailwind CSS for consistent UI
- **Testing**: RSpec (backend) and Jest (frontend)

## API Endpoints

### Currently Implemented
- `GET /api/v1/questions` - List all questions
- `POST /api/v1/questions` - Create a new question manually

### Your Task
- Add AI question generation capability

## Project Structure

```
backend/
├── app/
│   ├── controllers/api/v1/  # API controllers
│   ├── models/               # ActiveRecord models
│   └── services/             # Business logic (you'll add here)
├── spec/                     # RSpec tests
└── .env.example              # Environment variables template

frontend/
├── src/
│   ├── api/        # API client functions
│   ├── components/ # React components
│   ├── hooks/      # Custom React hooks
│   └── types/      # TypeScript interfaces
└── __tests__/      # Component tests
```

## Development Tips

1. The Rails server must be running for the React app to work
2. API requests from React are proxied through Vite to avoid CORS issues
3. Check the browser console and Rails logs for debugging

## What We're Looking For

- Clean, idiomatic code in both Rails and React
- Proper error handling and user feedback
- Understanding of API design principles
- Thoughtful approach to AI integration
- Good testing practices

Good luck! We're excited to see what you build.