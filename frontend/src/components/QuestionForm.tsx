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
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Create New Question
        </h3>
        
        {/* TODO: Add "Generate with AI" button */}
        {/* Consider: Optimistic updates vs. waiting? */}
        {/* Consider: How to handle partial failures? */}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              {...register('topic', { required: 'Topic is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Math, Science, History"
            />
            {errors.topic && (
              <p className="mt-1 text-sm text-red-600">{errors.topic.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <select
              id="difficulty"
              {...register('difficulty', { required: 'Difficulty is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="question_text" className="block text-sm font-medium text-gray-700">
              Question
            </label>
            <textarea
              id="question_text"
              rows={3}
              {...register('question_text', { required: 'Question text is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your question here..."
            />
            {errors.question_text && (
              <p className="mt-1 text-sm text-red-600">{errors.question_text.message}</p>
            )}
          </div>

          {createQuestion.error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-sm text-red-700">
                Failed to create question. Please try again.
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={createQuestion.isPending}
              disabled={createQuestion.isPending}
            >
              Create Question
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}