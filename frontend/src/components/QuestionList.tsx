import { useQuestions } from '../hooks/useQuestions';

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

export function QuestionList() {
  const { data: questions, isLoading, error } = useQuestions();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading questions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading questions
            </h3>
            <div className="mt-2 text-sm text-red-700">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
        <p className="text-gray-600">Create your first question using the form above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {questions.map((question) => (
          <li key={question.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {question.question_text}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="flex-shrink-0 mr-4">
                      <strong>Topic:</strong> {question.topic}
                    </span>
                    <span className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          DIFFICULTY_COLORS[question.difficulty]
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0 text-sm text-gray-400">
                  {new Date(question.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}