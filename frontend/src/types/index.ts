export interface Question {
  id: number;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_text: string;
  created_at: string;
  updated_at: string;
}

export interface CreateQuestionDTO {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_text: string;
}

export interface ApiError {
  errors: string[];
}

// TODO: Add interface for AI generation request
// export interface GenerateQuestionDTO {
//   topic: string;
//   difficulty: 'easy' | 'medium' | 'hard';
// }