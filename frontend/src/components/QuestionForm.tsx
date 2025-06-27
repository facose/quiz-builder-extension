import { useForm } from 'react-hook-form';
import { useCreateQuestion } from '../hooks/useQuestions';
import type { CreateQuestionDTO } from '../types';
import { Button } from './Button';

export function QuestionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuestionDTO>();

  const createQuestion = useCreateQuestion();

  const onSubmit = async (data: CreateQuestionDTO) => {
    try {
      await createQuestion.mutateAsync(data);
      reset(); // Clear form after successful submission
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg border border-gray-100 sm:rounded-xl">
      <div className="px-6 py-8 sm:p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Create New Question
          </h3>
          <p className="text-gray-600 text-sm">
            Create and manage quiz questions with AI assistance
          </p>
        </div>
        
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="topic" className="block text-sm font-semibold text-gray-800">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              {...register('topic', { required: 'Topic is required' })}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors duration-200"
              placeholder="e.g., Math, Science, History"
            />
            {errors.topic && (
              <p className="text-sm text-red-600 font-medium">{errors.topic.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-800">
              Difficulty
            </label>
            <select
              id="difficulty"
              {...register('difficulty', { required: 'Difficulty is required' })}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors duration-200 bg-white"
            >
              <option value="" className="text-gray-400">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="text-sm text-red-600 font-medium">{errors.difficulty.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="question_text" className="block text-sm font-semibold text-gray-800">
              Question
            </label>
            <textarea
              id="question_text"
              rows={4}
              {...register('question_text', { required: 'Question text is required' })}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors duration-200 resize-none"
              placeholder="Enter your question here..."
            />
            {errors.question_text && (
              <p className="text-sm text-red-600 font-medium">{errors.question_text.message}</p>
            )}
          </div>

          {createQuestion.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-sm text-red-800 font-medium">
                  Failed to create question. Please try again.
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              loading={createQuestion.isPending}
              disabled={createQuestion.isPending}
              className="px-6 py-3"
            >
              Create Question
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}