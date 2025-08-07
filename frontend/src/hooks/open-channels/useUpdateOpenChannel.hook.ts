import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface UpdateChannelGroupPayload {
    channelUrl: string;
    name?: string;
    organization: string;
    coverUrl?: string;
    userIds?: string[];
    isPublic?: boolean;
    isDistinct?: boolean;
}

export function useUpdateOpenChannel() {
    return useMutation({
        mutationFn: async (payload: UpdateChannelGroupPayload) => {
            const { channelUrl, ...rest } = payload;
            const { data } = await api.put(`/open-channels/${channelUrl}`, rest);
            return data;
        },
    });
}
