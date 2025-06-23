import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

type ChannelGroupInput = {
    name: string;
    userIds: string[];
    coverUrl: string;
    isPublic: boolean;
    isDistinct: boolean;
};

export function useCreateChannelGroup() {
    return useMutation({
        mutationFn: async (data: ChannelGroupInput) => {
            const response = await api.post("/channels", data);
            return response.data;
        },
    });
}
