import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useAddOpenChannelMembers() {
    return useMutation({
        mutationFn: ({ channelUrl, userIds }: { channelUrl: string; userIds: string[] }) =>
            api.post(`/open-channels/${channelUrl}/members`, { userIds }),
    });
}