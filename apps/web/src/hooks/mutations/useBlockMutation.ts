import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    headers: { "Content-Type": "application/json"},
})

export const useSyncBlocks = () => {
    const queryClient = useQueryClient();
    const { getToken } = useAuth();

    return useMutation({
        mutationFn: async ({storyId, blocks} : {storyId: string; blocks: any}) => {
            const token = await getToken();
            const response = await api.put(`/stories/${storyId}/blocks`, 
                { blocks },
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["blocks"],
                exact: true,
            });
        },
    });
}