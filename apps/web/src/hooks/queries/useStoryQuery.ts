import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: { "Content-Type": "application/json"},
});

export const useFetchStories = () => {
  const { getToken } = useAuth();
  return useQuery({

    queryKey: ["stories"],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get("/stories", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      return response.data;
    },
    staleTime: 3 * 60 * 1000,
  });
}

export const useFetchStoryById = (storyId: string) => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["story", storyId],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get(`/stories/${storyId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      return response.data;
    },
    enabled: !!storyId,
  });
}