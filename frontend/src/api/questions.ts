import axios from 'axios';
import { Question, CreateQuestionDTO } from '../types';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const questionsApi = {
  // Fetch all questions
  list: async (): Promise<Question[]> => {
    const response = await api.get<Question[]>('/questions');
    return response.data;
  },

  // Create a new question manually
  create: async (data: CreateQuestionDTO): Promise<Question> => {
    const response = await api.post<Question>('/questions', { question: data });
    return response.data;
  },

  // TODO: Add generation API call
  // Consider: Retry strategies?
  // Consider: Cost optimization?
  // generate: async (data: GenerateQuestionDTO): Promise<Question> => {
  //   const response = await api.post<Question>('/questions/generate', { question: data });
  //   return response.data;
  // },
};