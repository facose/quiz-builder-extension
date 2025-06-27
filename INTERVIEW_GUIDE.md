# Interview Guide - AI Question Builder

## Overview
This interview evaluates candidates by having them add AI-powered question generation to a Rails + React application.

## Time Allocation (45-60 minutes)
- Part 1: Rails Backend (15-20 min)
- Part 2: React Frontend (15-20 min)
- Part 3: Discussion & Extensions (15-20 min)

## Evaluation Criteria

### Technical Skills

#### Rails Backend
- [ ] Creates RESTful endpoint following conventions
- [ ] Uses service objects for business logic separation
- [ ] Implements proper error handling
- [ ] Understands strong parameters
- [ ] Shows awareness of API versioning

#### React Frontend
- [ ] Manages component state appropriately
- [ ] Handles async operations cleanly
- [ ] Provides good loading/error UX
- [ ] Uses TypeScript effectively
- [ ] Follows React best practices

#### General
- [ ] Writes clean, readable code
- [ ] Asks clarifying questions
- [ ] Tests incrementally
- [ ] Debugs effectively

### Architecture & Design

Watch for discussions about:
- Rate limiting for API calls
- Caching strategies
- Error handling patterns
- Security considerations (prompt injection)
- Cost optimization
- Observability/monitoring

## Part 1: Rails Backend (15-20 min)

### Task
Create `/api/v1/questions/generate` endpoint that accepts:
```json
{
  "topic": "Science",
  "difficulty": "medium"
}
```

### Expected Approach
1. Add route to `config/routes.rb`
2. Add `generate` action to `QuestionsController`
3. Create `QuestionGenerator` service in `app/services/`
4. Use OpenAI gem to generate questions
5. Handle errors gracefully

### Discussion Points
- Why use a service object?
- How would you handle rate limiting?
- What about prompt injection?
- How to ensure consistent output format?

### Red Flags
- Putting all logic in controller
- No error handling
- Not validating inputs
- Ignoring service object pattern

## Part 2: React Frontend (15-20 min)

### Task
Add "Generate with AI" button to QuestionForm that:
1. Shows loading state during generation
2. Displays the generated question
3. Handles errors gracefully
4. Allows editing before saving

### Expected Approach
1. Add button to `QuestionForm` component
2. Create new API function in `api/questions.ts`
3. Use React Query mutation
4. Show loading spinner
5. Update form with generated content

### Discussion Points
- Optimistic updates vs waiting
- Error recovery strategies
- Accessibility considerations
- Component composition

### Red Flags
- No loading states
- Poor error handling
- Inline API calls
- Ignoring TypeScript

## Part 3: Extensions & Discussion (15-20 min)

### Possible Extensions (if time permits)
1. Add request caching
2. Implement streaming responses
3. Add generation history
4. Bulk generation feature

### Architecture Discussion Topics

#### Scaling
"How would you handle 1000 concurrent generation requests?"
- Expected: Rate limiting, queuing, caching

#### Monitoring
"How would you track generation quality and costs?"
- Expected: Logging, metrics, cost tracking

#### Extraction
"When would you extract this to a Python service?"
- Expected: ML model complexity, team expertise, performance needs

#### Security
"What security concerns do you see?"
- Expected: Prompt injection, API key management, rate limiting

## Code Hooks to Watch

### Missing Intentionally
- No authentication (discuss security)
- No pagination (discuss scaling)
- Basic error messages (discuss UX)
- No request queuing (discuss architecture)

### Code Comments
The codebase has been kept minimal to allow candidates to demonstrate their architectural thinking and implementation approach.

## Scoring Guide

### Strong Hire
- Completes both parts cleanly
- Proactively discusses tradeoffs
- Shows system design thinking
- Writes production-quality code
- Great communication throughout

### Hire
- Completes core functionality
- Handles errors appropriately
- Shows good Rails/React knowledge
- Asks good questions
- Some rough edges okay

### No Hire
- Struggles with basic Rails/React
- No error handling
- Can't debug issues
- Poor communication
- Ignores best practices

## Common Issues & Hints

### Issue: Can't get OpenAI working
**Hint**: "Check the OpenAI gem documentation for the client setup"

### Issue: CORS errors
**Hint**: "The proxy is already configured, check the API URL"

### Issue: State not updating
**Hint**: "React Query might be caching, check the mutation setup"

### Issue: Strong parameters error
**Hint**: "What parameters does the generate endpoint accept?"

## Post-Interview Discussion
- What did you like about the codebase?
- What would you refactor?
- How would you test this feature?
- What monitoring would you add?
- Experience with similar integrations?

## Notes Section
Use this space to record observations:
- Problem-solving approach
- Communication style
- Technical depth
- Learning ability
- Team fit indicators