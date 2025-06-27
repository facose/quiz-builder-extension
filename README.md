# AI Question Builder - Rails + React

A tool for teachers to generate quiz questions with AI assistance. This starter repo provides a Rails API backend with a separate React frontend.

## What You'll Build

During the interview, you'll add AI-powered question generation to this quiz builder app:

1. **Rails Backend**:
   - Create `/api/v1/questions/generate` endpoint
   - Implement `QuestionGenerator` service with OpenAI integration
   - Handle errors and edge cases appropriately

2. **React Frontend**:
   - Add "Generate with AI" button to the question form
   - Implement loading states during generation
   - Display generated questions with proper error handling

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

### To Be Implemented
- `POST /api/v1/questions/generate` - Generate a question with AI

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
4. Existing code has strategic TODO comments to guide you

## What We're Looking For

- Clean, idiomatic code in both Rails and React
- Proper error handling and user feedback
- Understanding of API design principles
- Thoughtful approach to AI integration
- Good testing practices

Good luck! We're excited to see what you build.