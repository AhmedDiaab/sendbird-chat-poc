import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useAddChannelMembers() {
    return useMutation({
        mutationFn: ({ channelUrl, userIds }: { channelUrl: string; userIds: string[] }) =>
            api.post(`/channels/${channelUrl}/members`, { userIds }),
    });
}