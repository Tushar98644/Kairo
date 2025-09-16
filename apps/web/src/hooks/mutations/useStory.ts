import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

interface createStory {
  title: string;
  description: string;
};

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    headers: { "Content-Type": "application/json"},
});

export const useCreateStory = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (story: createStory) => {
      const token = await getToken();
      const response = await api.post("/stories", story , {
        headers: { "Authorization": `Bearer ${token}` }
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
      console.log("Story created successfully");
    },
  });
};
