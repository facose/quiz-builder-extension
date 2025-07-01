# Quiz Builder – AI Question Generation Extension

This is an extension of the original technical challenge starter repository by adding an **AI-powered question generation** feature using the OpenAI API.

The new functionality allows users to toggle between manually creating quiz questions or letting AI generate them from a prompt.

---

## New Feature: AI-Powered Quiz Questions

### Backend

- Created a new controller under `api/v1`:  
  `Api::V1::OpenaiController`  
  which defines the `generate_question` endpoint.

- The controller calls a **service object**:
  ```ruby
  generator = OpenaiQuestionGenerator.new(params[:query])
  question_data = generator.call
  ```
- OpenaiQuestionGenerator initializes the OpenAI::Client, crafts a structured prompt, and safely parses the response:

- Cleans up any markdown like ```json using a custom method.

- Returns the JSON object with topic, difficulty, and question_text.

- Handles errors like invalid JSON or OpenAI failures with custom exceptions.

### Frontend

- Reused the existing react-hook-form + @tanstack/react-query structure.

- Added useCreateAIQuestion mutation.

- Built a conditional form component:

- Classic question form with topic, difficulty, and text.

- AI mode that submits a natural language prompt to generate a question.
