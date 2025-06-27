class Api::V1::QuestionsController < ApplicationController
  # TODO: Add AI generation endpoint
  # Consider: Should this be a separate controller?
  # Consider: How would you version this API?

  def index
    questions = Question.recent
    render json: questions
  end

  def create
    question = Question.new(question_params)
    
    if question.save
      render json: question, status: :created
    else
      render json: { errors: question.errors.full_messages }, 
             status: :unprocessable_entity
    end
  end

  private

  def question_params
    params.require(:question).permit(:topic, :difficulty, :question_text)
  end
end