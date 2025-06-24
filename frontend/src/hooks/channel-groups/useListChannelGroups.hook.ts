import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useListChannelGroups({ token }: { token: string | null }) {
    return useQuery({
        queryKey: ["channel-groups", token],
        queryFn: async () => {
            const { data } = await api.get("/channels", {
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
