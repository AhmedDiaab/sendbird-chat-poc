import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useDeleteOpenChannel() {
    return useMutation({
        mutationFn: async (channelUrl: string) => {
            const { data } = await api.delete(`/open-channels/${channelUrl}`);
            return data;
        },
    });
}
