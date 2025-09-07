import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

interface createProduct {
  title: string;
  description: string;
  price: number;
  category: string;
  imageKey: string;
  latitude: number;
  longitude: number;
};

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    headers: { "Content-Type": "application/json"},
});

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (product: createProduct) => {
      const token = await getToken();
      const response = await api.post("/products", product , {
        headers: { "Authorization": `Bearer ${token}` }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
      console.log("Product created successfully");
    },
  });
};
