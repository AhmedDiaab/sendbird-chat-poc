import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useViewUser() {
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await api.get(`/users/${userId}`);
      return data;
    },
  });
}