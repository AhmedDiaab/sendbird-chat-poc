import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useListOpenChannel({ token }: { token: string | null }) {
    return useQuery({
        queryKey: ["open-channels", token],
        queryFn: async () => {
            const { data } = await api.get("/open-channels", {
                params: {
                    token,
                    limit: 6,
                },
            });
            return data;
        },
        enabled: token !== undefined, // prevent if token is undefined
    });
}
