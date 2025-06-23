import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, ...rest }: { userId: string, nickname: string, profileUrl: string, isActive: boolean }) => {
            const { data } = await api.put(`/users/${userId}`, rest);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
}