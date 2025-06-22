import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuth } from "@/contexts/auth.context";

export function useLogin() {
    const { setAuth } = useAuth();

    return useMutation({
        mutationFn: async (userId: string) => {
            const { data } = await api.post("/auth/login", { userId });
            return { userId, token: data.token } as const; // TODO: check this later
        },
        onSuccess: ({ userId, token }) => {
            setAuth(userId, token);
            api.defaults.headers.common["x-api-key"] = import.meta.env.VITE_API_KEY;
        },
    });
}