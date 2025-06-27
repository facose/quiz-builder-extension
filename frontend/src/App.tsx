import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuestionForm } from './components/QuestionForm';
import { QuestionList } from './components/QuestionList';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              AI Question Builder
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Create and manage quiz questions with AI assistance
            </p>
          </div>

          <div className="space-y-8">
            <QuestionForm />
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Questions
              </h2>
              <QuestionList />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;