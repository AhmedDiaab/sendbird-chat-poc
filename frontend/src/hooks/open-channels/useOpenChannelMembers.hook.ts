import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useOpenChannelMembers(channelUrl: string) {
    return useQuery({
        queryKey: ["open-channel-members", channelUrl],
        queryFn: async () => {
            const { data } = await api.get(`/open-channels/${channelUrl}/members`);
            return data.members;
        },
        enabled: !!channelUrl,
    });
}