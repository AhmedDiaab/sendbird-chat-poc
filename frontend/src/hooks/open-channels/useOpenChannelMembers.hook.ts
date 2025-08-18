import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useOpenChannelMembers(channelUrl: string) {
    return useQuery({
        queryKey: ["openChannelsMembers", channelUrl],
        queryFn: async () => {
            const { data } = await api.get(`/open-channels/${channelUrl}/operators`);
            return data.operators;
        },
        enabled: !!channelUrl,
    });
}