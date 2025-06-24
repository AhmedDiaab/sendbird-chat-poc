import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useRemoveChannelMembers() {
    return useMutation({
        mutationFn: ({ channelUrl, userIds, shouldLeaveAll }: { channelUrl: string; userIds: string[], shouldLeaveAll: boolean }) =>
            api.delete(`/channels/${channelUrl}/members`, { data: { userIds, shouldLeaveAll } }),
    });
}