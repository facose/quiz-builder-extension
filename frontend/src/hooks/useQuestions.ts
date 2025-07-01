import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questionsApi } from "../api/questions";

const QUESTIONS_QUERY_KEY = ["questions"];

export const useQuestions = () => {
  return useQuery({
    queryKey: QUESTIONS_QUERY_KEY,
    queryFn: questionsApi.list,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: questionsApi.create,
    onSuccess: () => {
      // Invalidate and refetch questions after successful creation
      queryClient.invalidateQueries({ queryKey: QUESTIONS_QUERY_KEY });
    },
  });
};

export const useCreateAIQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: questionsApi.createAI,
    onSuccess: () => {
      // Invalidate and refetch questions after successful AI question creation
      queryClient.invalidateQueries({ queryKey: QUESTIONS_QUERY_KEY });
    },
  });
};
