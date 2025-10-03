import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    headers: { "Content-Type": "application/json"},
})

export const useFetchBlocks = (storyId: string) => {
    const { getToken } = useAuth();
    return useQuery({
        queryKey: ["blocks", storyId],
        queryFn: async () => {
            const token = await getToken();
            const response = await api.get(`/stories/${storyId}/blocks`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            return response.data;
        },
    });
}