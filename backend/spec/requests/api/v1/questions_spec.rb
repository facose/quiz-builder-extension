require 'rails_helper'

RSpec.describe "Api::V1::Questions", type: :request do
  describe "GET /api/v1/questions" do
    it "returns questions in recent order" do
      question1 = Question.create!(
        topic: 'Math',
        difficulty: 'easy',
        question_text: 'What is 2 + 2?'
      )
      question2 = Question.create!(
        topic: 'Science',
        difficulty: 'medium',
        question_text: 'What is photosynthesis?'
      )

      get "/api/v1/questions"

      expect(response).to have_http_status(:ok)
      
      json_response = JSON.parse(response.body)
      expect(json_response).to be_an(Array)
      expect(json_response.length).to eq(2)
      
      # Should be in recent order (newest first)
      expect(json_response.first['id']).to eq(question2.id)
      expect(json_response.last['id']).to eq(question1.id)
    end
  end

  describe "POST /api/v1/questions" do
    let(:valid_params) do
      {
        question: {
          topic: 'Math',
          difficulty: 'easy',
          question_text: 'What is 2 + 2?'
        }
      }
    end

    let(:invalid_params) do
      {
        question: {
          topic: '',
          difficulty: 'easy',
          question_text: 'What is 2 + 2?'
        }
      }
    end

    it "creates a question with valid params" do
      expect {
        post "/api/v1/questions", params: valid_params
      }.to change(Question, :count).by(1)

      expect(response).to have_http_status(:created)
      
      json_response = JSON.parse(response.body)
      expect(json_response['topic']).to eq('Math')
      expect(json_response['difficulty']).to eq('easy')
      expect(json_response['question_text']).to eq('What is 2 + 2?')
    end

    it "returns errors with invalid params" do
      expect {
        post "/api/v1/questions", params: invalid_params
      }.not_to change(Question, :count)

      expect(response).to have_http_status(:unprocessable_entity)
      
      json_response = JSON.parse(response.body)
      expect(json_response['errors']).to include("Topic can't be blank")
    end
  end

  # TODO: Add tests for the generate endpoint
  # describe "POST /api/v1/questions/generate" do
  #   # Tests will be added during the interview
  # end
end