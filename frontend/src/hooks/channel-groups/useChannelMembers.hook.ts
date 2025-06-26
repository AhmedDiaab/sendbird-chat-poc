import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useChannelMembers(channelUrl: string) {
    return useQuery({
        queryKey: ["channel-members", channelUrl],
        queryFn: async () => {
            const { data } = await api.get(`/channels/${channelUrl}/members`);
            return data.members;
        },
        enabled: !!channelUrl,
    });
}