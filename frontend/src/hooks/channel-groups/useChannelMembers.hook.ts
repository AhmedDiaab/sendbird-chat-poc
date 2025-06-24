import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useChannelMembers(channelId: string) {
    return useQuery({
        queryKey: ["channel-members", channelId],
        queryFn: async () => {
            const { data } = await api.get(`/channels/${channelId}/members`);
            return data.members;
        },
        enabled: !!channelId,
    });
}