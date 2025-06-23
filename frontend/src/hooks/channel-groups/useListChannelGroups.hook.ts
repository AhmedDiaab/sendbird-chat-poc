import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useListChannelGroups() {
    return useQuery({
        queryKey: ["channel-groups"],
        queryFn: async () => {
            const { data } = await api.get("/channels");
            return data;
        },
    });
}
