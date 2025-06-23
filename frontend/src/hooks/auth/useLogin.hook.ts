import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuth } from "@/contexts/auth.context";

type LoginInput = {
    userId: string;
    nickname: string;
    profileUrl: string;
};

export function useLogin() {
    const { setAuth } = useAuth();

    return useMutation({
        mutationFn: async ({ userId, nickname, profileUrl }: LoginInput) => {
            const { data } = await api.post("/auth/login", {
                userId,
                nickname,
                profileUrl,
            });
            return { user: data, token: data.token, nickname, profileUrl };
        },
        onSuccess: ({ user, token, nickname, profileUrl }) => {
            setAuth(user, nickname, profileUrl, token);
            api.defaults.headers.common["x-api-key"] = import.meta.env.VITE_API_KEY;
        },
    });
}
