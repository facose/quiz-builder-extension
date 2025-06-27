# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Clear existing data in development
Question.destroy_all if Rails.env.development?

# Create sample questions for the quiz builder
Question.create!([
  { 
    topic: 'Math', 
    difficulty: 'easy', 
    question_text: 'What is 2 + 2?' 
  },
  { 
    topic: 'Science', 
    difficulty: 'medium', 
    question_text: 'What is the process by which plants make their own food?' 
  },
  { 
    topic: 'History', 
    difficulty: 'hard', 
    question_text: 'Analyze the causes and consequences of the French Revolution.' 
  },
  { 
    topic: 'English', 
    difficulty: 'easy', 
    question_text: 'What is the plural form of "child"?' 
  },
  { 
    topic: 'Geography', 
    difficulty: 'medium', 
    question_text: 'What is the capital of Australia?' 
  }
])

puts "Created #{Question.count} sample questions"