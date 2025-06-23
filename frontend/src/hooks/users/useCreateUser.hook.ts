import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ nickName, avatar }: { nickName: string, avatar: string }) => {
            const { data } = await api.post("/users", {
                "nickname": nickName,
                "profileUrl": avatar
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
}