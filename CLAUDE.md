# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is an **AI-powered quiz question builder** designed for teachers and educators to generate quiz questions with AI assistance. The application serves as a technical interview starter project that demonstrates Rails + React architecture patterns.

### Core Functionality
- **Manual Question Creation**: Teachers can create quiz questions by entering topic, difficulty, and question text
- **AI-Powered Generation**: Integration with OpenAI to automatically generate questions based on topic and difficulty level
- **Question Management**: View, create, and manage a library of quiz questions
- **Educational Focus**: Designed specifically for academic and training environments

### Interview Context
This starter repo is used for technical interviews to evaluate candidates' ability to:
- Add AI integration to existing Rails applications
- Implement React frontend features with proper state management
- Handle async operations and error states
- Follow Rails and React best practices
- Design scalable API endpoints

## Development Commands

### Docker (Recommended)
```bash
# Start all services (PostgreSQL, Rails API, React frontend)
docker-compose up --build

# Access applications:
# Frontend: http://localhost:5173
# API: http://localhost:3000
```

### Local Development
```bash
# Backend (Rails API)
cd backend
bundle install
rails db:create db:migrate db:seed
rails server  # Runs on port 3000

# Frontend (React)
cd frontend
npm install
npm run dev  # Runs on port 5173

# Convenience script (starts both servers)
./scripts/dev.sh
```

### Testing
```bash
# Rails backend tests
cd backend
bundle exec rspec

# React frontend tests
cd frontend
npm test        # Watch mode
npm run test:run  # Single run
```

### Code Quality
```bash
# Rails linting
cd backend
bundle exec rubocop

# React linting
cd frontend
npm run lint

# TypeScript type checking
npm run build  # Includes tsc -b
```

## Architecture Overview

This is a Rails + React application designed for AI-powered quiz question generation:

### Backend (Rails 8 API)
- **API-only Rails application** serving JSON responses
- **PostgreSQL database** with Question model for storing quiz questions
- **Service-oriented architecture** - business logic in `app/services/`
- **OpenAI integration** via ruby-openai gem for AI question generation
- **API versioning** under `/api/v1/` namespace
- **RSpec testing** with FactoryBot and Faker

### Frontend (React + TypeScript)
- **React 19** with TypeScript and Vite
- **Tailwind CSS** for styling with @tailwindcss/forms
- **React Query (@tanstack/react-query)** for server state management
- **Axios** for API communication with automatic proxy to Rails backend
- **React Hook Form** for form handling and validation
- **Vitest + Testing Library** for component testing

### Key Patterns

#### Service Objects
Business logic is extracted into service objects in `app/services/`:
```ruby
# Example: app/services/question_generator.rb
class QuestionGenerator
  def initialize(topic:, difficulty:)
    @topic = topic
    @difficulty = difficulty
  end

  def call
    # OpenAI integration logic for generating quiz questions
  end
end
```

#### API Structure
RESTful API following Rails conventions:
- `GET /api/v1/questions` - List all quiz questions
- `POST /api/v1/questions` - Create a new question manually
- `POST /api/v1/questions/generate` - Generate question with AI (to be implemented)

#### Frontend State Management
- React Query for server state and caching of questions
- React Hook Form for question creation forms
- TypeScript interfaces in `src/types/` for type safety

## Key Files

### Backend Configuration
- `config/routes.rb` - API route definitions
- `app/controllers/api/v1/questions_controller.rb` - Main API controller for question CRUD
- `app/models/question.rb` - ActiveRecord model for quiz questions
- `config/initializers/cors.rb` - CORS configuration for frontend access
- `Gemfile` - Ruby dependencies including ruby-openai for AI integration

### Frontend Configuration
- `vite.config.ts` - Vite configuration with API proxy to Rails backend
- `src/api/questions.ts` - API client functions for question operations
- `src/components/QuestionForm.tsx` - Form component for creating questions
- `src/components/QuestionList.tsx` - Component for displaying question list
- `src/types/index.ts` - TypeScript interfaces for Question and API types
- `package.json` - Node.js dependencies

### Development Setup
- `docker-compose.yml` - Multi-service Docker setup with PostgreSQL
- `scripts/dev.sh` - Development server startup script
- `.env.example` (backend) - Environment variables template for OpenAI API key

## Database Schema

The Question model represents quiz questions with:
- `topic` (string) - Subject area (e.g., "Science", "History", "Math")
- `difficulty` (string) - Difficulty level ("easy", "medium", "hard")
- `question_text` (text) - The actual quiz question content
- Standard Rails timestamps (`created_at`, `updated_at`)

## Testing Strategy

### Backend (RSpec)
- Model specs in `spec/models/` - Test Question model validations and methods
- Request specs in `spec/requests/api/v1/` - Test API endpoints
- Factory definitions in `spec/factories/` - Test data generation
- Service specs for AI integration testing

### Frontend (Vitest)
- Component tests in `src/__tests__/` - Test React components
- Test setup in `src/test-setup.ts` - Configure testing environment
- Uses jsdom environment for DOM testing
- Testing Library for user interaction testing

## Interview Implementation Goals

The starter includes TODO comments and incomplete features that candidates should implement:

### Backend Tasks
- Add `POST /api/v1/questions/generate` endpoint
- Create `QuestionGenerator` service with OpenAI integration
- Implement proper error handling for AI API failures
- Add request validation and sanitization

### Frontend Tasks
- Add "Generate with AI" button to QuestionForm
- Implement loading states during AI generation
- Handle and display generation errors gracefully
- Update form with generated question content

## Important Notes

- **API Proxy**: Frontend Vite dev server proxies `/api` requests to Rails backend
- **CORS**: Configured in Rails for cross-origin requests during development
- **Environment Variables**: OpenAI API key must be set in backend `.env` file
- **Docker**: Includes PostgreSQL service with health checks and proper startup order
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **AI Integration**: Uses OpenAI GPT models for educational question generation