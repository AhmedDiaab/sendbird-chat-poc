import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useGenerateToken() {
    return useMutation({
        mutationFn: async (userId: string) => {
            const { data } = await api.post(`/users/${userId}/token`);
            return data;
        },
    });
}
