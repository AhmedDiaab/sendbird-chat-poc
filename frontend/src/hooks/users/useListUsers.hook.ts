import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface ListUsersParams {
    token: string | null;
    limit?: number;
    enabled?: boolean;
}

export function useListUsers({ token, limit = 4, enabled = true }: ListUsersParams) {
    return useQuery({
        queryKey: ["users", token],
        queryFn: async () => {
            const { data } = await api.get("/users", {
                params: { token, limit },
            });
            return data;
        },
        enabled,
    });
}
