import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

type ChannelGroupInput = {
    name: string;
    userIds: string[];
    coverUrl: string;
    isPublic: boolean;
    isDistinct: boolean;
    customType: string;
};

export function useCreateOpenChannel() {
    return useMutation({
        mutationFn: async (data: ChannelGroupInput) => {
            const response = await api.post("/open-channels", data);
            return response.data;
        },
    });
}
