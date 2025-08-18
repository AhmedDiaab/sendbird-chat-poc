import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useRemoveOpenChannelMembers() {
    return useMutation({
        mutationFn: ({ channelUrl, userIds }: { channelUrl: string; userIds: string[] }) =>
            api.delete(`/open-channels/${channelUrl}/operators`, { data: { userIds } }),
    });
}