require 'rails_helper'

RSpec.describe Question, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      question = Question.new(
        topic: 'Math',
        difficulty: 'easy',
        question_text: 'What is 2 + 2?'
      )
      expect(question).to be_valid
    end

    it 'is not valid without a topic' do
      question = Question.new(difficulty: 'easy', question_text: 'What is 2 + 2?')
      expect(question).not_to be_valid
      expect(question.errors[:topic]).to include("can't be blank")
    end

    it 'is not valid without a question_text' do
      question = Question.new(topic: 'Math', difficulty: 'easy')
      expect(question).not_to be_valid
      expect(question.errors[:question_text]).to include("can't be blank")
    end

    it 'is not valid with invalid difficulty' do
      question = Question.new(
        topic: 'Math',
        difficulty: 'invalid',
        question_text: 'What is 2 + 2?'
      )
      expect(question).not_to be_valid
      expect(question.errors[:difficulty]).to include('is not included in the list')
    end

    it 'is valid with valid difficulty levels' do
      %w[easy medium hard].each do |difficulty|
        question = Question.new(
          topic: 'Math',
          difficulty: difficulty,
          question_text: 'What is 2 + 2?'
        )
        expect(question).to be_valid
      end
    end
  end

  describe '.recent' do
    it 'returns questions ordered by created_at desc' do
      old_question = Question.create!(
        topic: 'Math',
        difficulty: 'easy',
        question_text: 'Old question'
      )
      new_question = Question.create!(
        topic: 'Math',
        difficulty: 'easy',
        question_text: 'New question'
      )

      expect(Question.recent).to eq([new_question, old_question])
    end
  end
end
