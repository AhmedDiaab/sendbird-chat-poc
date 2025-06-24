import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useDeleteChannelGroup() {
    return useMutation({
        mutationFn: async (channelUrl: string) => {
            const { data } = await api.delete(`/channels/${channelUrl}`);
            return data;
        },
    });
}
