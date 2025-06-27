class Question < ApplicationRecord
  DIFFICULTY_LEVELS = %w[easy medium hard].freeze
  
  validates :topic, presence: true
  validates :difficulty, inclusion: { in: DIFFICULTY_LEVELS }
  validates :question_text, presence: true
  
  scope :recent, -> { order(created_at: :desc) }
end
