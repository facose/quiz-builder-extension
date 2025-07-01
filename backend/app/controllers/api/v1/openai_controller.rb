class Api::V1::OpenaiController < ApplicationController
  def generate_question
    generator = OpenaiQuestionGenerator.new(params[:query])

    begin
      question_data = generator.call

      question = Question.new(
        topic: question_data["topic"],
        difficulty: question_data["difficulty"],
        question_text: question_data["question_text"]
      )

      if question.save
        render json: question, status: :created
      else
        render json: { errors: question.errors.full_messages }, status: :unprocessable_entity
      end
    rescue OpenaiQuestionGenerator::OpenaiError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end
